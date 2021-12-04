import React, { useState } from "react";

import Modal from "../Modal";
import { Button } from "../styled/Button";
import { LoginForm } from "./LoginForm";

export const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Log In</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};
