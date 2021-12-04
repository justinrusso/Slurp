import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useModal } from "../../context/modal";

const ModalRoot = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const ModalContent = styled.div`
  background-color: white;
  position: absolute;
`;

/**
 *
 * @param {{children: React.ReactNode, onClose: () => void}} props
 */
const Modal = ({ children, onClose }) => {
  const modalNode = useModal();

  if (!modalNode) return null;

  return createPortal(
    <ModalRoot>
      <ModalBackground onClick={onClose} />
      <ModalContent>{children}</ModalContent>
    </ModalRoot>,
    modalNode
  );
};

export default Modal;
