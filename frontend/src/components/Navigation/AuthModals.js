import PropTypes from "prop-types";
import { useAuthModal } from "../../context/AuthModalsProvider";

import LoginFormModal from "../login/LoginFormModal";
import SignupFormModal from "../signup/SignupFormModal";

const AuthModals = ({ isHomePage }) => {
  const {
    loginModalVisible,
    setLoginModalVisible,
    signupModalVisible,
    setSignupModalVisible,
    switchForms,
  } = useAuthModal();

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
