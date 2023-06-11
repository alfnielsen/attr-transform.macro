import { MacroError } from "babel-plugin-macros"
import { join } from "path"

import type { AttrTransformConfig, AttrTransformMacroParams } from "./attr-transform.config-types"

import { Logger } from "./logger"

export function loadConfig(params: AttrTransformMacroParams, log: Logger): AttrTransformConfig {
  let config: AttrTransformConfig = {}
  const { config: babelMacroConfig } = params
  log.header(`Config`)
  log.note(`(from babel-macro-pluing under 'attr-transform' section)`)
  log.object(babelMacroConfig)
  log.end()

  // Get the config in babel-macro config: https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/author.md
  // Or from file

  let configFile: string | undefined = undefined
  if (babelMacroConfig?.config === undefined) {
    configFile = "attr-transform.config.cjs"
  } else if (typeof babelMacroConfig?.config === "string") {
    configFile = babelMacroConfig.config
  } else {
    config = babelMacroConfig
  }

  if (configFile) {
    const baseDirectory = process.cwd()
    //throw new MacroError("baseDirectory: " + baseDirectory)
    //log("baseDirectory: " + baseDirectory, "configFile: " + configFile)
    const configFilePath = join(baseDirectory, configFile)
    log.note(`Loading config from file: `, "cyan")
    log.note(`path: ${configFilePath}`, "blackBright")
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
              attrs: {
                padding: {
                  matchName: /p([0-9])/,
                  replaceValue: ({match}) => \`p-\${match[1]}\`,
                },
                color: {
                  matchName: /([red|blue|green])/,
                  replaceValue: ({match}) => \`text-\${match[1]}-600\`,
                },
                line: {
                  matchName: /line-([0-9])/,
                  replaceValue: "flex items-center justify-start",
                } 
              },
            },
          ],
        }
        `
    )
  }

  if (config.devMode && config.devMode.maxDepth) {
    log.maxDepth = config.devMode.maxDepth
  }
  return config
}
