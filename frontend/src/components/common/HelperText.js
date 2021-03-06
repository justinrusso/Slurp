import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const HelperTextWrapper = styled.p`
  color: ${(props) =>
    props.error
      ? props.theme.palette.error.main
      : props.theme.palette.text.secondary};
  font-size: 0.75rem;
  letter-spacing: 0.03333em;
  line-height: 1.66;
  margin: ${(props) => props.theme.spacing.gen(0.375, 1.75, 0)};
`;

const HelperTextIcon = styled(FontAwesomeIcon)`
  margin-right: ${(props) => props.theme.spacing.gen(1)};
  margin-left: -10px;
`;

/**
 * HelperText props type definition
 * @typedef {Object} HelperTextProps
 * @property {React.ReactNode | React.ReactNode[]} children
 * @property {string} className
 * @property {boolean} [error] Indicates if there is an error for this input field
 * @property {boolean} [showIcon]
 */

/**
 *
 * @param {HelperTextProps} props
 * @returns
 */
const HelperText = ({ children, className, error, showIcon }) => {
  return (
    <HelperTextWrapper className={className} error={error}>
      {showIcon && <HelperTextIcon icon={faExclamationCircle} />}
      {children}
    </HelperTextWrapper>
  );
};

HelperText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  error: PropTypes.bool,
  showIcon: PropTypes.bool,
};

export default HelperText;
