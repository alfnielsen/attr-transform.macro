import type { NodePath, types as T } from "@babel/core";
import type { AttrMatch, AttrTransformMacroParams, ElmConfig } from "./attr-transform.config-types";
export declare function getJsxAttributes(nodePath: NodePath<T.JSXElement>): NodePath<T.JSXAttribute>[];
export declare function MatchElm(path: NodePath<T.JSXElement>, elms: ElmConfig[]): {
    elm: NodePath<T.JSXOpeningElement>;
    tagName: string;
    tagMatch: null;
    matchingElmConfig: ElmConfig | undefined;
};
export declare function FindMatchingAttributesConfig(macroParams: AttrTransformMacroParams, elmConfig: ElmConfig, elmNodePath: NodePath<T.JSXOpeningElement>, tagRegExpMatch: RegExpMatchArray | null, attrNodePath: NodePath<T.JSXAttribute>): AttrMatch | undefined;
