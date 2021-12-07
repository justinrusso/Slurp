import PropTypes from "prop-types";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.palette.background};
  border-radius: ${(props) => props.rounded && `${props.theme.borderRadius}px`};
  border: 1px solid ${(props) => props.theme.palette.divider};
  padding: ${(props) => props.theme.spacing.gen(2)};
`;

Card.defaultProps = {
  rounded: true,
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rounded: PropTypes.bool,
};

export default Card;
