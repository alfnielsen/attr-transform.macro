/** @type {import('./types/attr-transform.config.d.ts').AttrTransformConfig} */

module.exports = {  
  elms: [
    {
      attrs: [
        {
          match: /flex-col/,
          replaceValue: ({ match }) => `p-${match?.[1]}`,
          collect: true,
          remove: true,
        },
        {
          name: "padding",
          match: /p([0-9])/,
          value: ({ match }) => `p-${match?.[1]}`,
          validate: ({ collectedAttributes }) => {
            const countPadding = collectedAttributes.filter((attr) => attr.attrConfig.name === "padding").length
            if (countPadding > 1) {
              return "You can't use more than one 'tw padding ( p1, p2, ..., p9 )' on the same element"
            }
          },
          collect: true,
          remove: true,
        },
        {
          match: /(red|blue|green)/,
          value: ({ match }) => `text-${match?.[1]}-600`,
          collect: true,
          remove: true,
        },
        {
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
          match: "line",
          value: "flex items-center justify-start",
          collect: true,
          remove: true,
        },
        {
          description: "Collect tw value if exists",
          match: "tw",
          collect: true
        },
        {
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


