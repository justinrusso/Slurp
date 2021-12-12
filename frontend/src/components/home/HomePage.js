import styled, { useTheme } from "styled-components";
import { useSelector } from "react-redux";

import Container from "../styled/Container";
import SearchForm from "../search/SearchForm";
import NestedThemeProvider from "../theme/NestedThemeProvider";
import BusinessesList from "../business/BusinessesList";

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

const MainContainer = styled(Container).attrs(() => ({ as: "main" }))`
  display: flex;
  margin-top: ${(props) => props.theme.spacing.gen(3)};
`;

const HomePage = () => {
  const theme = useTheme();

  const businessEntries = useSelector((state) =>
    Object.values(state.businesses.entries)
  );

  return (
    <>
      <NestedThemeProvider inverted={theme.palette.mode === "dark"}>
        <Hero image="https://static.slurp.justinrusso.dev/images/hero.jfif">
          <HeroContentWrapper>
            <Container>
              <SearchForm />
            </Container>
          </HeroContentWrapper>
        </Hero>
      </NestedThemeProvider>
      <MainContainer>
        <BusinessesList businesses={businessEntries} />
      </MainContainer>
    </>
  );
};

export default HomePage;
