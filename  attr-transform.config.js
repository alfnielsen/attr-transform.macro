/** @type {import('../types/attr-transform.macro.d.ts')} */

module.exports = {  
  elms: [
    {
      attrs: [
        {
          matchName: "flex-col",
          match: /flex-col/,
          replaceValue: ({ match }) => `p-${match?.[1]}`,
          collect: true,
          remove: true,
        },
        {
          matchName: "tw padding",
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
          matchName: "tw colors",
          match: /(red|blue|green)/,
          value: ({ match }) => `text-${match?.[1]}-600`,
          collect: true,
          remove: true,
        },
        {
          matchName: "flex",
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
          matchName: "standard line element",
          match: "line",
          value: "flex items-center justify-start",
          collect: true,
          remove: true,
        },
        {
          matchName: "tw attribute",
          description: "Collect tw value if exists",
          match: "tw",
          collect: true
        },
        {
          matchName: "Update Tw attribute",
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


