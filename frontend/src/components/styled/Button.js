import styled from "styled-components";

const getStyling = (props) => {
  const newProps = {};

  const color = props.color || "primary";
  const variant = props.variant || "contained";

  // Font Color
  if (variant === "contained") {
    newProps.color = props.theme.palette[color].contrastText;
  } else {
    newProps.color = props.theme.palette[color].main;
  }

  newProps.border =
    variant === "outlined" ? `1px solid ${props.theme[color].main}` : "none";

  newProps.backgroundColor =
    variant === "contained" ? props.theme.palette[color].main : "transparent";

  return newProps;
};

export const Button = styled.button.attrs(getStyling)`
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  background-color: ${(props) => props.backgroundColor};
  pointer: cursor;
`;
