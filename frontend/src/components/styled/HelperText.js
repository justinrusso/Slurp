import styled from "styled-components";

const HelperText = styled.p`
  color: ${(props) =>
    props.error
      ? props.theme.palette.error.main
      : props.theme.palette.text.secondary};
  font-size: 0.75rem;
  letter-spacing: 0.03333em;
  line-height: 1.66;
  margin: ${(props) => props.theme.spacing.gen(0.375, 1.75, 0)};
`;

export default HelperText;
