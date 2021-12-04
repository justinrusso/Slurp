import styled from "styled-components";
import { ContainerWrapper } from "../styled/Container";

const Hero = styled.div`
  background-image: url(${(props) => props.image});

  background-color: #333;
  background-position: 50%;
  background-size: cover;
  height: 570px;
  padding-top: 30px;
  width: 100%;
`;

const HomePage = () => {
  return (
    <>
      <ContainerWrapper>
        <Hero />
      </ContainerWrapper>
    </>
  );
};

export default HomePage;
