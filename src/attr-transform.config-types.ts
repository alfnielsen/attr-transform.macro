import type { MacroParams } from "babel-plugin-macros";
import type { NodePath, types as T } from "@babel/core";

export type AttrTransformMacroParams = Omit<MacroParams, "config"> & {
  config?: AttrTransformConfig;
};

export type AttrTransformConfig = {
  config?: string | false; // file name (default: attr-transform.config.js)
  devMode?: AttrTransformConfigDebug;
  elms?: ElmConfig[];
};

export type AttrTransformConfigDebug = {
  logToConsole?: boolean
  logWithThrow?: boolean
  printToFile?: boolean | string
  maxDepth?: number
  onlyTranformation?: true
  onlyFiles?: string | RegExp | (string | RegExp)[]
  colors?: boolean
}

export type ElmConfig = {
  match?: string | RegExp // Optional match // Special "*" matches all
  dontMatch?: string | RegExp // Optional dontMatch
  attrs: AttrConfig[]
  actions?: PostMatchAction[]
}

// elm/action methods
export type ConditionFunc = (matchedAttributes: PostActionMatch) => boolean
export type ActionValueFunc = (postActionMatch: PostActionMatch) => FullLegalAttributeValues
export type CreateActionValueFunc = (postActionMatch: PostActionMatch) => string | T.JSXAttribute

// attri methods
export type MatchValueFunc = (attrMatch: AttrMatch) => boolean
export type AttrValueFunc = (attrMatch: AttrMatch) => FullLegalAttributeValues
export type AttrStringValueFunc = (attrMatch: AttrMatch) => string
export type CreateValueFunc = (attrMatch: AttrMatch) => string | T.JSXAttribute
export type ValidateValueFunc = (attrMatch: AttrMatch) => string | undefined
export type ActionFunc = (attrMatch: AttrMatch) => void
export type AttrConfig = {
  // a name for the config (for debugging and overview)
  name?: string
  // a name for the config (for debugging and overview)
  description?: string
  // a list of tags. Use for more complex match and replace (Like selecteing all collected with a tag)
  tags?: string[]
  // mosth match the attribute name ( Fx: "padding" or "p1" or /p(1-9)/)
  matchName?: string | RegExp
  // most not match the attribute name ( Fx: "padding" or "p1" or /p(1-9)/)
  dontMatchName?: string | RegExp
  // Calcalate a value from the AttrMatch Object. ( Fx: "p-1" or ({match}) => `p-${match[1]}` )
  value?: string | AttrValueFunc
  // Replace the value of the matched attribute with the calculated value
  replaceValue?: string | AttrValueFunc
  replaceName?: string | AttrStringValueFunc
  // Validate the value (Throw MacroError if not valid)
  validate?: ValidateValueFunc
  // collect AttrMatch Object to be used by other attributes config (This is not need, mostly to indicate that it's macthed)
  collect?: boolean
  // remove this attribute after processing of all attributes
  remove?: boolean
}

export type PostMatchAction = {
  // a name for the config (for debugging and overview)
  name?: string
  // a name for the config (for debugging and overview)
  description?: string
  // a list of tags. Use for more complex match and replace (Like selecteing all collected with a tag)
  tags?: string[]
  // conditions
  condition?: ConditionFunc
  // create the attribute if not exists
  createAttribute?: string | CreateActionValueFunc
  replaceName?: string | AttrStringValueFunc
  value?: string | ActionValueFunc
  action?: ActionFunc
}

export type LegalAttributeValues =
  | T.JSXElement
  | T.JSXFragment
  | T.StringLiteral
  | T.JSXExpressionContainer
  | null
  | undefined;
export type FullLegalAttributeValues = string | number | boolean | LegalAttributeValues;
// Meta data for the attribute use for calculate the value, validate etc in the config
export type PostActionMatch = {
  name: string;
  value: FullLegalAttributeValues;
  postMatchAction: PostMatchAction;
  allMatchingAttributes: AttrMatch[]; // all props found for this element
  collectedAttributes: AttrMatch[]; // all props found for this element
  tagMatch?: RegExpMatchArray | null;
  elmNodePath: NodePath<T.JSXOpeningElement>;
  macroParams: AttrTransformMacroParams;
};

export type AttrMatch = {
  name: string;
  value: FullLegalAttributeValues;
  attrConfig: AttrConfig;
  matchFunction?: MatchValueFunc;
  dontMatchFunction?: MatchValueFunc;
  validateFunction?: ValidateValueFunc;
  valueFunction?: AttrValueFunc;
  match?: RegExpMatchArray | null;
  tagMatch?: RegExpMatchArray | null;
  allMatchingAttributes: AttrMatch[]; // all props found for this element
  collectedAttributes: AttrMatch[]; // all props found for this element
  // babel types for advanced usage
  nodePath: NodePath<T.JSXAttribute>;
  elmNodePath: NodePath<T.JSXOpeningElement>;
  // babel types for super advanced usage
  //state: Babel.PluginPass
  macroParams: AttrTransformMacroParams;
  collected?: boolean;
  remove?: boolean;
};
