import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import Modal from "../Modal";
import Paper from "./Paper";

const ModalContentContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 225ms
    ${(props) => props.theme.transitions.easing.easeInOut} 0ms;
`;

const ModalContentBackground = styled(Paper)`
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  flex-direction: column;
  margin: 32px;
  max-height: calc(100% - 64px);
  max-width: 600px;
  overflow-y: auto;
  pointer-events: all;
  position: absolute;
  width: ${(props) => props.fullWidth && "calc(100% - 64px)"};
`;

/**
 *
 * @param {{
 *  children: React.ReactNode;
 *  fullWidth: boolean;
 *  hideBackground: boolean;
 *  onClose: () => void;
 * }} props
 */
const Dialog = ({ children, hideBackground, fullWidth, onClose }) => {
  const contentRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      contentRef.current.style.opacity = 1;
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return createPortal(
    <Modal hideBackground={hideBackground} onClose={onClose}>
      <ModalContentContainer ref={contentRef}>
        <ModalContentBackground fullWidth={fullWidth} elevation={24}>
          {children}
        </ModalContentBackground>
      </ModalContentContainer>
    </Modal>,
    document.body
  );
};

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  fullWidth: PropTypes.bool,
  hideBackground: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Dialog;
