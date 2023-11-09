import { $, echo, fs } from "zx";

const monacoFiles = [
  "loader.js",
  "editor/editor.main.js",
  "editor/editor.main.css",
  "editor/editor.main.nls.js",
  "editor/editor.main.nls.zh-cn.js",
  "base/common/worker/simpleWorker.nls.js",
  "base/worker/workerMain.js",
  "base/browser/ui/codicons/codicon/codicon.ttf",
];

await Promise.all([
  ...monacoFiles.map((file) =>
    fs.copy(`./node_modules/monaco-editor/min/vs/${file}`, `public/vs/${file}`)
  ),
  fs.copy(
    "./node_modules/vscode-oniguruma/release/onig.wasm",
    "public/onig.wasm"
  ),
  fs.copy("./node_modules/dolphindb/docs.zh.json", "public/docs.zh.json"),
]);

echo("monaco-dolphindb assets prepared!");
