import PropTypes from "prop-types";
import React from "react";

import Modal from "../Modal";
import { Button } from "../styled/Button";
import ModalContent from "../styled/ModalContent";
import { LoginForm } from "./LoginForm";

/**
 *
 * @typedef {Object} LoginFormModalProps
 * @property {boolean} isHomePage
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setVisible
 * @property {() => void} switchForms
 * @property {boolean} visible
 */

/**
 *
 * @param {LoginFormModalProps} props
 */
const LoginFormModal = ({ isHomePage, setVisible, switchForms, visible }) => {
  return (
    <>
      <Button
        variant={isHomePage ? "text" : "outlined"}
        color={isHomePage ? "white" : "black"}
        onClick={() => setVisible(true)}
      >
        Log In
      </Button>
      {visible && (
        <Modal onClose={() => setVisible(false)}>
          <ModalContent>
            <LoginForm switchForms={switchForms} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

LoginFormModal.propTypes = {
  isHomePage: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  switchForms: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default LoginFormModal;
