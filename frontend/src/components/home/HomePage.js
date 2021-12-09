import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../common/Card";
import CardContent from "../common/CardContent";
import Container from "../styled/Container";
import Rating from "../review/Rating";
import SearchForm from "../search/SearchForm";
import Typography from "../common/Typography";

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

const BusinessesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.gen(3)};
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const BusinessListItem = styled.li`
  display: block;
  width: 100%;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const BusinessCard = styled(Card)`
  display: flex;
  gap: ${(props) => props.theme.spacing.gen(2)};
`;

const BusinessImage = styled.img`
  height: 220px;
  width: 220px;
`;

const RatingContainer = styled(Typography).attrs((props) => {
  return {
    ...props,
    as: "div",
  };
})`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.gen(1)};
  color: ${(props) => props.theme.palette.text.secondary};
`;

const HomePage = () => {
  const businessEntries = useSelector((state) =>
    Object.values(state.businesses.entries)
  );

  return (
    <>
      <Hero>
        <HeroContentWrapper>
          <Container>
            <SearchForm />
          </Container>
        </HeroContentWrapper>
      </Hero>
      <MainContainer>
        <BusinessesList>
          {businessEntries.map((business, i) => (
            <BusinessListItem key={business.id}>
              <CardLink to={`/biz/${business.id}`}>
                <BusinessCard>
                  <BusinessImage
                    src={business.displayImage}
                    alt={business.name}
                  />
                  <CardContent>
                    <Typography variant="h4" gutterBottom>
                      {i + 1}. {business.name}
                    </Typography>
                    <RatingContainer gutterBottom>
                      <Rating
                        rating={business.ratingAverage}
                        disableButtons
                        size="small"
                      />
                      {business.total}
                    </RatingContainer>
                  </CardContent>
                </BusinessCard>
              </CardLink>
            </BusinessListItem>
          ))}
        </BusinessesList>
      </MainContainer>
    </>
  );
};

export default HomePage;
