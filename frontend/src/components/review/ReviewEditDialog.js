import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Dialog from "../common/Dialog";
import HelperText from "../common/HelperText";
import InputField from "../common/InputField";
import ModalContent from "../styled/ModalContent";
import Rating from "./Rating";
import { Button } from "../styled/Button";
import { updateReview } from "../../store/businesses";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.gen(2)};
`;

const ReviewEditDialog = ({ onClose, review }) => {
  const dispatch = useDispatch();

  const [rating, setNewRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (rating === 0) {
      newErrors.rating = "Enter a rating";
      errored = true;
    }

    if (errored) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(updateReview(review.id, { rating, comment }));
      onClose(); // Trigger a close
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog onClose={onClose} fullWidth>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <div>
            <Rating rating={rating} size="medium" onChange={setNewRating} />
            {!!errors.rating && (
              <HelperText error showIcon>
                {errors.rating}
              </HelperText>
            )}
          </div>
          <InputField
            fullWidth
            id="review-comment"
            label="Your Review"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            error={!!errors.comment}
            helperText={errors.comment}
            inputProps={{
              as: "textarea",
              rows: 4,
            }}
          />
          <div>
            <Button type="submit">Update Review</Button>
          </div>
        </Form>
      </ModalContent>
    </Dialog>
  );
};

ReviewEditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

export default ReviewEditDialog;
