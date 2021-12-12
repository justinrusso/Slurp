import styled from "styled-components";
import StyleBuilderButton from "../../utils/theme/StyleBuilderButton";
import Base from "./Base";

const getStyling = (props) => {
  const builder = new StyleBuilderButton(
    props,
    props.color,
    props.variant,
    props.rounded
  );

  builder.setFontColor().setBorder().setBackground().setPadding().setHover();

  return builder.css;
};

export const Button = styled(Base).attrs((props) => ({
  as: props.as || "button",
  css: getStyling(props),
}))`
  cursor: pointer;
  text-decoration: none;
  transition: background-color 250ms
      ${(props) => props.theme.transitions.easing.easeInOut} 0ms,
    box-shadow 250ms ${(props) => props.theme.transitions.easing.easeInOut} 0ms,
    border-color 250ms ${(props) => props.theme.transitions.easing.easeInOut}
      0ms,
    color 250ms ${(props) => props.theme.transitions.easing.easeInOut} 0ms;

  &:not(style) + :not(style) {
    margin: 0;
    margin-left: ${(props) => props.theme.spacing.gen(2)};
  }
`;
