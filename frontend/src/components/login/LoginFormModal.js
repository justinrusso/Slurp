import PropTypes from "prop-types";
import React from "react";
import { useTheme } from "styled-components";

import Dialog from "../common/Dialog";
import ModalContent from "../styled/ModalContent";
import NestedThemeProvider from "../theme/NestedThemeProvider";
import { Button } from "../styled/Button";
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
  const theme = useTheme();
  return (
    <>
      <Button
        variant={isHomePage ? "text" : "outlined"}
        color="inherit"
        onClick={() => setVisible(true)}
      >
        Log In
      </Button>
      {visible && (
        <NestedThemeProvider
          inverted={theme.palette.mode !== theme.palette.rootMode}
        >
          <Dialog onClose={() => setVisible(false)}>
            <ModalContent>
              <LoginForm setVisible={setVisible} switchForms={switchForms} />
            </ModalContent>
          </Dialog>
        </NestedThemeProvider>
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
