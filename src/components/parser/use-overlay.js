import { useMemo } from "react";
import { getElementBounging } from "./utils";

export const useOverlay = (targetElement) => {
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
