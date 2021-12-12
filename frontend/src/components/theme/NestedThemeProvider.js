import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { generateThemeColors } from "./ThemeProvider";

const invertTheme = (theme) => {
  const newTheme = {
    ...theme,
    palette: {
      ...theme.palette,
      mode: theme.palette.mode === "light" ? "dark" : "light",
    },
  };
  generateThemeColors(newTheme);
  return newTheme;
};

const NestedThemeProvider = ({ children, inverted }) => {
  return (
    <StyledThemeProvider
      theme={(theme) => (inverted ? invertTheme(theme) : theme)}
    >
      {children}
    </StyledThemeProvider>
  );
};

export default NestedThemeProvider;
