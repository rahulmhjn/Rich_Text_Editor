import React from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import App from "./App";
import KatexScreen from "./KatexScreen";

import { Fraction, toTex } from "algebra.js";
import { Node, Context } from "react-mathjax2";

function Formula(props) {
  return (
    <Context input="tex">
      <Node inline>{props.tex}</Node>
    </Context>
  );
}

const MyEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

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

  const a = new Fraction(1, 5);
  const b = new Fraction(2, 7);
  const answer = a.multiply(b);

  const question = (
    <Formula tex={`${toTex(a)} × ${toTex(b)} = ${toTex(answer)}`} />
  );

  return (
    <div>
      <button onClick={_onBoldClick}>Bold</button>
      {question}
      <KatexScreen />
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
      />
    </div>
  );
};

ReactDOM.render(<MyEditor />, document.getElementById("root"));
