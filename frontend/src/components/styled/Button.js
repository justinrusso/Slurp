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
  as: "button",
  css: getStyling(props),
}))`
  cursor: pointer;

  &:not(style) + :not(style) {
    margin: 0;
    margin-left: ${(props) => props.theme.spacing.gen(2)};
  }
`;
