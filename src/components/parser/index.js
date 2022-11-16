import { useStore } from "effector-react";
import React, { useMemo, useState, useEffect } from "react";
import { $targetElement, setTargetElement } from "./model";
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

function getRect(target) {
  if (target.nodeName === "#text" || target.nodeName === "#comment") {
    const range = target.ownerDocument.createRange();
    range.selectNode(target);

    const rect = range.getBoundingClientRect();

    return rect;
  }

  const rect = target.getBoundingClientRect();

  return rect;
}

export function getElementBounging(target) {
  const rect = getRect(target);

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top + target.scrollTop,
    left: rect.left + target.scrollLeft,
  };
}

export const NodeWrapper = ({ wrapperRef, children }) => {
  useEffect(() => {
    let lastElement = null;

    const moveHandler = (event) => {
      const { target } = event;

      if (target && lastElement !== target && target.localName !== "html") {
        const prevLeave = target.onmouseleave;

        target.onmouseleave = () => {
          lastElement = null;
          setTargetElement(null);
          target.onmouseleave = prevLeave;
        };

        lastElement = target;
        setTargetElement(target);
      }
    };

    wrapperRef.current?.addEventListener("mousemove", moveHandler);

    const ref = wrapperRef.current;

    return () => {
      ref?.removeEventListener("mousemove", moveHandler);
    };
  }, [wrapperRef]);

  return children;
};

const Card = ({
  tree,
  incrementCount = 1,
  targetElement,
  onHover,
  onLeave,
  onClick,
}) => {
  const targetComponentElement = useStore($targetElement);

  return (
    <>
      {tree?.map((node) => {
        const isActive =
          (targetElement || targetComponentElement) === node.node;

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
    if (!targetElement) {
      return null;
    }

    const rect = getElementBounging(targetElement);

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
  const targetComponentElement = useStore($targetElement);

  const codeOverlay = useOverlay(targetElement);
  const targetTreeOverlay = useOverlay(targetComponentElement);

  return (
    <>
      <Card
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
      {codeOverlay}
      {targetTreeOverlay}
    </>
  );
};
