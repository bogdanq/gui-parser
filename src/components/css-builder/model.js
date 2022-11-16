import { createEffect, createEvent, createStore, sample } from "effector";
import { nanoid } from "nanoid";
// допустимые стили для елементов
const STYLES = ["background-color", "color", "padding-bottom", "margin-top"];

export const updateStyleStore = createEvent();

export const getStyleListenerFx = createEffect((e) => {
  const target = e.target;
  let styles = "";

  const cs = window.getComputedStyle(target, null);

  STYLES.forEach((style) => {
    styles = styles + `${String(style)}: ${cs[style]};`;
  });

  return { element: target, styles };
});

export const $editor = createStore({
  styles: [],
  activeElement: null,
}).on(updateStyleStore, (state, { element, styles }) => {
  if (state.styles.some(([target]) => target === element)) {
    return {
      ...state,
      activeElement: element,
      styles: state.styles.map(([target, style, key]) => {
        if (target === element) {
          return [target, styles, key];
        }

        return [target, style, key];
      }),
    };
  }

  return {
    ...state,
    activeElement: element,
    styles: [...state.styles, [element, styles, nanoid()]],
  };
});

sample({
  clock: getStyleListenerFx.doneData,
  filter: (result) => !!result,
  fn: (element) => {
    return element;
  },
  target: updateStyleStore,
});
