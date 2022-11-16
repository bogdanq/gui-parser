import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { nodeParser, NodeTree, CssEditor, NodeWrapper } from "./components";
import { Body } from "./components/parser/test-body";

const App = () => {
  const ref = useRef(null);
  const wrapperRef = useRef(null);
  const [tree, setTree] = useState(null);

  useEffect(() => {
    if (ref.current) {
      setTree(nodeParser([ref.current]));
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {tree && (
        <NodeWrapper wrapperRef={wrapperRef}>
          <NodeTree tree={tree} />
        </NodeWrapper>
      )}

      <div style={{ width: "50%" }}>
        <div
          ref={wrapperRef}
          style={{ borderBottom: "2px solid #cdcdf1", paddingBottom: 10 }}
        >
          <Body r={ref} />
        </div>

        <div
          style={{
            width: "50%",
            marginTop: "20px",
          }}
        >
          <CssEditor wrapperRef={wrapperRef} />
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
