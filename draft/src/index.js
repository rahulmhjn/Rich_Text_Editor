import React from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
// import App from "./App";

import createKaTeXPlugin from "draft-js-katex-plugin";
import katex from "katex";
// import ConfiguredEditor from "./stories/ConfiguredEditor";

const katexTheme = {
  insertButton: "Button Button-small Button-insert",
};

function configuredEditor() {
  const kaTeXPlugin = createKaTeXPlugin({
    // the configs here are mainly to show you that it is possible. Feel free to use w/o config
    doneContent: { valid: "Close", invalid: "Invalid syntax" },
    katex, // <-- required
    MathInput: null,
    removeContent: "Remove",
    theme: katexTheme,
    translator: null,
  });

  const plugins = [kaTeXPlugin];

  const baseEditorProps = Object.assign({
    plugins,
  });

  return { baseEditorProps, InsertButton: kaTeXPlugin.InsertButton };
}

const MyEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const { baseEditorProps, InsertButton } = configuredEditor();

  const _onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  return (
    <div>
      <button onClick={_onBoldClick}>Bold</button>
      <InsertButton />
      <InsertButton initialValue="int(s-x)^3">Insert ascii math</InsertButton>
      <Editor
        plugins={baseEditorProps.plugins}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
      />
    </div>
  );
};

ReactDOM.render(<MyEditor />, document.getElementById("root"));
