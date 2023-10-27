import { pluginPreview } from "@rspress/plugin-preview";
import * as path from "path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "Rspress",
  plugins: [pluginPreview()],
  markdown: {
    mdxRs: false,
  },
});
