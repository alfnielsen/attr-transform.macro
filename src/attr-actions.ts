import type { NodePath, types as T } from "@babel/core";
import { Logger } from "./logger";
import { AttrMatch, FullLegalAttributeValues } from "attr-transform.config-types";

export function replaceNameAndOrValue(foundProp: AttrMatch, t: typeof T, log: Logger) {
  log.note(`Attr action: replaceName and/or replaceValue`, "blackBright");
  let newName: string | undefined;
  let id: T.JSXIdentifier | T.JSXNamespacedName | undefined;
  // Optional new name
  if (foundProp.attrConfig.replaceName) {
    if (typeof foundProp.attrConfig.replaceName === "string") {
      newName = foundProp.attrConfig.replaceName;
    } else {
      newName = foundProp.attrConfig.replaceName(foundProp);
      log.msg(`[attrConfig.replaceName function]`, "blackBright");
    }
    log.note(`newName: ${newName}`, "blackBright");
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
      log.msg(`[attrConfig.replaceValue funcrion]`, "blackBright");
    }
    if (typeof newValue === "string") {
      log.msg(`[newValue: string]: ${newValue}`, "blackBright");
      newValueNode = t.stringLiteral(newValue);
    } else if (typeof newValue === "number") {
      log.msg(`[newValue: number]: ${newValue}`, "blackBright");
      newValueNode = t.jsxExpressionContainer(t.numericLiteral(newValue));
    } else if (typeof newValue === "boolean") {
      log.msg(`[newValue: bool]: ${newValue}`, "blackBright");
      newValueNode = t.jsxExpressionContainer(t.booleanLiteral(newValue));
    } else if (t.isNode(newValue)) {
      log.msg(`[newValue: Node]: [Not printed]`, "blackBright");
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
