import logo from "../../images/logo.png";

import styled, { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import BusinessesList from "../business/BusinessesList";
import Container from "../styled/Container";
import LoadingCircle from "../common/LoadingCircle";
import NestedThemeProvider from "../theme/NestedThemeProvider";
import SearchForm from "../search/SearchForm";
import Typography from "../common/Typography";
import { Button } from "../styled/Button";
import { fetchBusinesses } from "../../store/businesses";

const Hero = styled.div`
  background-image: url(${(props) => props.image});

  background-color: #333;
  background-position: 50%;
  background-size: cover;
  height: 570px;
  padding-top: 30px;
  position: relative;
  width: 100%;

  .hero-background-overlay {
    background-color: #000000;
    opacity: 0.5;
    position: absolute;
    inset: 0;
  }
`;

const HeroContentWrapper = styled.div`
  inset: 0;
  padding-top: ${(props) => props.theme.spacing.gen(10)};
  position: absolute;
`;

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin-bottom: ${(props) => props.theme.spacing.gen(4)};
`;

const Logo = styled.img`
  height: 80px;
  width: 80px;
`;

const LogoText = styled(Typography)`
  color: ${(props) => props.theme.palette.primary.main};
`;

const MainContainer = styled(Container).attrs(() => ({ as: "main" }))`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.gen(3)};
`;

const SeeMoreButtonWrapper = styled.div`
  padding: ${(props) => props.theme.spacing.gen(3)} 0 0;
  display: flex;
  justify-content: center;
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();

  const businessEntries = useSelector((state) =>
    state.businesses.order.map(
      (businessId) => state.businesses.entries[businessId]
    )
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set("sort_by", "ratingAverage.desc");
    queryParams.set("limit", 5);
    dispatch(fetchBusinesses(queryParams)).finally(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded ? (
    <>
      <NestedThemeProvider inverted={theme.palette.mode === "dark"}>
        <Hero image="https://static.slurp.justinrusso.dev/images/hero.jfif">
          <div className="hero-background-overlay" />
          <HeroContentWrapper>
            <Container>
              <LogoContainer>
                <LogoText as="h1" variant="h3">
                  Slurp
                </LogoText>
                <Logo src={logo} alt="" />
              </LogoContainer>
              <SearchForm />
            </Container>
          </HeroContentWrapper>
        </Hero>
      </NestedThemeProvider>
      <MainContainer>
        <Typography variant="h2" color="primary" gutterBottom>
          Top 5 Ramen Shops
        </Typography>
        {businessEntries ? (
          <BusinessesList businesses={businessEntries} />
        ) : (
          <Typography as="h1" variant="h3" gutterBottom>
            No businsesses found!
          </Typography>
        )}
        <SeeMoreButtonWrapper>
          <Button onClick={() => history.push("/search")}>
            See More Ramen Shops
          </Button>
        </SeeMoreButtonWrapper>
      </MainContainer>
    </>
  ) : (
    <LoadingCircle />
  );
};

export default HomePage;
