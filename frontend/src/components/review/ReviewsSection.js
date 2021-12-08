/**
 * @typedef {import('../../store/businesses.js').ReviewData} ReviewData
 */

import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Card from "../common/Card";
import CardContent from "../common/CardContent";
import Rating from "./Rating";
import Review from "./Review";
import Typography from "../common/Typography";
import { createNewReview, selectBusinessReviews } from "../../store/businesses";
import { useSessionUser } from "../../store/session";
import { useMemo } from "react";
import InputField from "../common/InputField";
import { Button } from "../styled/Button";
import HelperText from "../common/HelperText";
import { useAuthModal } from "../../context/AuthModalsProvider";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.gen(2)};
`;

const ReviewCardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const RatingHelperWrapper = styled.div`
  width: 100%;
`;

const StartReview = styled(Typography)`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ReviewsSection = ({ business }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectBusinessReviews(business.id));
  const user = useSessionUser();

  const { setLoginModalVisible } = useAuthModal();

  /** @type {ReviewData[]} */
  const reviewsArr = useMemo(() => Object.values(reviews), [reviews]);

  const [isReviewing, setIsReviewing] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [comment, setComment] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startReview = () => {
    if (!user) {
      setLoginModalVisible(true);
      return;
    }
    setIsReviewing(true);
  };

  const handleChange = (num) => {
    if (!user) {
      setLoginModalVisible(true);
      return;
    }
    setNewRating(num);
    startReview();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setErrors({});

    let errored = false;
    const newErrors = {};

    if (comment.length === 0) {
      newErrors.comment = "Enter a comment";
      errored = true;
    }
    if (newRating === 0) {
      newErrors.rating = "Enter a rating";
      errored = true;
    }

    if (errored) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(
        createNewReview(business.id, { rating: newRating, comment })
      );
      setNewRating(0);
      setComment("");
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <Card>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <ReviewCardTop>
              <Typography>{user?.name || "Username"}</Typography>
              <RatingWrapper>
                <Rating
                  rating={newRating}
                  size="medium"
                  onChange={handleChange}
                />
                {isReviewing ? (
                  <RatingHelperWrapper>
                    <HelperText
                      error={!!errors.rating}
                      showIcon={!!errors.rating}
                    >
                      {!!errors.rating ? errors.rating : "Select your rating"}
                    </HelperText>
                  </RatingHelperWrapper>
                ) : (
                  <StartReview
                    color="secondary"
                    gutterBottom
                    onClick={() => startReview()}
                  >
                    Start your review of <b>{business.name}.</b>
                  </StartReview>
                )}
              </RatingWrapper>
            </ReviewCardTop>
            {isReviewing && (
              <>
                <InputField
                  fullWidth
                  id="review-comment"
                  label="Your Review"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  error={!!errors.comment}
                  helperText={errors.comment}
                />
                <FormActions>
                  <Button type="submit">Post Review</Button>
                </FormActions>
              </>
            )}
          </Form>
        </CardContent>
      </Card>
      {reviewsArr.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </section>
  );
};

ReviewsSection.propTypes = {
  business: PropTypes.object.isRequired,
};

export default ReviewsSection;
