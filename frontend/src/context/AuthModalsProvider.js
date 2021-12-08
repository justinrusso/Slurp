const { createContext, useState, useContext } = require("react");

const AuthModalContext = createContext();

export const useAuthModal = () => useContext(AuthModalContext);

const AuthModalProvider = ({ children }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);

  const switchForms = () => {
    setLoginModalVisible((prev) => !prev);
    setSignupModalVisible((prev) => !prev);
  };
  return (
    <AuthModalContext.Provider
      value={{
        loginModalVisible,
        setLoginModalVisible,
        signupModalVisible,
        setSignupModalVisible,
        switchForms,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalProvider;
