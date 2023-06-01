# attr-transform.macro

This is a [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) for built-time, pre-processor, transformation of jsx attributes (JSX.Attribute)


It is inspired by [twin.macro](https://github.com/ben-rogerson/twin.macro) and original design as pre-processor for that macro.

But it can be used to transform attributes in many scenarios.

A lot of the logic for the transformation is set in the config file,
so it's up to the user to define the transformation.

There will most likely be npm packages with predefined config for different use cases in the future.


It can also (but is not design for that purpose only),
validate attributes on an JSX.Element and throw an error if the attributes are not valid.

## Install

> npm install attr-transform.macro --save-dev

Or

> yarn add -D attr-transform.macro


## Usages

This is a [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros),
and work from babel detecting an import with the ".macro" post name.

The pre-build step is triggered by an import of the "attr-transform.macro" in a file.

```ts
import "attr-transform.macro"
```

The order of import define the order of the pre-process.

If you want to use it with [twin.macro](https://github.com/ben-rogerson/twin.macro), the import most come before twin.macro.

```ts
import "attr-transform.macro"
import "twin.macro"
```


## Examples of possible transformation

The config is a list of elements and attributes to transform,
including a list of options for the transformation.


```ts
// Rename attribute
let from = <Button onclick={} />;
let to = <Button onClick={} />;

// config:
{
  matchName: /onclick/i,
  replaceName: "onClick",
}
```

```ts
// Change value
let from = <div tw="flex-col" />;
let to = <div tw="flex flex-col" />;
// config:
{
  matchName: "tw",
  replaceName: ({value}) => {
    const values = value.split(" ");
    if (values.includes("flex-col") || !values.includes("flex")) {
      values.unshift("flex");
    }
    return values.join(" ");
  },
}

```

```ts
// Rename attribute and change value
let from = <div name-per />;
let to = <div name="per" />;
// config:
let attr: {
  matchName: /(\w)\-(\w)/,
  replaceName: ({match}) => match[0],
  replaceValue: ({match}) => match[1]
}
```

```ts
// Collect and transfor (including remove atttribus and create new attribute)
let from = <div flex between p1 />;
let to = <div tw="flex items-center justify-between p-1" />;
// config:
[
  {
    matchName: "flex",
    collect: true,
    remove: true,
  },
  {
    matchName: "between",
    value: "justify-between",
    collect: true,
    remove: true,
  },
  {
    name: "padding",
    matchName: /p([1-9])/,
    value: ({match}) => `p-${match[1]}`,        
    validate: ({ collectedAttributes }) => {
      const countPadding = collectedAttributes.filter((attr) => attr.attrConfig.name === "padding").length
      if (countPadding > 1) {
        return "You can't use more than one 'padding ( p1, p2, ..., p9 )' on the same element"
      }
    },
    collect: true,
    remove: true,
  },
  {
    description: "collect the original value if exists",
    matchName: "tw",
    collect: true
  },
  {
    description: "Create tw if not exists",
    createAttribute: "tw", // ensure tw attribute exists
    replaceValue: ({ collectedAttributes }) => {
      const flex = collectedAttributes.some((attr) => attr.name === "flex")
      const col = collectedAttributes.some((attr) => attr.name === "col")
      let value = collectedAttributes.some((attr) => attr.value ?? "").filter(x => !!x).join(" ");
      if(flex){
         tw += " flex"
         if(col){
           tw += " flex-col"
         }else{
            tw += " items-center"
         }
      }
      return value
    }
  }
]

```

## Logic steps and flow

The transformation is done in 4 steps:

1. Collect all attributes that match the config
2. Call validate-functions, value-functions, replace-function and match-funtions. (This is done after match to allow collect flag)
3. Transform the attributes (replace name and/or value etc.)
4. Remove attributes that are marked for "remove: true"

## Typescript difinitions

This pre-processor "just" take the (js) JSX attribute that matches and transform them.

To have typing for the attribute, you must either add the properties to the component,
or add global IntrinsicAttributes properties to a difinitions file.

See TS doc for jsx: [https://www.typescriptlang.org/docs/handbook/jsx.html](https://www.typescriptlang.org/docs/handbook/jsx.html)
```ts
// ./types/attr-typing.d.ts
declare global {
  namespace JSX {

    // interface ElementAttributesProperty {
    //     p1?: boolean
    //     flex?: boolean
    //     line?: boolean
    // }

    interface IntrinsicAttributes {
      /** tw: "flex" */
      flex?: boolean;
      /** tw: "flex items-center justify-start" */
      line?: boolean;
      /** tw: "p1" */
      p1?: boolean;
      /** tw: "p2" */
      p2?: boolean;
    }
  }
}

```


## Config

_(optional)_: The config can be added in babel-plugin-macro's config (either in a babel.config.js or in package.json)
under the macro name "attr-transform" key.

Or it can be loaded from a config file (default: `attr-transform.config.js`) in the root of the project.

(You can change the file name with the "config" properties in the babel-plugin-macros config)


See [babel-plugin-macros docs](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/author.md) for more info


### Config types

```ts
const config =
{
  // a list of elements to transform
  elms: [
    {
      match: "div", // match only div elements (If no "match" are provided, all elements are matched)
      attrs:[
        {
          matchName: "name", // See "AttrConfig" below, for all options
        }
      ]
    }
  ]

}
```

Full config types (interfaces):
```ts
type AttrTransformConfig = {
  config?: string // file name (default: attr-transform.config.js)
  elms?: ElmConfig[]
}
type ElmConfig = {
  match?: string | RegExp; // Optional match (If no match are provided, all elements are matched)
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
  match?: string | RegExp
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
```



## Full config example

attr-transform.config.js
```ts
/** @type {import('../src/twin-atttributes.types.ts').TwinAttributeConfig} */

module.exports = {  
  elms: [    
    {
      // match: "div" // match all divs
      dontMatch: "img",  // dont match img
      attrs: [
        {
          name: "tw padding",
          match: /p([0-9])/,
          value: ({ match }) => `p-${match?.[1]}`,
          validate: ({ collectedAttributes }) => {
            const countPadding = collectedAttributes.filter((attr) => attr.attrConfig.name === "tw padding").length
            if (countPadding > 1) {
              return "You can't use more than one 'tw padding ( p1, p2, ..., p9 )' on the same element"
            }
          },
          collect: true,
          remove: true,
        },
        {
          name: "tw colors",
          match: /(red|blue|green)/,
          value: ({ match }) => `text-${match?.[1]}-600`,
          collect: true,
          remove: true,
        },
        {
          name: "flex",
          match: "flex",
          validate: (matchAttr) => {
            const notAllowed = matchAttr.allMatchingAttributes.some((attr) => attr.name === "line")
            if (notAllowed) {
              return "You can't use both 'flex' and 'line' on the same element"
            }
          },
          value: "flex items-center justify-start",
          collect: true,
          remove: true,
        },
        {
          name: "standard line element",
          match: "line",
          value: "flex items-center justify-start",
          collect: true,
          remove: true,
        },
        {
          name: "tw attribute",
          description: "Collect tw value if exists",
          match: "tw",
          collect: true
        },
        {
          name: "Update Tw attribute",
          description: "Create tw attribute if not exists, and append collected values (including previous tw values)",
          createAttribute: "tw", // ensure tw attribute exists
          replaceValue: ({ collectedAttributes }) => {
            const value = collectedAttributes.map((attr) => attr.value).join(" ")
            return value
          }
        }
      ],
    },
  ],  
}


``` 