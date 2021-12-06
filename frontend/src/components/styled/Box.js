import styled from "styled-components";

import Base from "./Base";

const ignoredProps = new Set(["as", "children", "theme"]);

const parseProps = (props) => {
  const cssProps = {};
  Object.keys(props).forEach((propKey) => {
    if (ignoredProps.has(propKey)) {
      return;
    }
    cssProps[propKey] = props[propKey];
    delete props[propKey];
  });
  return { css: cssProps };
};

const Box = styled(Base).attrs(parseProps)``;

export default Box;
