import React, { useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  dotsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0",
  },
  dot: {
    borderRadius: "50%",
    transition: `width 300ms ease-in-out, height 300ms ease-in-out,
        margin 300ms ease-in-out`,
  },
}));

export default function Dots({
  activeDotColor,
  centerDots,
  currentSlide,
  dotColor,
  totalSlides,
}) {
  const TOTAL_SPACE = 10;
  const SIZES = [6, 4, 2];
  const styleProps = {
    dotColor: dotColor,
    activeDotColor: activeDotColor,
  };
  const classes = useStyles(styleProps);

  const centerOffset = useRef(0);
  const slideOffset = useRef(0);

  const currentCenterOffset = currentSlide - slideOffset.current;
  if (currentCenterOffset >= 0 && currentCenterOffset < centerDots) {
    centerOffset.current = currentCenterOffset;
  } else {
    slideOffset.current = currentSlide - centerOffset.current;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(min, value), max);
  }

  return (
    <div className={classes.dotsContainer}>
      {[...Array(totalSlides)].map((_, idx) => {
        const centerPage = parseInt(centerDots / 2, 10) + slideOffset.current;
        const distance = Math.abs(idx - centerPage);

        const scaledDistance = clamp(
          distance - parseInt(centerDots / 2, 10),
          0,
          3
        );
        const size = SIZES[scaledDistance] || 0;
        const margin = size !== 0 ? (TOTAL_SPACE - size) / 2 : 0;
        return (
          <div
            className={classes.dot}
            key={idx}
            style={{
              background: idx === currentSlide ? activeDotColor : dotColor,
              width: size + "px",
              height: size + "px",
              margin: "0 " + margin + "px",
            }}
          ></div>
        );
      })}
    </div>
  );
}

Dots.propTypes = {
  activeDotColor: PropTypes.string,
  centerDots: PropTypes.number,
  currentSlide: PropTypes.number.isRequired,
  dotColor: PropTypes.string,
  totalSlides: PropTypes.number.isRequired,
};

Dots.defaultProps = {
  activeDotColor: "#4e99e9",
  centerDots: 3,
  dotColor: "#dadbdc",
};
