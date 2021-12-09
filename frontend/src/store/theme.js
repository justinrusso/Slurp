const initialState = () => {
  const mode = "light"; // "light" | "dark"

  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
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
      error: {
        main: "#d32f2f",
        light: "#ef5350",
        dark: "#c62828",
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
    shadows: [
      "none",
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    ],
    spacing: {
      base: 8,
    },
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      },
    },
    typography: {
      h1: {
        fontFamily: "'Poppins',Helvetica,Arial,sans-serif",
        fontSize: "3rem",
        fontWeight: 700,
        letterSpacing: "-0.01562em",
        lineHeight: 1.167,
      },
      h2: {
        fontFamily: "'Poppins',Helvetica,Arial,sans-serif",
        fontSize: "2.25rem",
        fontWeight: 700,
        letterSpacing: "-0.00833em",
        lineHeight: 1.2,
      },
      h3: {
        fontFamily: "'Poppins',Helvetica,Arial,sans-serif",
        fontSize: "1.75rem",
        fontWeight: 700,
        letterSpacing: "-0.025em",
        lineHeight: 1.3,
      },
      h4: {
        fontFamily: "'Poppins',Helvetica,Arial,sans-serif",
        fontSize: "1.25rem",
        fontWeight: 700,
        letterSpacing: "-0.025em",
        lineHeight: 1.4,
      },
      body1: {
        fontFamily: "'Open Sans',Helvetica,Arial,sans-serif",
        fontSize: "1rem",
        fontWeight: 400,
        letterSpacing: "0em",
        lineHeight: 1.5,
      },
      button: {
        fontFamily: "'Poppins',Helvetica,Arial,sans-serif",
        fontSize: "1rem",
        fontWeight: 500,
        letterSpacing: "-0.0125em",
        lineHeight: 1.5,
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
