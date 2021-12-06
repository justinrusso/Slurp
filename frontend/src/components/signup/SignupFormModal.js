import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../Modal";
import { Button } from "../styled/Button";
import SignupForm from "./SignupForm";

const SignupButton = styled(Button).attrs((props) => {
  const newProps = {};

  const variant = props.variant || "contained";

  if (variant === "outlined") {
    const rawSpacing = props.theme.spacing.raw(0.75, 2);
    newProps.padding = rawSpacing.map((space) => `${space - 2}px`).join(" ");
  }
  return newProps;
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
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

SignupFormModal.propTypes = {
  isHomePage: PropTypes.bool.isRequired,
};

export default SignupFormModal;
