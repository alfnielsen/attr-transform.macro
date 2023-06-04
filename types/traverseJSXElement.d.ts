import type { NodePath, types as T } from "@babel/core";
import type { AttrTransformConfig, AttrTransformMacroParams } from "./attr-transform.config-types";
import { Logger } from "./logger";
export declare function traverseJSXElement(path: NodePath<T.JSXElement>, attrTransformConfig: AttrTransformConfig, params: AttrTransformMacroParams, attributesToRemove: NodePath<T.JSXAttribute>[], t: typeof T, log: Logger): false | undefined;
