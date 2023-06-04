import type { NodePath, types as T } from "@babel/core";

import type {
  AttrMatch,
  AttrTransformMacroParams,
  AttrValueFunc,
  ElmConfig,
  MatchValueFunc,
  ValidateValueFunc,
} from "./attr-transform.config-types";

export function getJsxAttributes(nodePath: NodePath<T.JSXElement>) {
  let attributes = nodePath.get("openingElement.attributes") as NodePath<T.JSXAttribute>[];
  if (!Array.isArray(attributes)) {
    attributes = [attributes];
  }
  return attributes.filter((x) => x?.isJSXAttribute());
}

export function MatchElm(path: NodePath<T.JSXElement>, elms: ElmConfig[]) {
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

export function FindMatchingAttributesConfig(
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
