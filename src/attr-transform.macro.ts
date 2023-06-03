import type { NodePath, types as T } from '@babel/core'

import { MacroError, createMacro } from "babel-plugin-macros"
import type { MacroParams } from "babel-plugin-macros"
import { join } from "path"
import cli from "cli-color";

import type {
  AttrMatch,
  AttrTransformConfig,
  AttrTransformMacroParams,
  AttrValueFunc,
  ElmConfig,
  FullLegalAttributeValues,
  MatchValueFunc,
  PostActionMatch,
  PostMatchAction,
  ValidateValueFunc,
} from "./attr-transform.config-types";


let devMode = false;

function log(...args: any[]) {
  if (devMode) log(...args);
}

function getJsxAttributes(nodePath: NodePath<T.JSXElement>) {
  let attributes = nodePath.get("openingElement.attributes") as NodePath<T.JSXAttribute>[];
  if (!Array.isArray(attributes)) {
    attributes = [attributes];
  }
  return attributes.filter((x) => x?.isJSXAttribute());
}

function MatchElm(path: NodePath<T.JSXElement>, elms: ElmConfig[]) {
  const elm = path.get("openingElement");
  const tagName = (elm.node.name as T.JSXIdentifier).name?.toString() ?? "";
  if (!tagName) return { elm, tagName, tagMatch: null, matchingElmConfig: undefined };
  let tagMatch: RegExpMatchArray | null = null;
  const matchingElmConfig = elms.find((elmConfig) => {
    if (elmConfig.match === undefined) return true;
    if (typeof elmConfig.match === "string") {
      tagMatch = tagName === elmConfig.match ? [tagName] : null;
    }
    if (elmConfig.match instanceof RegExp) {
      tagMatch = tagName.match(elmConfig.match);
    }
    if (!tagMatch) return false;
    if (elmConfig.dontMatch) {
      const dontMatch = tagName.match(elmConfig.dontMatch);
      if (dontMatch) return false;
    }
    return true;
  });
  return { elm, tagName, tagMatch, matchingElmConfig };
}

function FindMatchingAttributesConfig(
  macroParams: AttrTransformMacroParams,
  elmConfig: ElmConfig,
  elmNodePath: NodePath<T.JSXOpeningElement>,
  tagRegExpMatch: RegExpMatchArray | null,
  attrNodePath: NodePath<T.JSXAttribute>
): AttrMatch | undefined {
  if (!attrNodePath.node || !elmNodePath.node) return;
  if (attrNodePath.removed) return;
  const attrName = attrNodePath.node.name.name.toString();
  const attrsConfig = Object.entries(elmConfig.attrs);
  // iterate attrConfig (elm attributes)
  for (const [name, attrConfig] of attrsConfig) {
    let attrMatch: RegExpMatchArray | null = null;
    let value = "";
    let valueFunction: AttrValueFunc | undefined;
    let validateFunction: ValidateValueFunc | undefined;
    let matchFunction: MatchValueFunc | undefined;
    let dontMatchFunction: MatchValueFunc | undefined;

    // match
    if (attrConfig.matchName) {
      if (typeof attrConfig.matchName === "string") {
        attrMatch = attrName === attrConfig.matchName ? [attrName] : null;
        if (!attrMatch) continue; // no match
      }
      if (attrConfig.matchName instanceof RegExp) {
        attrMatch = attrName.match(attrConfig.matchName);
        if (!attrMatch) continue; // no match
      }
      if (typeof attrConfig.matchName === "function") {
        matchFunction = attrConfig.matchName; // finish after collect all attributes
      }
    }
    // dontMatch
    if (attrConfig.dontMatchName) {
      if (typeof attrConfig.dontMatchName === "string") {
        const dontMatch = attrName === attrConfig.dontMatchName;
        if (dontMatch) continue; // no match
      }
      if (attrConfig.dontMatchName instanceof RegExp) {
        const dontMatch = attrName.match(attrConfig.dontMatchName);
        if (dontMatch) continue; // no match
      }
      if (typeof attrConfig.dontMatchName === "function") {
        dontMatchFunction = attrConfig.dontMatchName; // finish after collect all attributes
      }
    }
    // validate
    if (typeof attrConfig.validate === "function") {
      validateFunction = attrConfig.validate; // finish after collect all attributes
    }
    // value
    if (typeof attrConfig.value === "string") {
      value = attrConfig.value;
    } else if (typeof attrConfig.value === "function") {
      valueFunction = attrConfig.value; // finish after collect all attributes
    } else if (typeof attrConfig.replaceValue === "function") {
      valueFunction = attrConfig.replaceValue; // finish after collect all attributes
    } else {
      // is string literal
      if (attrNodePath.node.value?.type === "StringLiteral") {
        value = attrNodePath.node.value?.value?.toString() ?? "";
      }
    }

    let collected = attrConfig.collect ?? false;

    const fount: AttrMatch = {
      name,
      value, // set from attrConfig function call later
      matchFunction,
      dontMatchFunction,
      validateFunction,
      valueFunction,
      attrConfig,
      match: attrMatch,
      collected,
      tagMatch: tagRegExpMatch,
      allMatchingAttributes: [], // finish after collect all attributes: get after grouping
      collectedAttributes: [], // finish after collect all attributes: get after grouping
      nodePath: attrNodePath,
      elmNodePath: elmNodePath,
      macroParams,
    };
    return fount;
  }
}

function loadConfig(params: AttrTransformMacroParams): AttrTransformConfig {
  let config: AttrTransformConfig = {};
  const { config: babelMacroConfig } = params;
  // Get the config in babel-macro config: https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/author.md
  // Or from file

  let configFile = undefined;
  if (babelMacroConfig?.config === undefined) {
    configFile = "attr-transform.config.js";
  } else if (typeof babelMacroConfig?.config === "string") {
    configFile = babelMacroConfig.config;
  } else {
    config = babelMacroConfig;
  }
  log("config: ", config);

  if (configFile) {
    const baseDirectory = process.cwd();
    //throw new MacroError("baseDirectory: " + baseDirectory)
    //log("baseDirectory: " + baseDirectory, "configFile: " + configFile)
    const configFilePath = join(baseDirectory, configFile);
    const configFromFile = require(configFilePath) as AttrTransformConfig;
    config = configFromFile;
  } else if (babelMacroConfig?.elms) {
    config = babelMacroConfig;
  } else {
    throw new MacroError(
      `
      You must provide a config file (or a 'attr-transform.elms' object in the babel-plugin-macro config - https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/author.md):
      [attr-transform.config.js]
      /** @type {import('../src/twin-atttributes.types.ts').TwinAttributeConfig} */
      module.exports = {
        elms: [
          {
            attrs: {
              padding: {
                matchName: /p([0-9])/,
                replaceValue: ({match}) => \`p-\${match[1]}\`,
              },
              color: {
                matchName: /([red|blue|green])/,
                replaceValue: ({match}) => \`text-\${match[1]}-600\`,
              },
              line: {
                matchName: /line-([0-9])/,
                replaceValue: "flex items-center justify-start",
              } 
            },
          },
        ],
      }
      `
    );
  }
  return config;
}

function macro(params: AttrTransformMacroParams): void {
  const t = params.babel.types;
  const program = params.state.file.path;

  const attributesToRemove: NodePath<T.JSXAttribute>[] = [];

  const elmConfig = loadConfig(params);
  if (elmConfig.devMode) {
    devMode = true;
  }

  program.traverse({
    JSXElement(path) {
      if (!elmConfig.elms) return;
      const jsxAttributePaths = getJsxAttributes(path);

      // Test matching tag (elm)
      const { elm, tagName, tagMatch, matchingElmConfig } = MatchElm(path, elmConfig.elms);
      if (!matchingElmConfig) return false;

      // Match attributes
      const foundAttributes = jsxAttributePaths
        .map((attrPath) => FindMatchingAttributesConfig(params, matchingElmConfig, elm, tagMatch, attrPath))
        // remove undefined
        .filter((x) => !!x) as AttrMatch[];
      // list elm actions
      const postMatchActions: PostMatchAction[] = matchingElmConfig.actions ?? [];

      if (foundAttributes.length === 0 && postMatchActions.length === 0) return;
      log(
        cli.green(`#-------------------# elm: ${tagName} (actions: ${postMatchActions.length}) #--------------------#`)
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

      Object.values(steps).forEach((step) => {
        foundAttributes.forEach(step);
      });

      log(cli.blackBright(`---------------------attributes: ${foundAttributes.length} --------------------`));
      // Attributes Actions
      for (const foundProp of foundAttributes) {
        log("Attr:", cli.cyan(foundProp.nodePath.node.name.name), " value: ", cli.greenBright(foundProp.value));
        if (foundProp.attrConfig.replaceName || foundProp.attrConfig.replaceValue) {
          log("Action:", cli.bgRed("replaceName and/or replaceValue"), foundProp.nodePath.node.name.name);
          let newName: string | undefined;
          let id: T.JSXIdentifier | T.JSXNamespacedName | undefined;
          // Optional new name
          if (foundProp.attrConfig.replaceName) {
            if (typeof foundProp.attrConfig.replaceName === "string") {
              newName = foundProp.attrConfig.replaceName;
            } else {
              newName = foundProp.attrConfig.replaceName(foundProp);
            }
            if (newName) {
              id = t.jsxIdentifier(newName);
            }
          } else {
            id = foundProp.nodePath.node.name;
          }
          // Optional new value
          let newValueNode: T.JSXAttribute["value"] | undefined;
          if (foundProp.attrConfig.replaceValue) {
            let newValue: FullLegalAttributeValues | undefined;
            if (typeof foundProp.attrConfig.replaceValue === "string") {
              newValue = foundProp.attrConfig.replaceValue;
            } else {
              newValue = foundProp.attrConfig.replaceValue(foundProp);
            }
            if (typeof newValue === "string") {
              newValueNode = t.stringLiteral(newValue);
            } else if (typeof newValue === "number") {
              newValueNode = t.jsxExpressionContainer(t.numericLiteral(newValue));
            } else if (typeof newValue === "boolean") {
              newValueNode = t.jsxExpressionContainer(t.booleanLiteral(newValue));
            } else if (t.isNode(newValue)) {
              newValueNode = newValue;
            }
          } else {
            newValueNode = foundProp.nodePath.node.value;
          }
          // Replace attribute
          if (id && newValueNode) {
            const newAttr = t.jsxAttribute(id, newValueNode);
            foundProp.nodePath.replaceWith(newAttr);
          } else if (id) {
            const newAttr = t.jsxAttribute(id, newValueNode);
            foundProp.nodePath.replaceWith(newAttr);
          } else if (newValueNode) {
            foundProp.nodePath.replaceWith(newValueNode);
          }
        }
      }

      log(cli.blackBright(`---------------------actions: ${postMatchActions.length}--------------------`));

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
          log("Action::::", cli.cyan(matchAction.value));
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
      log(cli.blackBright(`---------------------matched actions: ${matchedActions.length}--------------------`));

      // Post match actions
      for (const action of matchedActions) {
        log("Action:", cli.cyan(action.name ?? ""), "conditions: match");

        let value = action.value;

        if (action.postMatchAction.createAttribute) {
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
              } else if (action.value) {
                existingAttribute.replaceWith(newAttr);
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
    },
  });

  program.scope.crawl();
  // remove all matched attributes
  attributesToRemove.forEach((attrPath) => {
    attrPath.remove();
  });
}


export default createMacro(macro, { configName: "attr-transform" })
