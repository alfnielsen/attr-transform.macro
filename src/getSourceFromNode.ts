import type { NodePath, types as T } from "@babel/core";

export function getSourceFromNodePath(path: NodePath<T.Node>) {
  const { default: generator } = require("@babel/generator");
  const code = generator(path.node).code;
  return code;
}

export function getSourceFromNode(node: T.Node) {
  const { default: generator } = require("@babel/generator");
  const code = generator(node).code;
  return code;
}

export function generateNode(node: T.Node) {
  const { default: generator } = require("@babel/generator");
  return generator(node);
}
