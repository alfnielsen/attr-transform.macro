import { AttrConfig, AttrTransformConfig, AttrTransformMacroParams } from "../types/attr-transform.config";

export const attrConfig = (attrs: AttrConfig[]): AttrTransformConfig => {
  return {
    config: false,
    elms: [
      {
        attrs: attrs,
      },
    ],
  };
};

export const config: AttrTransformMacroParams["config"] = {
  elms: [
    {
      attrs: [
        {
          name: "flex-col",
          matchName: /flex-col/,
          replaceValue: ({ match }) => `p-${match?.[1]}`,
          collect: true,
          remove: true,
        },
        {
          name: "tw padding",
          matchName: /p([0-9])/,
          value: ({ match }) => `p-${match?.[1]}`,
          validate: ({ match, allMatchingAttributes }) => {
            const countPadding = allMatchingAttributes.filter((attr) => attr.attrConfig.name === "tw padding").length;
            if (countPadding > 1) {
              return "You can't use more than one 'tw padding ( p1, p2, ..., p9 )' on the same element";
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
            const notAllowed = matchAttr.allMatchingAttributes.some((attr) => attr.name === "line");
            if (notAllowed) {
              return "You can't use both 'flex' and 'line' on the same element";
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
          collect: true,
        },
      ],
      actions: [
        {
          name: "Update Tw attribute",
          description: "Create tw attribute if not exists, and append collected values (including previous tw values)",
          createAttribute: "tw", // ensure tw attribute exists
          value: ({ collectedAttributes }) => {
            const value = collectedAttributes.map((attr) => attr.value).join(" ");
            return value;
          },
        },
      ],
    },
  ],
};
