import React, { useState } from "react";

import Modal from "../Modal";
import { Button } from "../styled/Button";
import SignupForm from "./SignupForm";

const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Sign Up</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;
