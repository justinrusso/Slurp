import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import IconButton from "../styled/IconButton";
import Rating from "./Rating";
import Typography from "../common/Typography";
import Menu from "../common/Menu";
import MenuItem from "../common/MenuItem";
import ReviewEditDialog from "./ReviewEditDialog";

const ReviewWrapper = styled.article`
  margin-top: ${(props) => props.theme.spacing.gen(5)};
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MiddleSection = styled.div`
  display: flex;
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
  margin-left: ${(props) => props.theme.spacing.gen(1)};
`;

const Comment = styled(Typography)`
  font-size: 14px;
  line-height: 1.43;
`;

const Review = ({ review }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    closeMenu();
    setEditModalVisible(true);
  };

  const handleDelete = () => {
    closeMenu();
  };

  return (
    <ReviewWrapper key={review.id}>
      <TopSection>
        <Typography as="span">{review.user.username}</Typography>
        <div>
          <IconButton onClick={showMenu} color="black">
            <FontAwesomeIcon icon={faEllipsisH} />
          </IconButton>
          <Menu
            id={`comment-more-${review.id}`}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
      </TopSection>
      {editModalVisible && (
        <ReviewEditDialog
          onClose={() => setEditModalVisible(false)}
          review={review}
        />
      )}
      <MiddleSection>
        <Rating rating={review.rating} disableButtons size="small" />
        <ReviewDate as="span">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </ReviewDate>
      </MiddleSection>
      <Comment>{review.comment}</Comment>
    </ReviewWrapper>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Review;
