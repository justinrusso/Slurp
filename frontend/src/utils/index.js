export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

/**
 * Gets the offset of the provided element relative to the current viewport's
 * scroll position
 * @param {Element} el
 * @returns {{left: number; top: number;}}
 */
export function getViewOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
  };
}
