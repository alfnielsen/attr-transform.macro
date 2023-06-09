/** @type {import('./types/attr-transform.config.js').AttrTransformConfig} */

module.exports = {
  devMode: {
    maxDepth: 5,
    printToFile: true,
    onlyTranformation: true,
  },
  elms: [
    {
      attrs: [
        {
          matchName: "fl",
          replaceName: "float",
        },
        {
          matchName: /(\w+)\-(\w+)/,
          dontMatchName: /data\-/,
          replaceName: ({ match }) => `${match?.[1]}`,
          replaceValue: ({ match }) => `${match?.[2]}`,
        },
        {
          name: "padding",
          matchName: /p([0-9])/,
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
          matchName: /(red|blue|green)/,
          value: ({ match }) => `text-${match?.[1]}-600`,
          collect: true,
          remove: true,
        },
        {
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
          matchName: "line",
          value: "flex items-center justify-start",
          collect: true,
          remove: true,
        },
        {
          description: "Collect tw value if exists",
          matchName: "tw",
          collect: true,
        },
      ],
      actions: [
        {
          description: "Create tw attribute if not exists, and append collected values (including previous tw values)",
          condition: ({ collectedAttributes }) => collectedAttributes.length > 0,
          createAttribute: "tw", // ensure tw attribute exists
          value: ({ collectedAttributes, parentNodePath }) => {
            //console.log("tagMatch", parentNodePath.node.name.name, collectedAttributes.length)
            //console.log("collectedAttributes", collectedAttributes.map((attr) => attr.nodePath.node.name.name).join(" "))
            const value = collectedAttributes.map((attr) => attr.value).join(" ")
            return value
          },
        },
      ],
    },
  ],
}


