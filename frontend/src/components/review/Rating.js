import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const RatingsWrapper = styled.div`
  display: flex;
  font-size: ${(props) => (props.size === "small" ? 10 : 16)}px;
  gap: ${(props) => (props.size === "small" ? 2 : 4)}px;
`;

const getRatingColor = (props) => {
  const { rating: ratingValue } = props;
  const colorMode = props.colorMode || props.theme.palette.mode;
  const emptyColor =
    colorMode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";

  if (ratingValue >= 5) {
    return "#f43939";
  }
  if (ratingValue >= 4) {
    return "#ff523d";
  }
  if (ratingValue >= 3) {
    return "#ff7e42";
  }
  if (ratingValue >= 2) {
    return "#ffa448";
  }
  if (ratingValue >= 1) {
    return "#ffcb4b";
  }
  return emptyColor;
};

const generateRatingBackground = (props) => {
  const color = getRatingColor(props);

  const { rating: ratingValue, forValue } = props;
  const colorMode = props.colorMode || props.theme.palette.mode;
  const emptyColor =
    colorMode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";

  if (ratingValue % 1 !== 0 && Math.round(ratingValue) === forValue) {
    return `linear-gradient(90deg, ${color} 50%, ${emptyColor} 50%)`;
  }
  if (ratingValue < forValue) {
    return emptyColor;
  }
  return color;
};

const RatingSquare = styled.div`
  background: ${(props) => generateRatingBackground(props)};
  border-radius: ${(props) => props.theme.borderRadius}px;
  color: #fff;
  display: grid;

  & > * {
    grid-area: 1 / 1 / 2 / 2;
    display: block;
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
  }
`;

const RatingInput = styled.input`
  appearance: none;
  cursor: pointer;
  pointer-events: auto;
`;

const RatingIconWrapper = styled.div`
  pointer-events: none;
  z-index: 2;
`;

/**
 *
 * @param {{
 *  disableButtons: boolean;
 *  rating: number;
 *  size: "small" | "medium";
 * }} props
 * @returns
 */
const Rating = ({ colorMode, disableButtons, rating, size }) => {
  const [value, setValue] = useState(rating);

  const handleClick = (e) => {
    if (disableButtons) {
      return;
    }
    setValue(Number.parseInt(e.target.value, 10));
  };

  return (
    <RatingsWrapper size={size}>
      <RatingSquare
        variant="contained"
        rating={value}
        forValue={1}
        colorMode={colorMode}
      >
        {!disableButtons && (
          <RatingInput
            type="radio"
            onChange={handleClick}
            value="1"
            checked={value === 1}
          />
        )}
        <RatingIconWrapper>
          <FontAwesomeIcon icon={faStar} />
        </RatingIconWrapper>
      </RatingSquare>
      <RatingSquare
        variant="contained"
        rating={value}
        forValue={2}
        colorMode={colorMode}
      >
        {!disableButtons && (
          <RatingInput
            type="radio"
            onChange={handleClick}
            value="2"
            checked={value === 2}
          />
        )}
        <RatingIconWrapper>
          <FontAwesomeIcon icon={faStar} />
        </RatingIconWrapper>
      </RatingSquare>
      <RatingSquare
        variant="contained"
        rating={value}
        forValue={3}
        colorMode={colorMode}
      >
        {!disableButtons && (
          <RatingInput
            type="radio"
            onChange={handleClick}
            value="3"
            checked={value === 3}
          />
        )}
        <RatingIconWrapper>
          <FontAwesomeIcon icon={faStar} />
        </RatingIconWrapper>
      </RatingSquare>
      <RatingSquare
        variant="contained"
        rating={value}
        forValue={4}
        colorMode={colorMode}
      >
        {!disableButtons && (
          <RatingInput
            type="radio"
            onChange={handleClick}
            value="4"
            checked={value === 4}
          />
        )}
        <RatingIconWrapper>
          <FontAwesomeIcon icon={faStar} />
        </RatingIconWrapper>
      </RatingSquare>
      <RatingSquare
        variant="contained"
        rating={value}
        forValue={5}
        colorMode={colorMode}
      >
        {!disableButtons && (
          <RatingInput
            type="radio"
            onChange={handleClick}
            value="5"
            checked={value === 5}
          />
        )}
        <RatingIconWrapper>
          <FontAwesomeIcon icon={faStar} />
        </RatingIconWrapper>
      </RatingSquare>
    </RatingsWrapper>
  );
};

Rating.propTypes = {
  colorMode: PropTypes.oneOf(["light", "dark"]),
  disableButtons: PropTypes.bool,
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(["small", "medium"]).isRequired,
};

export default Rating;
