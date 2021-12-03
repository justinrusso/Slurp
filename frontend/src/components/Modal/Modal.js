import React from "react";
import { createPortal } from "react-dom";
import { useModal } from "../../context/modal";

/**
 *
 * @param {{children: React.ReactNode, onClose: () => void}} props
 */
const Modal = ({ children, onClose }) => {
  const modalNode = useModal();

  if (!modalNode) return null;

  return createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
};

export default Modal;
