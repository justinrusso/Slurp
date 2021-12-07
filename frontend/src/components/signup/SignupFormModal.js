import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import StyleBuilderButton from "../../utils/theme/StyleBuilderButton";

import Modal from "../Modal";
import { Button } from "../styled/Button";
import ModalContent from "../styled/ModalContent";
import SignupForm from "./SignupForm";

const SignupButton = styled(Button).attrs((props) => {
  const builder = new StyleBuilderButton(
    props,
    props.color,
    props.variant,
    props.rounded
  );

  if (builder.variant === "outlined") {
    const rawSpacing = props.theme.spacing.raw(0.75, 2);
    builder.css.padding = rawSpacing.map((space) => `${space - 2}px`).join(" ");

    builder.css["&:hover"] = {
      ...builder.css["&:hover"],
      backgroundColor: builder.colorPalette.main,
      color: builder.theme.palette.text.primary,
    };
  }
  return builder.css;
})`
  border-width: 2px;
`;

/**
 *
 * @typedef {Object} SignupFormModalProps
 * @property {boolean} isHomePage
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setVisible
 * @property {() => void} switchForms
 * @property {boolean} visible
 */

/**
 *
 * @param {SignupFormModalProps} props
 */
const SignupFormModal = ({ isHomePage, setVisible, switchForms, visible }) => {
  return (
    <>
      <SignupButton
        variant={isHomePage ? "outlined" : "contained"}
        color={isHomePage ? "white" : "primary"}
        onClick={() => setVisible(true)}
      >
        Sign Up
      </SignupButton>
      {visible && (
        <Modal onClose={() => setVisible(false)}>
          <ModalContent>
            <SignupForm switchForms={switchForms} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

SignupFormModal.propTypes = {
  isHomePage: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  switchForms: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default SignupFormModal;
