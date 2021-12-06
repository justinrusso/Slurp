/**
 *
 * @param {string} str
 * @returns {string}
 */
export const camelToKebabCase = (str) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (match, p1) => `${p1 > 0 ? "-" : ""}${match.toLowerCase()}`
  );
