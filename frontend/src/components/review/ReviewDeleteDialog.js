import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Dialog from "../common/Dialog";
import ModalContent from "../styled/ModalContent";
import Rating from "./Rating";
import Typography from "../common/Typography";
import { Button } from "../styled/Button";
import { deleteReview } from "../../store/businesses";

const ReviewContainer = styled.div`
  color: ${(props) => props.theme.palette.text.secondary};
  margin: ${(props) => props.theme.spacing.gen(2, 0)};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${(props) => props.theme.spacing.gen(2)};
`;

const ReviewDeleteDialog = ({ onClose, review }) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(deleteReview(review.businessId, review.id));
    } catch (res) {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog onClose={onClose} fullWidth>
      <ModalContent>
        <Typography color="primary" variant="h4" gutterBottom>
          Delete Review
        </Typography>
        <Typography gutterBottom>
          Are you sure you would like to delete this review?
        </Typography>
        <ReviewContainer>
          <Rating rating={review.rating} size="small" disableButtons />
          <Typography>{review.comment}</Typography>
        </ReviewContainer>
        <Actions>
          <Button variant="text" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </Actions>
      </ModalContent>
    </Dialog>
  );
};

ReviewDeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

export default ReviewDeleteDialog;
