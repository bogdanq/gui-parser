import { NodeTree, NodeWrapper } from "./node-tree";

export const DOMTree = ({ componentRef, tree }) => {
  return tree ? (
    <NodeWrapper componentRef={componentRef}>
      <NodeTree tree={tree} />
    </NodeWrapper>
  ) : null;
};
