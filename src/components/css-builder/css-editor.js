import { useStore } from "effector-react";
import { useEffect, useCallback } from "react";
import { CSSBuilder } from "react-css-nocode-editor";
import { getStyleListenerFx, $editor, updateStyleStore } from "./model";
import { updateStyleSelector } from "./utils";

export const CssEditor = ({ wrapperRef }) => {
  const { activeElement, styles } = useStore($editor);

  useEffect(() => {
    if (styles) {
      updateStyleSelector(styles, activeElement);
    }
  }, [styles, activeElement]);

  useEffect(() => {
    wrapperRef?.current?.addEventListener("click", getStyleListenerFx);

    const ref = wrapperRef?.current;

    return () => {
      ref?.removeEventListener("click", getStyleListenerFx);
    };
  }, [wrapperRef]);

  const changeStyles = useCallback(
    (styles) => {
      if (activeElement && styles) {
        updateStyleStore({ element: activeElement, styles });
      }
    },
    [activeElement]
  );

  const st = styles?.find(([key]) => key === activeElement)?.[1] ?? null;
  const key = styles?.find(([key]) => key === activeElement)?.[2] ?? "";

  return (
    <>
      {activeElement && st && (
        <CSSBuilder key={key} style={st} onChange={changeStyles} reactive />
      )}
    </>
  );
};
