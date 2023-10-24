import peerDepsExternal from "rollup-plugin-peer-deps-external";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const globals = {
    react: "React",
    "react-dom": "ReactDOM",
};

export default {
    input: ["./src/index.tsx"],
    output: [
        {
            file: "./dist/index.esm.js",
            format: "esm",
            globals,
        },
        {
            file: "./dist/index.cjs.js",
            format: "cjs",
            globals,
        },
    ],
    plugins: [
        peerDepsExternal(),
        nodeResolve({ extensions, browser: true }),
        commonjs(),
        typescript(),
        postcss(),
    ],
};
