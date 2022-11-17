import { useStore } from "effector-react";
import { useState } from "react";
import { $targetElement } from "../model";
import { Tag, Text } from "../styled";
import { useOverlay } from "../use-overlay";

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
