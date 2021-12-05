import styled from "styled-components";

import { stringToKebabCase } from "../../utils";

const ignoredProps = ["as", "theme"];

const parseProps = (props) => {
  const newProps = {};
  Object.keys(props).forEach((propKey) => {
    if (ignoredProps.includes(propKey)) {
      return;
    }
    newProps[stringToKebabCase(propKey)] = props[propKey];
    delete props[propKey];
  });
  return newProps;
};

const Box = styled.div.attrs(parseProps)`
  ${(props) =>
    Object.entries(props).map(
      (propPair) =>
        !ignoredProps.includes(propPair[0]) && `${propPair[0]}: ${propPair[1]};`
    )}
`;

export default Box;
