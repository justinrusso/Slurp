import styled from "styled-components";
import SearchForm from "../search/SearchForm";

import Container from "../styled/Container";

const Hero = styled.div`
  background-image: url(${(props) => props.image});

  background-color: #333;
  background-position: 50%;
  background-size: cover;
  height: 570px;
  padding-top: 30px;
  width: 100%;
`;

const HeroContentWrapper = styled.div`
  padding-top: ${(props) => props.theme.spacing.gen(10)};
`;

const HomePage = () => {
  return (
    <>
      <Hero>
        <HeroContentWrapper>
          <Container>
            <SearchForm />
          </Container>
        </HeroContentWrapper>
      </Hero>
    </>
  );
};

export default HomePage;
