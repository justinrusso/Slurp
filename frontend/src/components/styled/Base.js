import styled from "styled-components";
import { camelToKebabCase } from "../../utils";

/**
 *
 * @param {{[key: string]: any}} prop
 * @returns {string}
 */
const cssPropToCss = (prop) => {
  return Object.entries(prop)
    .map(([cssKey, cssVal]) => `${camelToKebabCase(cssKey)}: ${cssVal};`)
    .join("");
};

/**
 *
 * @param {{[key: string]: any}} prop
 * @returns {string}
 */
const selectorsPropToCss = (prop) => {
  return Object.entries(prop)
    .map(
      ([selector, selectorProps]) =>
        `${selector} {${cssPropToCss(selectorProps)}}`
    )
    .join("");
};

const acceptedProps = new Map([
  ["css", cssPropToCss],
  ["cssSelectors", selectorsPropToCss],
]);

/**
 *
 * @param {[propKey, propValue]} propPair
 * @returns {string}
 */
const propsToCss = ([propKey, prop]) => {
  return acceptedProps.get(propKey)(prop);
};

const filterAcceptedProps = ([propKey]) => acceptedProps.has(propKey);

const Base = styled.div`
  ${(props) =>
    Object.entries(props).filter(filterAcceptedProps).map(propsToCss)}
`;

export default Base;
