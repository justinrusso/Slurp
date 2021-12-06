import StyleBuilderBase from "./StyleBuilderBase";
import { addOpacityToHex } from ".";

export default class StyleBuilderButton extends StyleBuilderBase {
  /**
   *
   * @param {{[key: string]: any}} props
   * @param {string} [color]
   * @param {string} [variant=contained]
   * @param {boolean} [rounded=true]
   */
  constructor(props, color, variant = "contained", rounded = true) {
    super(props, color);
    this.variant = variant;
    this.rounded = rounded;
  }

  setFontColor() {
    if (this.variant === "contained") {
      this.css.color = this.colorPalette.contrastText;
    } else {
      this.css.color = this.colorPalette.main;
    }
    return this;
  }

  setBorder() {
    this.css.border =
      this.variant === "outlined"
        ? `1px solid ${addOpacityToHex(this.colorPalette.main, 0.5)}`
        : "none";

    if (this.rounded) {
      this.css.borderRadius = `${this.theme.borderRadius}px`;
    }

    return this;
  }

  setBackground() {
    this.css.backgroundColor =
      this.variant === "contained" ? this.colorPalette.main : "transparent";
    return this;
  }

  setPadding() {
    if (this.variant === "outlined") {
      const rawSpacing = this.theme.spacing.raw(0.75, 2);
      this.css.padding = rawSpacing.map((space) => `${space - 1}px`).join(" ");
    } else {
      this.css.padding = this.theme.spacing.gen(0.75, 2);
    }
    return this;
  }

  setHover() {
    const hoverProps = {};

    if (this.variant === "outlined") {
      hoverProps.backgroundColor = addOpacityToHex(
        this.colorPalette.main,
        this.theme.palette.action.hoverOpacity
      );
      hoverProps.borderColor = this.colorPalette.main;
    } else if (this.variant === "text") {
      hoverProps.backgroundColor = addOpacityToHex(
        this.colorPalette.main,
        this.theme.palette.action.hoverOpacity
      );
    } else if (this.variant === "contained") {
      hoverProps.backgroundColor = this.colorPalette.dark;
    }

    this.cssSelectors["&:hover"] = hoverProps;
    return this;
  }
}
