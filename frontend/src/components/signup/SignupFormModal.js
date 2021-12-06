import PropTypes from "prop-types";
import React, { useState } from "react";
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

    builder.cssSelectors["&:hover"] = {
      ...builder.cssSelectors["&:hover"],
      backgroundColor: builder.colorPalette.main,
      color: builder.theme.palette.text.primary,
    };
  }
  return builder.newProps;
})`
  border-width: 2px;
`;

/**
 *
 * @param {{isHomePage: boolean}} props
 * @returns
 */
const SignupFormModal = ({ isHomePage }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SignupButton
        variant={isHomePage ? "outlined" : "contained"}
        color={isHomePage ? "white" : "primary"}
        onClick={() => setShowModal(true)}
      >
        Sign Up
      </SignupButton>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ModalContent>
            <SignupForm />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

SignupFormModal.propTypes = {
  isHomePage: PropTypes.bool.isRequired,
};

export default SignupFormModal;
