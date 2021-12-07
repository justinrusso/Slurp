import PropTypes from "prop-types";
import React, { useState } from "react";

import LoginFormModal from "../login/LoginFormModal";
import SignupFormModal from "../signup/SignupFormModal";

const AuthModals = ({ isHomePage }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);

  const switchForms = () => {
    setLoginModalVisible((prev) => !prev);
    setSignupModalVisible((prev) => !prev);
  };

  return (
    <>
      <LoginFormModal
        isHomePage={isHomePage}
        setVisible={setLoginModalVisible}
        switchForms={switchForms}
        visible={loginModalVisible}
      />
      <SignupFormModal
        isHomePage={isHomePage}
        setVisible={setSignupModalVisible}
        switchForms={switchForms}
        visible={signupModalVisible}
      />
    </>
  );
};

AuthModals.propTypes = {
  isHomePage: PropTypes.bool.isRequired,
};

export default AuthModals;
