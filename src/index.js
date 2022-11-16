import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { nodeParser, NodeTree, CssEditor } from "./components";
import { Body } from "./components/parser/test-body";

const App = () => {
  const ref = useRef(null);
  const [tree, setTree] = useState(null);

  useEffect(() => {
    setTree(nodeParser([ref.current]));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div>{tree && <NodeTree tree={tree} />}</div>

      <div style={{ width: "50%" }}>
        <Body r={ref} />
        <CssEditor wrapperRef={ref} />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
