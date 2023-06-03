import macro from 'babel-plugin-macros'
import * as babel from '@babel/core'
import syntaxJsx from "@babel/plugin-syntax-jsx"
import { attrConfig } from "./test-config";
import { AttrTransformConfig, AttrTransformMacroParams } from "../types/attr-transform.config";

const html = String.raw;

async function run(input: string, config: AttrTransformConfig = {}): Promise<string> {
  const babelOptions = babel.loadOptions({
    plugins: [
      [syntaxJsx, { pure: false }],
      [
        macro,
        {
          "attr-transform": config,
        },
      ],
    ],
  });
  if (!babelOptions) return ""; // Type guard
  const imports = `import './attr-transform.macro'`;
  const inputWithImports = `${imports};${input}`;
  const transformed = await babel.transformAsync(inputWithImports, babelOptions);
  return transformed?.code ?? "";
}

test("replaceName", async () => {
  const input = `<div onclick={() => {}} />`;
  const expectedOutput = `<div onClick={() => {}} />;`;
  let result = await run(input, {
    config: false,
    elms: [
      {
        attrs: [
          {
            matchName: /onclick/i,
            replaceName: "onClick",
          },
        ],
      },
    ],
  });
  expect(result).toBe(expectedOutput);
});

test("replaceValuw", async () => {
  const input = `<div f="1" />`;
  const expectedOutput = `<div f="2" />;`;
  let result = await run(input, {
    config: false,
    elms: [
      {
        attrs: [
          {
            matchName: "f",
            replaceValue: "2",
          },
        ],
      },
    ],
  });
  expect(result).toBe(expectedOutput);
});

test("transform to tw basic", async () => {
  const input = `<div p1 />`;
  const expectedOutput = `<div tw="p-1" />;`;

  let result = await run(input, {
    config: false,
    elms: [
      {
        attrs: [
          {
            matchName: /p([1-9])/,
            value: ({ match }) => `p-${match![1]}`,
            collect: true,
            remove: true,
          },
        ],
        actions: [
          {
            createAttribute: "tw",
            condition: ({ collectedAttributes }) => collectedAttributes.length > 0,
            value: ({ collectedAttributes }) => collectedAttributes.map((attr) => attr.value).join(" "),
          },
        ],
      },
    ],
  });

  expect(result).toBe(expectedOutput);
});
