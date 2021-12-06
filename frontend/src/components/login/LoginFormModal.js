import PropTypes from "prop-types";
import React, { useState } from "react";

import Modal from "../Modal";
import { Button } from "../styled/Button";
import { LoginForm } from "./LoginForm";

/**
 *
 * @param {{isHomePage: boolean}} props
 * @returns
 */
const LoginFormModal = ({ isHomePage }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant={isHomePage ? "text" : "outlined"}
        color={isHomePage ? "white" : "black"}
        onClick={() => setShowModal(true)}
      >
        Log In
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

LoginFormModal.propTypes = {
  isHomePage: PropTypes.bool.isRequired,
};

export default LoginFormModal;
