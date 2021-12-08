import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Typography from "../common/Typography";
import IconButton from "../styled/IconButton";

const ReviewWrapper = styled.article`
  margin-top: ${(props) => props.theme.spacing.gen(5)};
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewDate = styled(Typography).attrs((props) => {
  return {
    as: "span",
    ...props,
  };
})`
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 14px;
  line-height: 1.43;
`;

const Comment = styled(Typography)`
  font-size: 14px;
  line-height: 1.43;
`;

const Review = ({ review }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <ReviewWrapper key={review.id}>
      <TopSection>
        <Typography as="span">{review.user.username}</Typography>
        <div>
          <IconButton onClick={showMenu} color="black">
            <FontAwesomeIcon icon={faEllipsisH} />
          </IconButton>
        </div>
      </TopSection>
      <ReviewDate as="span">
        {review.rating}{" "}
        {new Date(review.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </ReviewDate>
      <Comment>{review.comment}</Comment>
    </ReviewWrapper>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Review;
