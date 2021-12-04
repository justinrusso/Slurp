import "normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App";
import configureStore from "./store";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { ModalProvider } from "./context/modal";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
