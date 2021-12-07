import PropTypes from "prop-types";
import styled from "styled-components";

const Typography = styled.p`
  ${(props) => props.theme.typography[props.variant]}
`;

Typography.defaultProps = {
  variant: "body1",
};

Typography.propTypes = {
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "body1", "button"]),
};

export default Typography;
