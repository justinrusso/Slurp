import styled from "styled-components";

const Base = styled.div((props) => ({
  ...props.css,
  ...props.cssSelectors,
}));

export default Base;
