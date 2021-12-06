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
    this.newProps = {
      css: this.props.css || {},
      cssSelectors: this.props.cssSelectors || {},
    };

    if (color) {
      if (color === "white" || color === "black") {
        this._generateCommonColorPalette(color);
      } else {
        this.colorPalette = this.props.theme.palette[color];
      }
    }
  }

  get theme() {
    return this.props.theme;
  }

  get css() {
    return this.newProps.css;
  }

  get cssSelectors() {
    return this.newProps.cssSelectors;
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
