import macro from "babel-plugin-macros";
import * as babel from "@babel/core";
import syntaxJsx from "@babel/plugin-syntax-jsx";
import { AttrTransformConfig, AttrTransformMacroParams } from "../../types/attr-transform.config";

export async function run(input: string, config: AttrTransformConfig = {}): Promise<string> {
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
