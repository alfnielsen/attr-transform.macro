import macro from 'babel-plugin-macros'
import * as babel from '@babel/core'
import syntaxJsx from "@babel/plugin-syntax-jsx"
import { config as testConfig } from './text-config'
import { AttrTransformConfig } from '../types/attr-transform.macro'

const html = String.raw

async function run(
  input: string,
  config: AttrTransformConfig = {},
): Promise<string> {
  const babelOptions = babel.loadOptions({
    plugins: [

      [syntaxJsx, { pure: false }],
      [macro,
        {
          'attr-transoform': config,
        }],
    ],
  })
  if (!babelOptions) return '' // Type guard
  const imports = `import './attr-transoform.macro'`;
  const inputWithImports = `${imports};${input}`
  const transformed = await babel.transformAsync(inputWithImports, babelOptions)
  return transformed?.code ?? ''
}


test('basic', async () => {
  const input = html`<div p1 flex />`
  const expectedOutput = html`<div tw="p-1" />;`

  let result = await run(input, testConfig)

  expect(result).toBe(expectedOutput)

})
