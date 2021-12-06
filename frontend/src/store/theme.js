const initialState = () => {
  const mode = "light"; // "light" | "dark"

  return {
    palette: {
      mode,
      common: {
        black: "#000",
        white: "#fff",
      },
      primary: {
        main: "#D62828",
        light: "#ff6152", // TODO: This should have a black text when used
        dark: "#9c0000",
        contrastText: "#fff",
      },
      secondary: {
        main: "#003049",
        light: "#355975",
        dark: "#000722",
        contrastText: "#fff",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)",
      },
      divider: "rgba(0, 0, 0, 0.12)",
      background: "#fff",
      action: {
        active: "rgba(0, 0, 0, 0.54)",
        hover: "rgba(0, 0, 0, 0.04)",
        hoverOpacity: 0.04,
      },
    },
    borderRadius: 4,
    spacing: {
      base: 8,
    },
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
    zIndex: {
      modal: 1300,
    },
  };
};

export const themeReducer = (state = initialState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};
