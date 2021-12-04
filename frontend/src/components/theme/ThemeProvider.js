import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { useTheme } from "../../store/theme";

export const ThemeProvider = ({ children }) => {
  const theme = useTheme();
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
