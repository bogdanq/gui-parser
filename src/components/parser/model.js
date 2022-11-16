import { createEvent, createStore } from "effector";

export const setTargetElement = createEvent();

export const $targetElement = createStore(null).on(
  setTargetElement,
  (_, element) => element
);
