import React, { useRef } from "react";
import "./code-editor.css";
import "./syntax.css";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import Highlighter from "monaco-jsx-highlighter";
import CodeShift from "jscodeshift";

interface EditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<EditorProps> = ({ initialValue, onChange }) => {
  let monacoEditorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getEditorValue, monacoEditor) => {
    monacoEditorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getEditorValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      CodeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    const unformattedCode = monacoEditorRef.current.getModel().getValue();
    const formattedCode = prettier
      .format(unformattedCode, {
        parser: "babel",
        plugins: [parser],
        semi: true,
        singleQuote: true,
        useTabs: false,
      })
      .replace(/\n$/, "");
    monacoEditorRef.current.setValue(formattedCode);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
