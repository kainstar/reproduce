import { loader } from "@monaco-editor/react";
import { Spin } from "antd";
import {
  MonacoDolphinDBDiffEditor,
  MonacoDolphinDBEditor,
} from "monaco-dolphindb/react";
import type { editor } from "monaco-editor";
import * as React from "react";
import { useDark } from "rspress/runtime";
import { loadWASM } from "vscode-oniguruma";

async function beforeMonacoEditorInit() {
  return loadWASM(await fetch("/onig.wasm"));
}

type DolphinDBEditorProps = Omit<
  React.ComponentProps<typeof MonacoDolphinDBEditor>,
  "dolphinDBLanguageOptions" | "beforeMonacoEditorInit"
>;

loader.config({
  paths: {
    vs: "/vs",
  },
  "vs/nls": {
    availableLanguages: {
      "*": "zh-cn",
    },
  },
});

function useDolphinDBMonaco(): {
  dolphinDBLanguageOptions: React.ComponentProps<
    typeof MonacoDolphinDBEditor
  >["dolphinDBLanguageOptions"];
  editorTheme: string;
} {
  const isDark = useDark();

  return {
    dolphinDBLanguageOptions: React.useMemo(
      () => ({
        docs: "/docs.zh.json",
        language: "zh",
        theme: isDark ? "dark" : "light",
      }),
      [isDark]
    ),
    editorTheme: isDark ? "vs-dark" : "light",
  };
}

export function DolphinDBEditor(props: DolphinDBEditorProps) {
  const { editorTheme, dolphinDBLanguageOptions } = useDolphinDBMonaco();

  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);

  React.useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  return (
    <MonacoDolphinDBEditor
      {...props}
      dolphinDBLanguageOptions={dolphinDBLanguageOptions}
      loading={<Spin spinning />}
      beforeMonacoInit={beforeMonacoEditorInit}
      theme={editorTheme}
      onMount={(editor) => {
        editorRef.current = editor;
      }}
      options={{
        padding: {
          top: 8,
          bottom: 8,
        },
        acceptSuggestionOnEnter: "on",
        minimap: {
          enabled: true,
        },
        find: {
          addExtraSpaceOnTop: false,
        },
        ...props.options,
      }}
    />
  );
}

type DolphinDBDiffEditorProps = Omit<
  React.ComponentProps<typeof MonacoDolphinDBDiffEditor>,
  "dolphinDBLanguageOptions" | "beforeMonacoEditorInit"
>;

export function DolphinDBDiffEditor(props: DolphinDBDiffEditorProps) {
  const { editorTheme, dolphinDBLanguageOptions } = useDolphinDBMonaco();

  return (
    <MonacoDolphinDBDiffEditor
      {...props}
      dolphinDBLanguageOptions={dolphinDBLanguageOptions}
      loading={<Spin spinning />}
      beforeMonacoInit={beforeMonacoEditorInit}
      theme={editorTheme}
      options={{
        padding: {
          top: 8,
          bottom: 8,
        },
        minimap: {
          enabled: true,
        },
        find: {
          addExtraSpaceOnTop: false,
        },
        ...props.options,
      }}
    />
  );
}
