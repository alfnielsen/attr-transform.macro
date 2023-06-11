import type { NodePath, types as T } from "@babel/core"

import { MacroError, createMacro } from "babel-plugin-macros"
import { x } from "node-x-path"
import { stringify } from "x-stringify"

import type { AttrTransformMacroParams } from "./attr-transform.config-types"

import { Logger } from "./logger"
import { getSourceFromNodePath } from "./getSourceFromNode"
import { loadConfig } from "./loadConfig"
import { traverseJSXElement } from "./traverseJSXElement"

const log = new Logger()

let sessionStartet = false

function macro(params: AttrTransformMacroParams): void {
  const t = params.babel.types
  const program = params.state.file.path
  const fileName = params.state.filename as string
  log.enabled = true
  log.header(`attr-transform.macro`)
  log.note(`file: ${fileName}`)
  const content = params.state.file.code
  log.content = content

  const attributesToRemove: NodePath<T.JSXAttribute>[] = []

  const attrTransformConfig = loadConfig(params, log)

  if (!attrTransformConfig.devMode) {
    log.enabled = false
  }

  log.header(`Using Config`)
  log.object(attrTransformConfig)
  log.end()
  log.header(`Start traverse ast`)

  program.traverse({
    JSXElement(path) {
      traverseJSXElement(path, attrTransformConfig, params, attributesToRemove, t, log)
    },
  })

  program.scope.crawl()
  // remove all matched attributes
  attributesToRemove.forEach((attrPath) => {
    attrPath.remove()
  })

  // Print transformation

  if (attrTransformConfig.devMode) {
    const devMode = attrTransformConfig.devMode
    const code = getSourceFromNodePath(program)
    if (devMode.onlyTranformation) {
      log.logLines = [] // clear log
    }
    if (devMode.onlyFiles) {
      let onlyFiles = devMode.onlyFiles
      const name = fileName.split("/").pop()!
      const nameNoExtension = name.replace(/\.[^/.]+$/, "")
      if (!Array.isArray(onlyFiles)) {
        onlyFiles = [onlyFiles]
      }
      const fileNameMatch = onlyFiles.some((file) => {
        if (typeof file === "string") {
          return file === fileName || file === name || file === nameNoExtension
        } else {
          return file.test(fileName) || file.test(name) || file.test(nameNoExtension)
        }
      })
      if (!fileNameMatch) {
        return
      }
    }

    log.msg(`\n\n`)
    log.header(`Transformed Code`)
    log.note(`jsx-transform.macro (DevMode Transformed)`)
    log.note(`file: ${params.state.filename}`)

    log.msg(code, "white")
    log.msg("\n")
    log.end()
    log.msg("\n\n")

    let logMessage: string | undefined
    if (devMode.colors === true) {
      logMessage = log.getColorLog()
    } else if (devMode.colors === false) {
      logMessage = log.getLog()
    }

    if (devMode.logToConsole) {
      if (logMessage === undefined) {
        logMessage = log.getColorLog()
      }
      console.log(logMessage)
    }
    if (devMode.logWithThrow) {
      if (logMessage === undefined) {
        logMessage = log.getColorLog()
      }
      throw new MacroError(logMessage)
    }
    if (devMode.printToFile) {
      if (logMessage === undefined) {
        logMessage = log.getLog()
      }
      let deugFileName = "attr-transform.macro.debug-log.txt"
      if (typeof devMode.printToFile === "string") {
        deugFileName = devMode.printToFile
      }
      const path = require("path")
      const debugFilePath = path.join(process.cwd(), deugFileName)
      if (!sessionStartet) {
        sessionStartet = true
        //fs.writeFileSync(debugFilePath, "") // clear file
      }
      const splitter = "#####################__##__attr-tranform__##__#########################"

      const lastContent = x.loadSync(debugFilePath)
      let fileLine = `########## ${fileName}`
      const newContent = `\n${fileLine}\n${logMessage}`
      if (lastContent.length > 0) {
        const parts = lastContent.split(splitter)
        // contains content
        const findPart = parts.findIndex((part) => {
          return part.includes(fileLine)
        })
        if (findPart >= 0) {
          // already contains file line
          parts.splice(findPart, 1, newContent)
        } else {
          parts.push(newContent)
        }
        const newFileContent = parts.join(splitter)
        x.saveSync(debugFilePath, newFileContent)
      } else {
        const newFileContent = `${splitter}\n${newContent}`
        x.saveSync(debugFilePath, newFileContent)
      }
    }
  }

  log.msg(`\n`)
  log.header("attr-attribute.macro : DONE", "blackBright")
  log.msg(`\n\n`)
}

export default createMacro(macro, { configName: "attr-transform" })
