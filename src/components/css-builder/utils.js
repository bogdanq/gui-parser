export const updateStyleSelector = (styles, activeElement) => {
  if (!activeElement) {
    return;
  }

  const st = styles.find(([key]) => key === activeElement) ?? [];

  const nextStyles = `${st[1]}`;

  if (nextStyles && st) {
    activeElement.style.cssText = nextStyles;
  }
};
