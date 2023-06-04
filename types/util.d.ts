export type Colors = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
export declare class Logger {
    logLines: {
        msg: string;
        color: Colors;
    }[];
    indent: number;
    maxDepth: number;
    showUndefined: boolean;
    showNull: boolean;
    stringify(obj: object, maxDepth?: number): string;
    object(obj: any, color?: Colors): void;
    msg(message: string, color?: Colors): void;
    getColorLog(): string;
    getLog(): string;
}
