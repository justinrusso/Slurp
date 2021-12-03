import { createContext, useContext, useEffect, useRef, useState } from "react";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState();
  const modalRef = useRef();

  useEffect(() => {
    setCurrentModal(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={currentModal}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};
