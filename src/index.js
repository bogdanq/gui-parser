import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import { CssEditor, Body, DOMTree } from "./components";

const App = () => {
  const componentRef = useRef(null);

  return (
    <div style={{ display: "flex" }}>
      <DOMTree componentRef={componentRef} />

      <div style={{ width: "50%" }}>
        <div style={{ borderBottom: "2px solid #cdcdf1", paddingBottom: 10 }}>
          <Body r={componentRef} />
        </div>

        <div
          style={{
            width: "50%",
            marginTop: "20px",
          }}
        >
          <CssEditor componentRef={componentRef} />
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
