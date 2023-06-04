export type Colors = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
export declare class Logger {
    logLines: {
        msg: string;
        color: Colors;
    }[];
    content: string;
    indent: number;
    maxDepth: number;
    showUndefined: boolean;
    showNull: boolean;
    lineWith: number;
    enabled: boolean;
    stringify(obj: object, maxDepth?: number): string;
    object(obj: any, color?: Colors, maxDepth?: number): void;
    node(nodePath: any, color?: Colors): void;
    msg(message: string, color?: Colors): void;
    contentLine(line: number, color?: Colors): void;
    note(message: string, color?: Colors): void;
    header(message: string, color?: Colors): void;
    subheader(message: string, color?: Colors): void;
    end(color?: Colors): void;
    line(message: string, prefix: string | undefined, header: boolean, color?: Colors): void;
    getColorLog(): string;
    getLog(): string;
}
