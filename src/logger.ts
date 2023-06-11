import clc from "cli-color"
import { stringify } from "x-stringify"
import { getSourceFromNode, getSourceFromNodePath } from "./getSourceFromNode"

export type Colors =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "bgBlack"
  | "bgRed"
  | "bgGreen"
  | "bgYellow"
  | "bgBlue"
  | "bgMagenta"
  | "bgCyan"
  | "bgWhite"
  | "blackBright"
  | "redBright"
  | "greenBright"
  | "yellowBright"
  | "blueBright"
  | "magentaBright"
  | "cyanBright"
  | "whiteBright"
  | "bgBlackBright"
  | "bgRedBright"
  | "bgGreenBright"
  | "bgYellowBright"
  | "bgBlueBright"
  | "bgMagentaBright"
  | "bgCyanBright"
  | "bgWhiteBright"

export class Logger {
  logLines: { msg: string; color: Colors }[] = []
  content: string = ""
  indent = 2
  maxDepth = 4
  showUndefined = false
  showNull = true
  lineWith = 80

  enabled = false

  stringify(obj: object, maxDepth: number = this.maxDepth) {
    return stringify(obj, {
      indent: this.indent,
      maxDepth,
      showUndefined: this.showUndefined,
      showNull: this.showNull,
    })
  }

  object(obj: any, color: Colors = "white", maxDepth?: number) {
    if (this.enabled) {
      let json = this.stringify(obj, maxDepth)
      this.msg(json, color)
    }
  }

  nodePath(nodePath: any, color: Colors = "white") {
    if (this.enabled) {
      const code = getSourceFromNodePath(nodePath)
      this.msg(code, color)
    }
  }
  node(node: any, color: Colors = "white") {
    if (this.enabled) {
      const code = getSourceFromNode(node)
      this.msg(code, color)
    }
  }

  msg(message: string, color: Colors = "white") {
    if (this.enabled) {
      this.logLines.push({ msg: message, color })
    }
  }
  contentLine(line: number, color: Colors = "white") {
    if (this.enabled) {
      let message = `${line}: ` + this.content.split("\n")[line - 1]
      this.logLines.push({ msg: message, color })
    }
  }
  note(message: string, color: Colors = "blackBright") {
    if (this.enabled) {
      this.line(message, "## -- ", false, color)
    }
  }
  header(message: string, color: Colors = "cyan") {
    if (this.enabled) {
      this.line(message, "## ", true, color)
    }
  }
  subheader(message: string, color: Colors = "cyan") {
    if (this.enabled) {
      this.line(message, ">> ", false, color)
    }
  }
  end(color: Colors = "blackBright") {
    if (this.enabled) {
      this.line("", "---- - - - - -", true, color)
    }
  }
  line(message: string, prefix = "", header: boolean, color: Colors = "white") {
    if (this.enabled) {
      let msg = `${prefix}${message} `
      let len = msg.length
      if (len < this.lineWith) {
        let space = this.lineWith - len
        let char = header ? "-" : " "
        msg += char.repeat(space)
      }
      this.logLines.push({ msg, color })
    }
  }

  getColorLog() {
    return this.logLines.map((x) => clc[x.color](x.msg)).join("\n")
  }
  getLog() {
    return this.logLines.map((x) => x.msg).join("\n")
  }
}
