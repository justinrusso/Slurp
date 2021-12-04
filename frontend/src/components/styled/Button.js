import styled from "styled-components";

const getStyling = (props) => {
  const newProps = {};

  const colorPalette = props.theme.palette[props.color || "primary"];
  const variant = props.variant || "contained";

  // Font Color
  if (variant === "contained") {
    newProps.color = colorPalette.contrastText;
  } else {
    newProps.color = colorPalette.main;
  }

  newProps.border =
    variant === "outlined" ? `1px solid ${colorPalette.main}` : "none";

  newProps.backgroundColor =
    variant === "contained" ? colorPalette.main : "transparent";

  return newProps;
};

export const Button = styled.button.attrs(getStyling)`
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
`;
