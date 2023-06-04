import type { NodePath, types as T } from "@babel/core";

import { MacroError, createMacro } from "babel-plugin-macros";
import { join } from "path";
import cli from "cli-color";

import type {
  AttrMatch,
  AttrTransformConfig,
  AttrTransformMacroParams,
  FullLegalAttributeValues,
  PostActionMatch,
  PostMatchAction,
} from "./attr-transform.config-types";
import { FindMatchingAttributesConfig, MatchElm, getJsxAttributes } from "./nodeMatch";
import { replaceNameAndOrValue } from "./attr-actions";

import { Logger } from "./logger";
import { generateNode } from "getSourceFromNode";

export function traverseJSXElement(
  path: NodePath<T.JSXElement>,
  attrTransformConfig: AttrTransformConfig,
  params: AttrTransformMacroParams,
  attributesToRemove: NodePath<T.JSXAttribute>[],
  t: typeof T,
  log: Logger
) {
  if (!attrTransformConfig.elms) return;

  const jsxAttributePaths = getJsxAttributes(path);

  // Test matching tag (elm)
  const { elm, tagName, tagMatch, matchingElmConfig } = MatchElm(path, attrTransformConfig.elms);
  const line = elm.node.loc?.start.line ?? 0;
  const end = elm.node.loc?.start.line ?? 0;
  const startColumn = elm.node.loc?.start.column;
  const endColumn = elm.node.loc?.start.column;
  const lines = end - line + 1;
  log.header(`traverse - JSXElement: ${tagName} - Line: ${line}:${startColumn} to ${end}:${endColumn}`, "bgBlue");
  if (lines < 4) {
    for (let i = 0; i < lines; i++) {
      log.contentLine(line + i);
    }
  } else {
    log.contentLine(line + 1);
    log.contentLine(line + 2);
    log.msg(`...`);
    log.contentLine(end - 1);
    log.contentLine(end);
  }

  if (!matchingElmConfig) {
    log.note(`No Elm Confiog not macthed!`, "redBright");
    log.end();
    return false;
  }

  // Match attributes
  const foundAttributes = jsxAttributePaths
    .map((attrPath) => FindMatchingAttributesConfig(params, matchingElmConfig, elm, tagMatch, attrPath))
    // remove undefined
    .filter((x) => !!x) as AttrMatch[];
  // list elm actions
  const postMatchActions: PostMatchAction[] = matchingElmConfig.actions ?? [];

  if (foundAttributes.length === 0 && postMatchActions.length === 0) {
    log.note(`No attribute matched and no actions defined\n`, "redBright");
    log.end();

    return;
  }
  log.note(
    `Found ${foundAttributes.length} attributes: ${foundAttributes.map((x) => x.nodePath.node.name.name).join(", ")}`
  );

  const collectedAttributes: AttrMatch[] = [];
  const steps: { [key: string]: (foundProp: AttrMatch) => void } = {
    collect: (foundProp) => {
      if (foundProp.collected) {
        collectedAttributes.push(foundProp);
      }
    },
    setMeta: (foundProp) => {
      foundProp.allMatchingAttributes = foundAttributes;
      foundProp.collectedAttributes = collectedAttributes;
    },
    setValues: (foundProp) => {
      if (foundProp?.valueFunction) {
        foundProp.value = foundProp.valueFunction(foundProp);
      }
    },
    callValidators: (foundProp) => {
      if (foundProp?.validateFunction) {
        const errorMessage = foundProp.validateFunction(foundProp);
        if (errorMessage) {
          let errorText =
            cli.redBright("❌") +
            cli.redBright(" Validation error") +
            cli.blackBright(" (jsx-transform.macro)") +
            cli.blackBright("\n\n in ") +
            cli.cyan(params.state.filename) +
            cli.blackBright("\n at ") +
            cli.cyan("line " + path.node.loc?.start.line) +
            cli.blackBright(":\n\n  ") +
            cli.red("  " + errorMessage);

          throw new MacroError(`\n\n${errorText}\n\n`);
        }
      }
    },
  };

  // Run steps
  Object.values(steps).forEach((step) => {
    foundAttributes.forEach(step);
  });

  log.note(`Run attribute actions (count: ${foundAttributes.length})`, "blackBright");
  // Attributes Actions
  for (const foundProp of foundAttributes) {
    log.subheader(`Attr: ${foundProp.nodePath.node.name.name} - Source:`, "cyan");
    log.nodePath(foundProp.nodePath);
    log.subheader(`Value from attr config: ${foundProp.value}`, "blackBright");
    if (foundProp.attrConfig.replaceName || foundProp.attrConfig.replaceValue) {
      replaceNameAndOrValue(foundProp, t, log);
    }
    log.note(`End attribute parsing`);
  }

  log.subheader(`Run elm actions conditions`, "blackBright");

  const matchedActions = postMatchActions
    .map((action) => {
      const matchAction: PostActionMatch = {
        name: action.name ?? "",
        value: "",
        postMatchAction: action,
        allMatchingAttributes: foundAttributes,
        collectedAttributes: collectedAttributes,
        elmNodePath: elm,
        tagMatch: tagMatch,
        macroParams: params,
      };
      // conditions
      if (action.condition) {
        const match = action.condition(matchAction);
        if (!match) return;

        if (action.value && typeof action.value === "function") {
          matchAction.value = action.value(matchAction);
        } else if (action.value) {
          matchAction.value = action.value;
        }

        return matchAction;
      }
      return matchAction;
    })
    .filter((x) => !!x) as PostActionMatch[];

  log.note(`Found ${postMatchActions.length} Elm actions: ${postMatchActions.map((x) => x.name)}`);

  log.note(`Macthed Elm action  - (condition met) (count: ${matchedActions.length})`, "blackBright");

  // Post match actions
  for (const action of matchedActions) {
    log.subheader(`Action: ${action.name ?? " (no name)"}`, "cyan");

    let value = action.value;

    if (action.postMatchAction.createAttribute) {
      log.note(`Elm action: createAttribute`, "blackBright");

      const attr = action.postMatchAction.createAttribute;
      if (typeof attr === "string") {
        const newAttrName = attr;
        const existingAttribute = jsxAttributePaths.find((attr) => attr.node.name.name === newAttrName);
        // New value:
        let newAttr: T.JSXAttribute | undefined;
        const id = t.jsxIdentifier(newAttrName);
        if (!value) {
          newAttr = t.jsxAttribute(id);
        } else if (typeof value === "string") {
          newAttr = t.jsxAttribute(id, t.stringLiteral(value));
        } else if (typeof value === "number") {
          newAttr = t.jsxAttribute(id, t.jsxExpressionContainer(t.numericLiteral(value)));
        } else if (typeof value === "boolean") {
          newAttr = t.jsxAttribute(id, t.jsxExpressionContainer(t.booleanLiteral(value)));
        } else if (t.isNode(value)) {
          newAttr = t.jsxAttribute(id, value);
        }
        if (newAttr) {
          if (!existingAttribute) {
            // Add new attribute
            elm.node.attributes.push(newAttr);
            log.note(`attribute added`);
            log.object(newAttr);
          } else if (action.value) {
            existingAttribute.replaceWith(newAttr);
            log.note(`existing attribute replaced`);
            log.nodePath(existingAttribute);
          }
        }
      }
    }
  }

  // remove props
  for (const foundProp of foundAttributes) {
    if (attributesToRemove.includes(foundProp.nodePath)) continue;
    if (foundProp.attrConfig.remove) {
      attributesToRemove.push(foundProp.nodePath);
    }
  }
}
