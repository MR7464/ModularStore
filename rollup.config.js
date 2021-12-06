import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/index.js",
      format: "es",
    },
    {
      file: "lib/index.min.js",
      format: "iife",
      name: "ms",
      plugins: [terser()],
    },
  ],
  plugins: [commonjs(), nodeResolve(), json(), typescript({})],
  external: ['react']
};
