import styled from "styled-components";

const ModalContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing.gen(2.5, 3)};
`;

export default ModalContent;
