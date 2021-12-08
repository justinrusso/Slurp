/**
 * @typedef {import('../../store/businesses.js').ReviewData} ReviewData
 */

import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Card from "../common/Card";
import CardContent from "../common/CardContent";
import Review from "./Review";
import Typography from "../common/Typography";
import { selectBusinessReviews } from "../../store/businesses";
import { useSessionUser } from "../../store/session";
import { useMemo } from "react";

const ReviewsSection = ({ businessId }) => {
  const reviews = useSelector(selectBusinessReviews(businessId));
  const user = useSessionUser();

  /** @type {ReviewData[]} */
  const reviewsArr = useMemo(() => Object.values(reviews), [reviews]);

  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <Card>
        <CardContent>
          <Typography>{user?.name || "Username"}</Typography>
        </CardContent>
      </Card>
      {reviewsArr.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </section>
  );
};

ReviewsSection.propTypes = {
  businessId: PropTypes.string.isRequired,
};

export default ReviewsSection;
