import type { NodePath, types as T } from '@babel/core'

import { MacroError, createMacro } from "babel-plugin-macros";

import type { AttrTransformMacroParams } from "./attr-transform.config-types";

import { Logger } from "./logger";
import { getSourceFromNodePath } from "./getSourceFromNode";
import { loadConfig } from "./loadConfig";
import { traverseJSXElement } from "./traverseJSXElement";

const log = new Logger();

function macro(params: AttrTransformMacroParams): void {
  const t = params.babel.types;
  const program = params.state.file.path;
  log.enabled = true;
  log.header(`attr-transform.macro`);
  log.note(`file: ${params.state.filename}`);
  const content = params.state.file.code;
  log.content = content;

  const attributesToRemove: NodePath<T.JSXAttribute>[] = [];

  const attrTransformConfig = loadConfig(params, log);

  if (!attrTransformConfig.devMode) {
    log.enabled = false;
  }

  log.header(`Using Config`);
  log.object(attrTransformConfig);
  log.end();
  log.header(`Start traverse ast`);

  program.traverse({
    JSXElement(path) {
      traverseJSXElement(path, attrTransformConfig, params, attributesToRemove, t, log);
    },
  });

  program.scope.crawl();
  // remove all matched attributes
  attributesToRemove.forEach((attrPath) => {
    attrPath.remove();
  });

  // Print transformation

  if (attrTransformConfig.devMode) {
    const devMode = attrTransformConfig.devMode;
    const code = getSourceFromNodePath(program);
    if (devMode.onlyTranformation) {
      log.logLines = [] // clear log
    }
    log.msg(`\n\n`);
    log.header(`Transformed Code`);
    log.note(`jsx-transform.macro (DevMode Transformed)`);
    log.note(`file: ${params.state.filename}`)
    log.msg(code, "white");
    log.msg("\n");
    log.end();
    log.msg("\n\n");

    let logMessage: string | undefined;
    if (devMode.colors === true) {
      logMessage = log.getColorLog();
    } else if (devMode.colors === false) {
      logMessage = log.getLog();
    }

    if (devMode.logToConsole) {
      if (logMessage === undefined) {
        logMessage = log.getColorLog();
      }
      console.log(logMessage);
    }
    if (devMode.logWithThrow) {
      if (logMessage === undefined) {
        logMessage = log.getColorLog();
      }
      throw new MacroError(logMessage);
    }
    if (devMode.printToFile) {
      if (logMessage === undefined) {
        logMessage = log.getLog();
      }
      let fileName = "attr-transform.macro.debug-log.txt";
      if (typeof devMode.printToFile === "string") {
        fileName = devMode.printToFile;
      }
      const fs = require("fs");
      const path = require("path");
      const filePath = path.join(process.cwd(), fileName);
      fs.writeFileSync(filePath, logMessage);
    }
  }

  log.msg(`\n`);
  log.header("attr-attribute.macro : DONE", "blackBright");
  log.msg(`\n\n`);
}


export default createMacro(macro, { configName: "attr-transform" })
