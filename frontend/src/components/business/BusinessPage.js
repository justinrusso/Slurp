import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

import Card from "../common/Card";
import CardContent from "../common/CardContent";
import Container from "../styled/Container";
import ErrorPage from "../common/ErrorPage";
import ReviewsSection from "../review/ReviewsSection";
import Rating from "../review/Rating";
import Typography from "../common/Typography";
import { Button } from "../styled/Button";
import { addOpacityToHex } from "../../utils/theme";
import {
  fetchReviews,
  selectBusiness,
  selectBusinessRatingAverage,
  selectBusinessReviewTotal,
} from "../../store/businesses";
import { useSessionUser } from "../../store/session";
import { roundHalf } from "../../utils";

const PhotoHeader = styled.div`
  background-color: #333;
  color: #fff;
  height: 426px;
  position: relative;
  width: 100%;
`;

const PhotoHeaderContentContainer = styled.div`
  display: flex;
  align-items: flex-end;
  bottom: 0;
  left: 0;
  margin: auto;
  padding: ${(props) => props.theme.spacing.gen(5, 8)};
  position: absolute;
  right: 0;
  top: 0;
`;

const PhotoHeaderContent = styled.div`
  flex: 1 auto;
  pointer-events: none;
  position: relative;
  z-index: 1;
  padding-right: ${(props) => props.theme.spacing.gen(2)};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.gen(2)};

  & > * {
    pointer-events: auto;
  }
`;

const ReviewHeroContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.gen(2)};
`;

const EditButton = styled(Button)`
  background-color: ${(props) =>
    addOpacityToHex("fff", props.theme.palette.action.hoverOpacity)};
  font-size: 12px;

  &:hover {
    background-color: ${(props) =>
      addOpacityToHex("fff", props.theme.palette.action.hoverOpacity * 3)};
  }
`;

const MainContainer = styled(Container).attrs(() => ({ as: "main" }))`
  display: flex;
  gap: ${(props) => props.theme.spacing.gen(4)};
  margin-top: ${(props) => props.theme.spacing.gen(3)};
`;

const MainLeft = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.gen(4)};
  width: 100%;

  ${(props) => props.theme.breakpoints.up("lg")} {
    width: ${(2 / 3) * 100}%;
  }

  & > section:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.palette.divider};
    margin-bottom: ${(props) => props.theme.spacing.gen(4)};
    padding-bottom: ${(props) => props.theme.spacing.gen(4)};
  }
`;

const MainRight = styled.div`
  display: none;
  width: ${(1 / 3) * 100}%;

  ${(props) => props.theme.breakpoints.up("lg")} {
    display: block;
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 18px;
`;

const BusinessPage = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();

  const business = useSelector(selectBusiness(businessId));
  const ratingAverage = useSelector(selectBusinessRatingAverage(businessId));
  const reviewTotal = useSelector(selectBusinessReviewTotal(businessId));
  const user = useSessionUser();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchReviews(businessId)).finally(() => setIsLoaded(true));
  }, [businessId, dispatch]);

  return business ? (
    isLoaded && (
      <>
        <PhotoHeader>
          <PhotoHeaderContentContainer>
            <Container>
              <PhotoHeaderContent>
                <Typography variant="h1">{business.name}</Typography>
                <ReviewHeroContainer>
                  <Rating
                    rating={roundHalf(ratingAverage)}
                    disableButtons
                    size="medium"
                    colorMode="dark"
                  />
                  <span>
                    {reviewTotal} review{reviewTotal === 1 ? "" : "s"}
                  </span>
                </ReviewHeroContainer>
                {business.ownerId === user?.id && (
                  <div>
                    <EditButton
                      color="white"
                      variant="text"
                      as={Link}
                      to={`/biz/${businessId}/edit`}
                    >
                      Edit
                    </EditButton>
                  </div>
                )}
              </PhotoHeaderContent>
            </Container>
          </PhotoHeaderContentContainer>
        </PhotoHeader>
        <MainContainer>
          <MainLeft>
            <section>
              <Typography variant="h4" gutterBottom>
                Location
              </Typography>
              <Typography>
                {business.address}, {business.city}, {business.state}{" "}
                {business.zipCode}
              </Typography>
            </section>
            {business.description && (
              <section>
                <Typography variant="h4" gutterBottom>
                  About the Business
                </Typography>
                <Typography>{business.description}</Typography>
              </section>
            )}
            <ReviewsSection business={business} />
          </MainLeft>
          <MainRight>
            <Sidebar>
              <Card>
                <CardContent>
                  <Typography>
                    {business.address}, {business.city}, {business.state}{" "}
                    {business.zipCode}
                  </Typography>
                </CardContent>
              </Card>
            </Sidebar>
          </MainRight>
        </MainContainer>
      </>
    )
  ) : (
    <ErrorPage />
  );
};

export default BusinessPage;
