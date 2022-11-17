import { useStore } from "effector-react";
import { useEffect, useCallback } from "react";
import { CSSBuilder } from "react-css-nocode-editor";
import { getStyleListenerFx, $editor, updateStyleStore } from "./model";
import { updateStyleSelector } from "./utils";

export const CssEditor = ({ componentRef }) => {
  const { activeElement, styles } = useStore($editor);

  useEffect(() => {
    if (styles) {
      updateStyleSelector(styles, activeElement);
    }
  }, [styles, activeElement]);

  useEffect(() => {
    componentRef?.current?.addEventListener("click", getStyleListenerFx);

    const ref = componentRef?.current;

    return () => {
      ref?.removeEventListener("click", getStyleListenerFx);
    };
  }, [componentRef]);

  const changeStyles = useCallback(
    (styles) => {
      if (activeElement && styles) {
        updateStyleStore({ element: activeElement, styles });
      }
    },
    [activeElement]
  );

  const [_, style, key] = styles?.find(([key]) => key === activeElement) || [];

  return (
    <>
      {activeElement && style && (
        <CSSBuilder key={key} style={style} onChange={changeStyles} reactive />
      )}
    </>
  );
};
