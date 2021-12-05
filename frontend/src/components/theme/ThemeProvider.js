import { useSelector } from "react-redux";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme);

  /**
   *
   * @param {number} factor1
   * @param {number | undefined} factor2
   * @param {number | undefined} factor3
   * @param {number | undefined} factor4
   */
  const generateRawSpacing = (factor1, factor2, factor3, factor4) => {
    const factors = [factor1, factor2, factor3, factor4];
    return factors
      .filter((factor) => factor !== undefined && factor !== null)
      .map((factor) => theme.spacing.base * factor);
  };

  /**
   *
   * @param {number} factor1
   * @param {number | undefined} factor2
   * @param {number | undefined} factor3
   * @param {number | undefined} factor4
   */
  const generateSpacing = (factor1, factor2, factor3, factor4) => {
    return generateRawSpacing(factor1, factor2, factor3, factor4)
      .map((space) => `${space}px`)
      .join(" ");
  };

  return (
    <StyledThemeProvider
      theme={{
        ...theme,
        spacing: {
          ...theme.spacing,
          gen: generateSpacing,
          raw: generateRawSpacing,
        },
      }}
    >
      {children}
    </StyledThemeProvider>
  );
};
