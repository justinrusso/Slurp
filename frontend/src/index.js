import "@fontsource/open-sans/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App";
import configureStore from "./store";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import AuthModalProvider from "./context/AuthModalsProvider";

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
        <BrowserRouter>
          <AuthModalProvider>
            <App />
          </AuthModalProvider>
        </BrowserRouter>
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
