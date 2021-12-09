import styled from "styled-components";

const MenuItem = styled.li`
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: 0;
  color: inherit;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  outline: 0;
  padding: 6px 16px;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  ${(props) =>
    !props.plain && {
      cursor: "pointer",

      "&:hover": {
        backgroundColor: props.theme.palette.action.hover,
        textDecoration: "none",
      },
    }}
`;

export default MenuItem;
