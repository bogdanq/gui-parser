import { createEffect, createEvent, createStore, sample } from "effector";

// допустимые стили для елементов
const STYLES = [
  "width",
  "height",
  "background-color",
  "color",
  "padding-bottom",
  "margin-top"
];

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
  activeElement: null
}).on(updateStyleStore, (state, { element, styles }) => {
  if (state.styles.some(([key]) => key === element)) {
    return {
      ...state,
      activeElement: element,
      styles: state.styles.map(([key, style]) => {
        if (key === element) {
          return [key, styles];
        }

        return [key, style];
      })
    };
  }

  return {
    ...state,
    activeElement: element,
    styles: [...state.styles, [element, styles]]
  };
});

sample({
  clock: getStyleListenerFx.doneData,
  filter: (result) => !!result,
  fn: (element) => {
    return element;
  },
  target: updateStyleStore
});
