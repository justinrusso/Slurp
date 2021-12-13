import businessDefaultImage from "../../images/business_default.png";

import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import Card from "../common/Card";
import CardContent from "../common/CardContent";
import Rating from "../review/Rating";
import Typography from "../common/Typography";
import { getOverlayAlpha } from "../../utils/theme";

const BusinessesListRoot = styled.ul`
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

  &:hover {
    text-decoration: underline;
  }
`;

const BusinessCard = styled(Card)`
  background-image: ${(props) =>
    props.theme.palette.mode === "dark" &&
    `linear-gradient(rgba(255, 255, 255, ${getOverlayAlpha(
      1
    )}), rgba(255, 255, 255, ${getOverlayAlpha(1)}))`};
  display: flex;
  gap: ${(props) => props.theme.spacing.gen(2)};
  cursor: pointer;

  &:hover {
    background-image: ${(props) =>
      props.theme.palette.mode === "dark" &&
      `linear-gradient(rgba(255, 255, 255, ${getOverlayAlpha(
        2
      )}), rgba(255, 255, 255, ${getOverlayAlpha(2)}))`};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const BusinessImageWrapper = styled.div`
  height: 220px;
  width: 220px;
  padding: ${(props) => props.theme.spacing.gen(2)};
  padding-right: 0;
`;

const BusinessImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius}px;
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

const BusinessesList = ({ businesses }) => {
  const history = useHistory();

  return (
    <BusinessesListRoot>
      {businesses.map((business, i) => (
        <BusinessListItem key={business.id}>
          <BusinessCard onClick={() => history.push(`/biz/${business.id}`)}>
            <BusinessImageWrapper>
              <BusinessImage
                src={business.displayImage || businessDefaultImage}
                alt={business.name}
              />
            </BusinessImageWrapper>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {i + 1}.{" "}
                <CardLink
                  to={`/biz/${business.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {business.name}
                </CardLink>
              </Typography>
              <RatingContainer gutterBottom>
                <Rating
                  rating={business.ratingAverage || 0}
                  disableButtons
                  size="small"
                />
                {business.total || 0}
              </RatingContainer>
            </CardContent>
          </BusinessCard>
        </BusinessListItem>
      ))}
    </BusinessesListRoot>
  );
};

BusinessesList.propTypes = {
  businesses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BusinessesList;
