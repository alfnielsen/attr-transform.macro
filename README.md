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
including a list of options and actions for the transformation.


```ts
// Rename attribute
let from = <Button onclick={} />;
let to = <Button onClick={} />;

// config:
elms:[
  attrs:[
    {
      matchName: /onclick/i,
      replaceName: "onClick"
    }
  ]
]
```

```ts
// Change value
let from = <div tw="flex-col" />;
let to = <div tw="flex flex-col" />;
// config:
elms:[
  attrs:[
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
  ]
]
```

```ts
// Rename attribute and change value
let from = <div name-per data-prop="t" />;
let to = <div name="per" data-prop="t" />;
// config:
elms:[
  attrs:[
    {
      matchName: /(\w)\-(\w)/,
      dontMatchName: /data\-/,
      replaceName: ({match}) => match[0],
      replaceValue: ({match}) => match[1]
    }
  ]
]
```


```ts
// Collect and transform (including remove attributes and create new attribute)
let from = <div flex between p1 />;
let to = <div tw="flex items-center justify-between p-1" />;
// config:
elms:[
  attrs:[
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
    }
  ],
  actions: [
    {
      description: "Create tw if not exists",
      createAttribute: "tw", // ensure tw attribute exists
      condition: ({ collectedAttributes }) => collectedAttributes.length > 0,
      value: ({ collectedAttributes }) => {
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
]

```

## Logic steps and flow

The transformation is done in 5 steps:

1. Collect all attributes that match the config
2. Call validate-functions, value-functions, replace-function and match-funtions. (This is done after match to allow collect flag)
3. Transform the attributes (replace name and/or value etc.)
4. Run actions on the element
5. Remove attributes that are marked for "remove: true"

## Typescript difinitions

This pre-processor "just" take the (js) JSX attribute that matches and transform them.

To have typing for the attribute, you must either add the properties to the component,
or add global IntrinsicAttributes properties to a difinitions file.

See TS doc for jsx: [https://www.typescriptlang.org/docs/handbook/jsx.html](https://www.typescriptlang.org/docs/handbook/jsx.html)
```ts
// ./types/attr-typing.d.ts
declare global {
  namespace JSX {
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


For React app (Using `react-scripts` - like `create-react-app`) that includes the `react-app-env.d.ts` file, 
you can add the typing there.

```ts
/// <reference types="react-scripts" />

declare namespace React {
  interface Attributes {
    /** tw: "p1" */
    p1?: boolean;
    /** tw: "p2" */
    p2?: boolean;
    /** flex: "flex item-center" (Work in combination with "col") */
    flex?: boolean;
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
export type AttrTransformMacroParams = Omit<MacroParams, "config"> & {
  config?: AttrTransformConfig;
};

export type AttrTransformConfig = {
  config?: string | false; // file name (default: attr-transform.config.js)
  devMode?: AttrTransformConfigDebug;
  elms?: ElmConfig[];
};

export type AttrTransformConfigDebug = {
  logToConsole?: boolean;
  logWithThrow?: boolean;
  printToFile?: boolean | string;
  maxDepth?: number;
  colors?: boolean;
};

export type ElmConfig = {
  match?: string | RegExp; // Optional match // Special "*" matches all
  dontMatch?: string | RegExp; // Optional dontMatch
  attrs: AttrConfig[];
  actions?: PostMatchAction[];
};

// elm/action methods
export type ConditionFunc = (matchedAttributes: PostActionMatch) => boolean;
export type ActionValueFunc = (postActionMatch: PostActionMatch) => FullLegalAttributeValues;
export type CreateActionValueFunc = (postActionMatch: PostActionMatch) => string | T.JSXAttribute;

// attri methods
export type MatchValueFunc = (attrMatch: AttrMatch) => boolean;
export type AttrValueFunc = (attrMatch: AttrMatch) => FullLegalAttributeValues;
export type AttrStringValueFunc = (attrMatch: AttrMatch) => string;
export type CreateValueFunc = (attrMatch: AttrMatch) => string | T.JSXAttribute;
export type ValidateValueFunc = (attrMatch: AttrMatch) => string | undefined;
export type ActionFunc = (attrMatch: AttrMatch) => void;
export type AttrConfig = {
  // a name for the config (for debugging and overview)
  name?: string;
  // a name for the config (for debugging and overview)
  description?: string;
  // a list of tags. Use for more complex match and replace (Like selecteing all collected with a tag)
  tags?: string[];
  // mosth match the attribute name ( Fx: "padding" or "p1" or /p(1-9)/)
  matchName?: string | RegExp;
  // most not match the attribute name ( Fx: "padding" or "p1" or /p(1-9)/)
  dontMatchName?: string | RegExp;
  // Calcalate a value from the AttrMatch Object. ( Fx: "p-1" or ({match}) => `p-${match[1]}` )
  value?: string | AttrValueFunc;
  // Replace the value of the matched attribute with the calculated value
  replaceValue?: string | AttrValueFunc;
  replaceName?: string | AttrStringValueFunc;
  // Validate the value (Throw MacroError if not valid)
  validate?: ValidateValueFunc;
  // collect AttrMatch Object to be used by other attributes config (This is not need, mostly to indicate that it's macthed)
  collect?: boolean;
  // remove this attribute after processing of all attributes
  remove?: boolean;
};

export type PostMatchAction = {
  // a name for the config (for debugging and overview)
  name?: string;
  // a name for the config (for debugging and overview)
  description?: string;
  // a list of tags. Use for more complex match and replace (Like selecteing all collected with a tag)
  tags?: string[];
  // conditions
  condition?: ConditionFunc;
  // create the attribute if not exists
  createAttribute?: string | CreateActionValueFunc;
  replaceName?: string | AttrStringValueFunc;
  value?: string | ActionValueFunc;
  action?: ActionFunc;
};

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

```


## Full config example

attr-transform.config.js
```ts
/** @type {import('attr-transform.macro/types/attr-transform.config.d.ts').AttrTransformConfig} */

module.exports = {  
  elms: [    
    {
      // match: "div" // match all divs
      dontMatch: "img",  // dont match img
      attrs: [
        {
          name: "tw padding",
          matchName: /p([0-9])/,
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
          matchName: /(red|blue|green)/,
          value: ({ match }) => `text-${match?.[1]}-600`,
          collect: true,
          remove: true,
        },
        {
          name: "flex",
          matchName: "flex",
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
          matchName: "line",
          value: "flex items-center justify-start",
          collect: true,
          remove: true,
        },
        {
          name: "tw attribute",
          description: "Collect tw value if exists",
          matchName: "tw",
          collect: true
        }
      ],
      actions: [
        {
          name: "Update Tw attribute",
          description: "Create tw attribute if not exists, and append collected values (including previous tw values)",
          createAttribute: "tw", // ensure tw attribute exists
          condition: ({ collectedAttributes }) => collectedAttributes.length > 1,
          value: ({ collectedAttributes }) => {
            const value = collectedAttributes.map((attr) => attr.value).join(" ")
            return value
          }
        }
      ]
    },
  ],  
}


``` 



## Debug transformation (debug configuration)

You can add `devMode` in the config file to debug and test the configuration (and transformation)

The standard `babal-plugin-macros` dont allow console.log so you must either change that (allow console.log - I do not know how to do that!!)  
or hack the console by trowing an error (The plugin will, like when validation config fails, throw an MacroError)


The easiest way to debug is to use `printToFile` config.  
It will create a new file `attr-transform.macro.debug-log.txt` in the root of your project when transformation is run.

It contains the ussed config, debug info of found elements and attributes, and the full transformed file content.


All debug optiosn: 

  - `colors` add console colors so it should only be used with logToConsole or logWithThrow
  - `logToConsole` log to console (will not work with standard babel-plugin-macros)
  - `logWithThrow` log to console by throwing an error (will work with standard babel-plugin-macros)
  - `printToFile` print debug info to file (will work with standard babel-plugin-macros)
  - `maxDepth` max depth for serialising (like json-stringify) of debug object (default 10) - The Babel NodePath object can be huge! with very deep nesting!
  - `onlyTranformation` only print the transformation result (not the full debug info)
  - `onlyFiles` Only print to file matching this string / regex (default: undefined = all files)

```ts
module.exports = {
  devMode: {
    printToFile: true,
  },
  elms: [(...)]
}
```

