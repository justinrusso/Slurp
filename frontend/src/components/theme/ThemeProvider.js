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

  const supportedQueryBreakpoints = new Set(
    Object.keys(theme.breakpoints.values)
  );

  /**
   *
   * @param {"up" | "down"} type
   * @returns {(key: string) => string}
   */
  const generateMediaQuery = (type) => (k) => {
    const key = k.toLowerCase();
    if (!supportedQueryBreakpoints.has(key)) {
      throw new Error("Unsupported media query key");
    }

    switch (type) {
      case "up": {
        return `@media (min-width: ${theme.breakpoints.values[key]}px)`;
      }
      case "down": {
        return `@media (max-width: ${theme.breakpoints.values[key]}px)`;
      }
      default:
        throw new Error("Unsupported query generation type");
    }
  };

  return (
    <StyledThemeProvider
      theme={{
        ...theme,
        breakpoints: {
          ...theme.breakpoints,
          up: generateMediaQuery("up"),
          down: generateMediaQuery("down"),
        },
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
