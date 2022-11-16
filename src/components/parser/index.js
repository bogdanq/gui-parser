import React, { useMemo, useState } from "react";
import { Tag, Text } from "./styled";

export function nodeParser(elements) {
  const queue = [...elements];
  const result = [];
  const map = new WeakMap();
  let id = 0;

  while (queue.length > 0) {
    const node = queue.shift();
    const nodes = node.childNodes;

    const parentNode = node.parentElement ? map.get(node.parentElement) : null;

    const attrs = node.attributes
      ? [...node.attributes].map((it) => ({
          name: it.name,
          value: it.value,
        }))
      : [];

    const nodeInfo = {
      name: node.localName || node.nodeName,
      children: [],
      value: node.textContent?.replace(/  +|\n/gi, " ")?.trim() ?? "",
      node,
      attrs,
      id,
    };

    const isEmpty =
      (nodeInfo.name === "#text" || nodeInfo.name === "#comment") &&
      nodeInfo.value === "";

    if (parentNode && !isEmpty) {
      parentNode.children.push(nodeInfo);
    }

    if (!parentNode) {
      result.push(nodeInfo);
    }

    map.set(node, nodeInfo);
    queue.unshift(...[...nodes]);

    id += 1;
  }

  return result[0];
}

const Card = ({
  tree,
  incrementCount = 1,
  isParent,
  targetElement,
  onHover,
  onLeave,
  onClick,
  ...rs
}) => {
  return (
    <>
      {tree?.map((node) => {
        const isActive = targetElement === node.node;

        if (node.name === "style") {
          return null;
        }

        if (node.name === "#text") {
          return (
            <Text
              onLeave={onLeave}
              onHover={() => onHover(node)}
              text={node.value}
              lvl={incrementCount}
              key={node.id}
            />
          );
        }

        return (
          <div key={node.id}>
            <Tag
              name={node.name}
              isOpened
              lvl={incrementCount}
              attributes={node.attrs}
              isActive={isActive}
              onClick={() => onClick(node)}
              onMouseLeave={onLeave}
              onMouseEnter={() => onHover(node)}
            />
            {node.children ? (
              <>
                <Card
                  onClick={onClick}
                  onHover={onHover}
                  onLeave={onLeave}
                  targetElement={targetElement}
                  tree={node.children}
                  {...node}
                  incrementCount={incrementCount + 1}
                />
              </>
            ) : null}
            <Tag
              name={node.name}
              isOpened={false}
              lvl={incrementCount}
              isActive={isActive}
              onClick={() => onClick(node)}
              onMouseLeave={onLeave}
              onMouseEnter={() => onHover(node)}
            />
          </div>
        );
      })}
    </>
  );
};

const useOverlay = (targetElement) => {
  return useMemo(() => {
    let rect = null;

    if (!targetElement) {
      return null;
    }

    if (
      targetElement.nodeName === "#text" ||
      targetElement.nodeName === "#comment"
    ) {
      const range = targetElement.ownerDocument.createRange();
      range.selectNode(targetElement);

      rect = range.getBoundingClientRect();

      range.detach();
    } else {
      rect = targetElement.getBoundingClientRect();
    }

    const block = {
      backgroundColor: "rgb(202 0 0 / 40%)",
      position: "fixed",
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      zIndex: 999999999,
      pointerEvents: "none",
    };

    const styles = {
      ...block,
      width: rect.width,
      height: rect.height,
      top: rect.top + (targetElement.scrollTop || 0),
      left: rect.left + (targetElement.scrollLeft || 0),
    };

    return <div style={styles} />;
  }, [targetElement]);
};

export const NodeTree = ({ tree }) => {
  const [targetElement, setTargetElement] = useState(null);
  const ov = useOverlay(targetElement);

  return (
    <>
      <Card
        isParent
        onHover={(node) => {
          setTargetElement(node.node);
        }}
        onLeave={(node) => {
          setTargetElement(null);
        }}
        onClick={(node) => {
          node.node.click();
        }}
        targetElement={targetElement}
        tree={[tree]}
        {...tree}
      />
      {ov}
    </>
  );
};
