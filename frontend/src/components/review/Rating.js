import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { roundHalf } from "../../utils";

const RatingsWrapper = styled.div`
  display: flex;
  font-size: ${(props) => (props.size === "small" ? 10 : 16)}px;
  gap: ${(props) => (props.size === "small" ? 2 : 4)}px;
  width: fit-content;
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
 *  colorMode: "light" | "dark";
 *  disableButtons: boolean;
 *  onChange: (rating: number) => void;
 *  rating: number;
 *  size: "small" | "medium";
 * }} props
 * @returns
 */
const Rating = ({ colorMode, disableButtons, onChange, rating, size }) => {
  if (!disableButtons && !onChange) {
    throw new Error("onChange must be provided if buttons are enabled");
  }

  const [value, setValue] = useState(roundHalf(rating));

  useEffect(() => {
    setValue(roundHalf(rating));
  }, [rating]);

  const handleChange = (e) => {
    onChange(Number.parseInt(e.target.value, 10));
  };

  const handleClick = (e) => {
    if (disableButtons) {
      return;
    }
    setValue(Number.parseInt(e.target.value, 10));
  };

  const handleMouseLeave = () => {
    if (value !== rating) {
      setValue(roundHalf(rating));
    }
  };

  return (
    <RatingsWrapper
      size={size}
      onMouseLeave={disableButtons ? undefined : handleMouseLeave}
    >
      <RatingSquare
        variant="contained"
        rating={value}
        forValue={1}
        colorMode={colorMode}
      >
        {!disableButtons && (
          <RatingInput
            type="radio"
            onChange={handleChange}
            // onClick={handleChange}
            onMouseEnter={handleClick}
            value="1"
            checked={rating === 1}
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
            onChange={handleChange}
            // onClick={handleChange}
            onMouseEnter={handleClick}
            value="2"
            checked={rating === 2}
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
            onChange={handleChange}
            // onClick={handleChange}
            onMouseEnter={handleClick}
            value="3"
            checked={rating === 3}
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
            onChange={handleChange}
            // onClick={handleChange}
            onMouseEnter={handleClick}
            value="4"
            checked={rating === 4}
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
            onChange={handleChange}
            // onClick={handleChange}
            onMouseEnter={handleClick}
            value="5"
            checked={rating === 5}
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
  onChange: PropTypes.func,
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(["small", "medium"]).isRequired,
};

export default Rating;
