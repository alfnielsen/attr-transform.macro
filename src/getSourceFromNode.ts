import type { NodePath, types as T } from "@babel/core";

export function getSourceFromNode(path: NodePath<T.Node>) {
  const { default: generator } = require("@babel/generator");
  const print = generator;
  const code = print(path.node).code;
  return code;
}
