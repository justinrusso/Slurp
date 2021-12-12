import invertColor from "invert-color";
import { useState } from "react";
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { addOpacityToHex } from "../../utils/theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.palette.background};
    color: ${(props) => props.theme.palette.text.primary};
    margin: 0;
    padding: 0;

    ${(props) => props.theme.typography.body1}
  }
`;

export const generateThemeColors = (theme) => {
  const mode = theme.palette.mode;
  const backgroundColor = mode === "light" ? "#fff" : "#121212";
  const backgroundContrastColor = invertColor(backgroundColor, true);
  const newPalette = { ...theme.palette };

  newPalette.background = backgroundColor;

  newPalette.text = {
    base: backgroundContrastColor,
    primary: addOpacityToHex(
      backgroundContrastColor,
      mode === "light" ? 0.87 : 1
    ),
    secondary: addOpacityToHex(
      backgroundContrastColor,
      mode === "light" ? 0.6 : 0.7
    ),
    disabled: addOpacityToHex(
      backgroundContrastColor,
      mode === "light" ? 0.38 : 0.5
    ),
  };

  newPalette.divider = addOpacityToHex(backgroundContrastColor, 0.12);

  const hoverOpacity = mode === "light" ? 0.04 : 0.08;
  newPalette.action = {
    active: addOpacityToHex(
      backgroundContrastColor,
      mode === "light" ? 0.54 : 1
    ),
    hover: addOpacityToHex(backgroundContrastColor, hoverOpacity),
    hoverOpacity,
  };

  theme.palette = newPalette;
};

const getInitialTheme = (mode = "light") => {
  const baseTheme = {
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
      text: {},
      action: {},
    },
    borderRadius: 4,

    // MUI elevation shadows
    shadows: [
      "none",
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
      "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
      "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
      "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
      "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
      "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
      "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
      "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
      "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
      "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
      "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
      "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
      "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
      "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
      "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
      "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
      "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
      "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
      "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
      "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
      "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
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

  generateThemeColors(baseTheme);
  return baseTheme;
};

export const ThemeProvider = ({ children, mode }) => {
  const [theme, setTheme] = useState(getInitialTheme(mode));

  const changeMode = (mode) => {
    const newTheme = { ...theme, palette: { ...theme.palette, mode } };
    generateThemeColors(newTheme);
    setTheme(newTheme);
  };

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
        changeMode,
      }}
    >
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
