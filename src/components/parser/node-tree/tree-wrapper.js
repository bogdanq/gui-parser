import { useEffect } from "react";
import { setTargetElement } from "../model";

export const NodeWrapper = ({ componentRef, children }) => {
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

    componentRef.current?.addEventListener("mousemove", moveHandler);

    const ref = componentRef.current;

    return () => {
      ref?.removeEventListener("mousemove", moveHandler);
    };
  }, [componentRef]);

  return children;
};
