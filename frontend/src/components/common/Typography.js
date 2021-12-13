import PropTypes from "prop-types";
import styled from "styled-components";

const Typography = styled.p`
  ${(props) => props.theme.typography[props.variant]}
  color: ${(props) =>
    props.color
      ? props.theme.palette.mode === "light"
        ? props.theme.palette[props.color]?.main
        : props.theme.palette[props.color]?.light
      : props.theme.palette.text.primary};
  margin: 0;

  margin-bottom: ${(props) => props.gutterBottom && "0.35em"};
`;

Typography.defaultProps = {
  gutterBottom: false,
  variant: "body1",
};

Typography.propTypes = {
  gutterBottom: PropTypes.bool,
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "body1", "button"]),
};

export default Typography;
