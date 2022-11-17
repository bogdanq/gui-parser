import { useEffect, useState } from "react";
import { NodeTree, NodeWrapper } from "./node-tree";
import { nodeParser } from "./utils";

export const DOMTree = ({ componentRef }) => {
  const [tree, setTree] = useState(null);

  useEffect(() => {
    if (componentRef.current) {
      setTree(nodeParser([componentRef.current]));
    }
  }, [componentRef]);

  return tree ? (
    <NodeWrapper componentRef={componentRef}>
      <NodeTree tree={tree} />
    </NodeWrapper>
  ) : null;
};
