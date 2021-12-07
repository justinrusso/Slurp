import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const maxXS = css`
  ${(props) => props.theme.breakpoints.up("xs")} {
    max-width: 444px;
  }
`;

const maxSmall = css`
  ${(props) => props.theme.breakpoints.up("sm")} {
    max-width: ${(props) => props.theme.breakpoints.values.sm}px;
  }
`;

const maxMedium = css`
  ${(props) => props.theme.breakpoints.up("md")} {
    max-width: ${(props) => props.theme.breakpoints.values.md}px;
  }
`;

const maxLarge = css`
  ${(props) => props.theme.breakpoints.up("lg")} {
    max-width: ${(props) => props.theme.breakpoints.values.lg}px;
  }
`;

const getMaxWidth = (maxWidth) => {
  switch (maxWidth) {
    case "xs":
      return maxXS;
    case "sm":
      return maxSmall;
    case "md":
      return maxMedium;
    case "lg":
    case "xl":
    default:
      return maxLarge;
  }
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.gen(2)};

  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: 0 ${(props) => props.theme.spacing.gen(3)};
  }

  ${(props) => getMaxWidth(props.maxWidth)}
`;

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};

export default Container;
