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
      this.css.color =
        this.props.theme.palette.mode === "light"
          ? this.colorPalette.main
          : this.colorPalette.light;
    }
    return this;
  }

  setBorder() {
    this.css.border =
      this.variant === "outlined"
        ? `1px solid ${addOpacityToHex(
            this.props.theme.palette.mode === "light"
              ? this.colorPalette.main
              : this.colorPalette.light,
            0.5
          )}`
        : "none";

    if (this.rounded) {
      this.css.borderRadius = `${this.theme.borderRadius}px`;
    }

    return this;
  }

  setBackground() {
    this.css.backgroundColor =
      this.variant === "contained"
        ? this.props.theme.palette.mode === "light"
          ? this.colorPalette.main
          : this.colorPalette.light
        : "transparent";
    return this;
  }

  setDisabled() {
    const disabledProps = {
      color: this.props.theme.palette.action.disabled,
      boxShadow: "none",
      pointerEvents: "none",
      cursor: "default",
    };

    if (this.variant === "contained") {
      disabledProps.backgroundColor =
        this.props.theme.palette.action.disabledBackground;
    } else if (this.variant === "outlined") {
      disabledProps.borderColor =
        this.props.theme.palette.action.disabledBackground;
    }

    this.css["&[disabled]"] = disabledProps;
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
        this.props.theme.palette.mode === "light"
          ? this.colorPalette.main
          : this.colorPalette.light,
        this.theme.palette.action.hoverOpacity
      );
      hoverProps.borderColor =
        this.props.theme.palette.mode === "light"
          ? this.colorPalette.main
          : this.colorPalette.light;
    } else if (this.variant === "text") {
      hoverProps.backgroundColor = addOpacityToHex(
        this.props.theme.palette.mode === "light"
          ? this.colorPalette.main
          : this.colorPalette.light,
        this.theme.palette.action.hoverOpacity
      );
    } else if (this.variant === "contained") {
      hoverProps.backgroundColor =
        this.props.theme.palette.mode === "light"
          ? this.colorPalette.dark
          : this.colorPalette.main;
    }

    this.css["&:not([disabled]):hover"] = hoverProps;
    return this;
  }
}
