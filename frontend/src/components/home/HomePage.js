import styled, { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BusinessesList from "../business/BusinessesList";
import Container from "../styled/Container";
import LoadingCircle from "../common/LoadingCircle";
import NestedThemeProvider from "../theme/NestedThemeProvider";
import SearchForm from "../search/SearchForm";
import Typography from "../common/Typography";
import { fetchBusinesses } from "../../store/businesses";

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
  const dispatch = useDispatch();
  const theme = useTheme();

  const businessEntries = useSelector((state) =>
    Object.values(state.businesses.entries)
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchBusinesses()).finally(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded ? (
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
        {businessEntries ? (
          <BusinessesList businesses={businessEntries} />
        ) : (
          <Typography as="h1" variant="h3" gutterBottom>
            No businsesses found!
          </Typography>
        )}
      </MainContainer>
    </>
  ) : (
    <LoadingCircle />
  );
};

export default HomePage;
