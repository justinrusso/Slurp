/**
 *
 * @param {string} str
 * @returns
 */
export const stringToKebabCase = (str) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (match, p1) => `${p1 > 0 ? "-" : ""}${match.toLowerCase()}`
  );
