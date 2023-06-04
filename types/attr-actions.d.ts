import type { types as T } from "@babel/core";
import { Logger } from "./logger";
import { AttrMatch } from "attr-transform.config-types";
export declare function replaceNameAndOrValue(foundProp: AttrMatch, t: typeof T, log: Logger): void;
