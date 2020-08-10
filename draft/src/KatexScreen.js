import React from "react";
import createKaTeXPlugin from "draft-js-katex-plugin";
import katex from "katex";
// import katex from "./asyncKatex";

const kaTeXPlugin = createKaTeXPlugin({ katex });

const { InsertButton } = kaTeXPlugin;

const KatexScreen = () => {
  return (
    <div>
      <InsertButton />
    </div>
  );
};

export default KatexScreen;
