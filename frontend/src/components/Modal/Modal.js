import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalRoot = styled.div`
  inset: 0px;
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.modal};
`;

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 225ms
    ${(props) => props.theme.transitions.easing.easeInOut} 0ms;
`;

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

const ModalContentBackground = styled.div`
  background-color: ${(props) => props.theme.palette.background};
  border-radius: ${(props) => props.theme.borderRadius}px;
  color: ${(props) => props.theme.palette.text.primary};
  display: flex;
  flex-direction: column;
  margin: 32px;
  max-height: calc(100% - 64px);
  max-width: 600px;
  overflow-y: auto;
  pointer-events: all;
  position: absolute;
`;

/**
 *
 * @param {{children: React.ReactNode, onClose: () => void}} props
 */
const Modal = ({ children, onClose }) => {
  const backgroundRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      backgroundRef.current.style.opacity = 1;
      contentRef.current.style.opacity = 1;
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return createPortal(
    <ModalRoot>
      <ModalBackground onClick={onClose} ref={backgroundRef} />
      <ModalContentContainer ref={contentRef}>
        <ModalContentBackground>{children}</ModalContentBackground>
      </ModalContentContainer>
    </ModalRoot>,
    document.body
  );
};

export default Modal;
