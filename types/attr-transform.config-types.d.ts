import type { MacroParams } from "babel-plugin-macros";
import type { NodePath, types as T } from "@babel/core";
export type AttrTransformMacroParams = Omit<MacroParams, "config"> & {
    config?: AttrTransformConfig;
};
export type AttrTransformConfig = {
    config?: string | false;
    devMode?: AttrTransformConfigDebug;
    elms?: ElmConfig[];
};
export type AttrTransformConfigDebug = {
    logToConsole?: boolean;
    logWithThrow?: boolean;
    printToFile?: boolean | string;
    maxDepth?: number;
    onlyTranformation?: true;
    onlyFiles?: string | RegExp | (string | RegExp)[];
    colors?: boolean;
};
export type ElmConfig = {
    match?: string | RegExp;
    dontMatch?: string | RegExp;
    attrs: AttrConfig[];
    actions?: PostMatchAction[];
};
export type ConditionFunc = (matchedAttributes: PostActionMatch) => boolean;
export type ActionValueFunc = (postActionMatch: PostActionMatch) => FullLegalAttributeValues;
export type CreateActionValueFunc = (postActionMatch: PostActionMatch) => string | T.JSXAttribute;
export type MatchValueFunc = (attrMatch: AttrMatch) => boolean;
export type AttrValueFunc = (attrMatch: AttrMatch) => FullLegalAttributeValues;
export type AttrStringValueFunc = (attrMatch: AttrMatch) => string;
export type CreateValueFunc = (attrMatch: AttrMatch) => string | T.JSXAttribute;
export type ValidateValueFunc = (attrMatch: AttrMatch) => string | undefined;
export type ActionFunc = (attrMatch: AttrMatch) => void;
export type AttrConfig = {
    name?: string;
    description?: string;
    tags?: string[];
    matchName?: string | RegExp;
    dontMatchName?: string | RegExp;
    value?: string | AttrValueFunc;
    replaceValue?: string | AttrValueFunc;
    replaceName?: string | AttrStringValueFunc;
    validate?: ValidateValueFunc;
    collect?: boolean;
    remove?: boolean;
};
export type PostMatchAction = {
    name?: string;
    description?: string;
    tags?: string[];
    condition?: ConditionFunc;
    createAttribute?: string | CreateActionValueFunc;
    replaceName?: string | AttrStringValueFunc;
    value?: string | ActionValueFunc;
    action?: ActionFunc;
};
export type LegalAttributeValues = T.JSXElement | T.JSXFragment | T.StringLiteral | T.JSXExpressionContainer | null | undefined;
export type FullLegalAttributeValues = string | number | boolean | LegalAttributeValues;
export type PostActionMatch = {
    name: string;
    value: FullLegalAttributeValues;
    postMatchAction: PostMatchAction;
    allMatchingAttributes: AttrMatch[];
    collectedAttributes: AttrMatch[];
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
    allMatchingAttributes: AttrMatch[];
    collectedAttributes: AttrMatch[];
    nodePath: NodePath<T.JSXAttribute>;
    elmNodePath: NodePath<T.JSXOpeningElement>;
    macroParams: AttrTransformMacroParams;
    collected?: boolean;
    remove?: boolean;
};
