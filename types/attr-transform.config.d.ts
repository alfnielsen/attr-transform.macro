import { MacroParams } from "babel-plugin-macros"
import type { NodePath, types as T } from '@babel/core'

export type AttrTransformMacroParams = Omit<MacroParams, "config"> & {
    config?: AttrTransformConfig
}
export type AttrTransformConfig = {
    config?: string // file name (default: attr-transform.config.js)
    elms?: ElmConfig[]
}
export type ElmConfig = {
    match?: string | RegExp; // Optional match // Special "*" matches all
    dontMatch?: string | RegExp; // Optional dontMatch
    attrs: AttrConfig[]
}

export type MatchValueFunc = (attrMatch: AttrMatch) => boolean
export type AttrValueFunc = (attrMatch: AttrMatch) => FullLegalAttributeValues
export type AttrStringValueFunc = (attrMatch: AttrMatch) => string
export type CreateValueFunc = (attrMatch: AttrMatch) => string | T.JSXAttribute
export type ValidateValueFunc = (attrMatch: AttrMatch) => string | undefined
export type AttrConfig = {
    // a name for the config (for debugging and overview)
    name?: string,
    // a name for the config (for debugging and overview)
    description?: string,
    // a list of tags. Use for more complex match and replace (Like selecteing all collected with a tag)
    tags?: string[],
    // create the attribute if not exists
    createAttribute?:
    | string
    | CreateValueFunc
    // mosth match the attribute name ( Fx: "padding" or "p1" or /p(1-9)/)
    matchName?: string | RegExp
    // most not match the attribute name ( Fx: "padding" or "p1" or /p(1-9)/)
    dontMatch?: string | RegExp
    // Calcalate a value from the AttrMatch Object. ( Fx: "p-1" or ({match}) => `p-${match[1]}` )
    value?:
    | string
    | AttrValueFunc
    // Replace the value of the matched attribute with the calculated value
    replaceValue?:
    | string
    | AttrValueFunc
    replaceName?:
    | string
    | AttrStringValueFunc
    // Validate the value (Throw MacroError if not valid)
    validate?: ValidateValueFunc
    // collect AttrMatch Object to be used by other attributes config (This is not need, mostly to indicate that it's macthed)
    collect?: boolean
    // remove this attribute after processing of all attributes
    remove?: boolean

}

export type LegalAttributeValues = T.JSXElement | T.JSXFragment | T.StringLiteral | T.JSXExpressionContainer | null | undefined
export type FullLegalAttributeValues = string | number | boolean | LegalAttributeValues
// Meta data for the attribute use for calculate the value, validate etc in the config
export type AttrMatch = {
    name: string
    value: FullLegalAttributeValues
    attrConfig: AttrConfig
    matchFunction?: MatchValueFunc,
    dontMatchFunction?: MatchValueFunc,
    validateFunction?: ValidateValueFunc
    valueFunction?: AttrValueFunc
    match?: RegExpMatchArray | null
    tagMatch?: RegExpMatchArray | null
    allMatchingAttributes: AttrMatch[] // all props found for this element
    collectedAttributes: AttrMatch[] // all props found for this element
    // babel types for advanced usage
    nodePath: NodePath<T.JSXAttribute>
    parentNodePath: NodePath<T.JSXOpeningElement>
    // babel types for super advanced usage
    //state: Babel.PluginPass
    macroParams: AttrTransformMacroParams
    collected?: boolean
    remove?: boolean
}


