import { useSelector } from "react-redux";

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
        contrastText: "#fff",
      },
      secondary: {
        main: "#003049",
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
      },
    },
    borderRadius: 4,
    spacing: (factor) => `${8 * factor}px`,
  };
};

export const useTheme = () => useSelector((state) => state.theme);

export const themeReducer = (state = initialState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};
