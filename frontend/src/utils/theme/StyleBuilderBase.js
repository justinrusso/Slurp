/**
 * An abstract class for style builders
 */
export default class StyleBuilderBase {
  /**
   *
   * @param {{[key: string]: any}} props
   * @param {string} [color]
   */
  constructor(props, color) {
    this.props = props;
    this.css = this.props.css || {};

    if (color) {
      if (color === "inherit") {
        this._generateCommonColorPalette(
          this.props.theme.palette.mode === "light" ? "black" : "white"
        );
      } else {
        this.colorPalette = this.props.theme.palette[color];
      }
    }
  }
  get theme() {
    return this.props.theme;
  }

  get colorPalette() {
    return this._colorPalette || this.props.theme.palette.primary;
  }

  set colorPalette(colorPalette) {
    this._colorPalette = colorPalette || this.colorPalette;
  }

  /**
   * Generates a color palette to use for common colors
   * @param {"white" | "black"} color
   */
  _generateCommonColorPalette(color) {
    if (color === "white") {
      this.colorPalette = {
        main: "#fff",
        dark: "#ccc",
        light: "#fff",
        contrastText: "#000",
      };
    } else if (color === "black") {
      this.colorPalette = {
        main: "#000",
        dark: "#000",
        light: "#2c2c2c",
        contrastText: "#fff",
      };
    }
  }
}
