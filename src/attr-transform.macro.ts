import type { NodePath, types as T } from '@babel/core'

import { MacroError, createMacro } from "babel-plugin-macros"
import type { MacroParams } from "babel-plugin-macros"
import fs from 'fs'
import { join } from "path"

type AttrTransformMacroParams = Omit<MacroParams, "config"> & {
  config?: AttrTransformConfig
}
type AttrTransformConfig = {
  config?: string // file name (default: attr-transform.config.js)
  elms?: ElmConfig[]
}
type ElmConfig = {
  match?: string | RegExp; // Optional match // Special "*" matches all
  dontMatch?: string | RegExp; // Optional dontMatch
  attrs: AttrConfig[]
}

type MatchValueFunc = (attrMatch: AttrMatch) => boolean
type AttrValueFunc = (attrMatch: AttrMatch) => FullLegalAttributeValues
type AttrStringValueFunc = (attrMatch: AttrMatch) => string
type CreateValueFunc = (attrMatch: AttrMatch) => string | T.JSXAttribute
type ValidateValueFunc = (attrMatch: AttrMatch) => string | undefined
type AttrConfig = {
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

type LegalAttributeValues = T.JSXElement | T.JSXFragment | T.StringLiteral | T.JSXExpressionContainer | null | undefined
type FullLegalAttributeValues = string | number | boolean | LegalAttributeValues
// Meta data for the attribute use for calculate the value, validate etc in the config
type AttrMatch = {
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




function getJsxAttributes(nodePath: NodePath<T.JSXElement>) {
  let attributes = nodePath.get("openingElement.attributes") as NodePath<T.JSXAttribute>[]
  if (!Array.isArray(attributes)) {
    attributes = [attributes]
  }
  return attributes.filter((x) => x?.isJSXAttribute())
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
    if (attrConfig.dontMatch) {
      if (typeof attrConfig.dontMatch === "string") {
        const dontMatch = attrName === attrConfig.dontMatch;
        if (dontMatch) continue; // no match
      }
      if (attrConfig.dontMatch instanceof RegExp) {
        const dontMatch = attrName.match(attrConfig.dontMatch);
        if (dontMatch) continue; // no match
      }
      if (typeof attrConfig.dontMatch === "function") {
        dontMatchFunction = attrConfig.dontMatch; // finish after collect all attributes
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
      parentNodePath: elmNodePath,
      macroParams
    }
    return fount
  }
}

function loadConfig(params: AttrTransformMacroParams): AttrTransformConfig {
  let config: AttrTransformConfig = {}
  const { config: babelMacroConfig } = params
  // Get the config in babel-macro config: https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/author.md
  // Or from file
  const configFile = babelMacroConfig?.config ?? "attr-transform.config.js"
  if (configFile) {
    const baseDirectory = process.cwd()
    //throw new MacroError("baseDirectory: " + baseDirectory)
    //console.log("baseDirectory: " + baseDirectory, "configFile: " + configFile)
    const configFilePath = join(baseDirectory, configFile)
    const configFromFile = require(configFilePath) as AttrTransformConfig
    config = configFromFile
  } else if (babelMacroConfig?.elms) {
    config = babelMacroConfig
  } else {
    throw new MacroError(
      `
      You must provide a config file (or a 'attr-transform.elms' object in the babel-plugin-macro config - https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/author.md):
      [attr-transform.config.js]
      /** @type {import('../src/twin-atttributes.types.ts').TwinAttributeConfig} */
      module.exports = {
        elms: [
          {
            match: "*", // match all elements tag
            dontMatch: /img/,
            attrs: {
              padding: {
                match: /p([0-9])/,
                value: ({match}) => \`p-\${match[1]}\`,
              },
              color: {
                match: /([red|blue|green])/,
                value: ({match}) => \`text-\${match[1]}-600\`,
              },
              line: "flex items-center justify-start",
            },
          },
        ],
      }
      `,
    )
  }
  return config
}


function macro(params: AttrTransformMacroParams): void {
  const t = params.babel.types
  const program = params.state.file.path

  const attributesToRemove: NodePath<T.JSXAttribute>[] = []

  const elmConfig = loadConfig(params)

  program.traverse({
    JSXElement(path) {
      if (!elmConfig.elms) return
      const jsxAttributePaths = getJsxAttributes(path)
      const elm = path.get("openingElement")
      // Test matching tag (elm)
      const tagName = (elm.node.name as T.JSXIdentifier).name?.toString() ?? "";
      if (!tagName) return false
      let tagMatch: RegExpMatchArray | null = null
      const matchingElmConfig = elmConfig.elms.filter((elmConfig) => {
        if (elmConfig.match === undefined) return true
        if (typeof elmConfig.match === "string") {
          tagMatch = tagName === elmConfig.match ? [tagName] : null
        }
        if (elmConfig.match instanceof RegExp) {
          tagMatch = tagName.match(elmConfig.match)
        }
        if (!tagMatch) return false
        if (elmConfig.dontMatch) {
          const dontMatch = tagName.match(elmConfig.dontMatch)
          if (dontMatch) return false
        }
        return true
      })

      if (matchingElmConfig.length === 0) return false
      const foundAttributes: AttrMatch[] = []
      const collectedAttributes: AttrMatch[] = []
      for (const elmConfig of matchingElmConfig) {
        const mappedAttributes = jsxAttributePaths
          .map((attrPath) => FindMatchingAttributesConfig(
            params,
            elmConfig,
            elm,
            tagMatch,
            attrPath
          ))
          // remove undefined
          .filter((x) => !!x) as AttrMatch[];

        mappedAttributes.forEach((attr) => {
          if (foundAttributes.some(x => x.nodePath === attr.nodePath)) return;
          foundAttributes.push(attr);
          if (attr.collected) {
            collectedAttributes.push(attr);
          }
        })
      }
      if (foundAttributes.length === 0) return;

      // set valueFunction meta data
      foundAttributes.forEach((foundProp) => {
        foundProp.allMatchingAttributes = foundAttributes;
        foundProp.collectedAttributes = collectedAttributes;
      });
      // Get value from valueFunction's
      foundAttributes.forEach((foundProp) => {
        if (foundProp?.valueFunction) {
          foundProp.value = foundProp.valueFunction(foundProp);
        }
      });
      // Run validate function
      foundAttributes.forEach((foundProp) => {
        if (foundProp?.validateFunction) {
          const errorMessage = foundProp.validateFunction(foundProp);
          if (errorMessage) throw new MacroError(errorMessage)
        }
      });
      // Run logic
      foundAttributes.forEach((foundProp) => {
        if (foundProp.attrConfig.createAttribute) {
          if (typeof foundProp.attrConfig.createAttribute === "string") {
            const newAttrName = foundProp.attrConfig.createAttribute
            const existingAttribute = jsxAttributePaths.find((attr) => attr.node.name.name === newAttrName)
            // New value:
            let newAttr: T.JSXAttribute | undefined
            const id = t.jsxIdentifier(newAttrName)
            if (!foundProp.value) {
              newAttr = t.jsxAttribute(id)
            } else if (typeof foundProp.value === "string") {
              newAttr = t.jsxAttribute(id, t.stringLiteral(foundProp.value))
            } else if (typeof foundProp.value === "number") {
              newAttr = t.jsxAttribute(id, t.jsxExpressionContainer(t.numericLiteral(foundProp.value)))
            } else if (typeof foundProp.value === "boolean") {
              newAttr = t.jsxAttribute(id, t.jsxExpressionContainer(t.booleanLiteral(foundProp.value)))
            } else if (t.isNode(foundProp.value)) {
              newAttr = t.jsxAttribute(id, foundProp.value)
            }
            if (newAttr) {
              if (!existingAttribute) {
                // Add new attribute
                elm.node.attributes.push(newAttr)
              } else if (foundProp.attrConfig.replaceValue) {
                existingAttribute.replaceWith(newAttr)
              }
            }
          } else {
            const newAttr = foundProp.attrConfig.createAttribute(foundProp)
            if (newAttr) {
              if (typeof newAttr === "string") {
                const id = t.jsxIdentifier(newAttr)
                const newAttrNode = t.jsxAttribute(id)
                elm.node.attributes.push(newAttrNode)
              } else if (t.isNode(newAttr)) {
                elm.node.attributes.push(newAttr)
              }
            }
          }
        } else if (foundProp.attrConfig.replaceName || foundProp.attrConfig.replaceValue) {
          let newName: string | undefined
          let id: T.JSXIdentifier | T.JSXNamespacedName | undefined
          // Optional new name
          if (foundProp.attrConfig.replaceName) {
            if (typeof foundProp.attrConfig.replaceName === "string") {
              newName = foundProp.attrConfig.replaceName
            } else {
              newName = foundProp.attrConfig.replaceName(foundProp)
            }
            if (newName) {
              id = t.jsxIdentifier(newName)
            }
          } else {
            id = foundProp.nodePath.node.name
          }
          // Optional new value
          let newValueNode: T.JSXAttribute["value"] | undefined
          if (foundProp.attrConfig.replaceValue) {
            let newValue: FullLegalAttributeValues | undefined
            if (typeof foundProp.attrConfig.replaceValue === "string") {
              newValue = foundProp.attrConfig.replaceValue
            } else {
              newValue = foundProp.attrConfig.replaceValue(foundProp)
            }
            if (typeof newValue === "string") {
              newValueNode = t.stringLiteral(newValue)
            } else if (typeof newValue === "number") {
              newValueNode = t.jsxExpressionContainer(t.numericLiteral(newValue))
            } else if (typeof newValue === "boolean") {
              newValueNode = t.jsxExpressionContainer(t.booleanLiteral(newValue))
            } else if (t.isNode(newValue)) {
              newValueNode = newValue
            }
          } else {
            newValueNode = foundProp.nodePath.node.value
          }
          // Replace attribute
          if (id && newValueNode) {
            const newAttr = t.jsxAttribute(id, newValueNode)
            foundProp.nodePath.replaceWith(newAttr)
          }
        }
      });

      // remove props
      for (const foundProp of foundAttributes) {
        if (attributesToRemove.includes(foundProp.nodePath)) continue;
        if (foundProp.attrConfig.remove) {
          attributesToRemove.push(foundProp.nodePath);
        }
      }

    },
  })


  program.scope.crawl()
  // remove all matched attributes
  attributesToRemove.forEach((attrPath) => {
    attrPath.remove();
  });

}


export default createMacro(macro, { configName: "attr-transform" })
