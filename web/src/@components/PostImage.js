import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { formateImageUrl, formateVideoUrl } from "@helpers/formateImageUrl";
import postPlaceHolder from "assets/icons/post-placeholder.png";
import { Dots } from "@components";

function PostImage(props) {
  const [show, setShow] = useState(true);

  const { mediaFiles } = props;
  const vidRef = useRef(null);

  const useStyles = makeStyles(() => ({
    postImage: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: props.hasRadius ? props.hasRadius : "0px",
    },
    carousel_div: {
      "&::before": {
        content: '""',
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        borderRadius: props.hasRadius ? props.hasRadius : "0px",
        verticalAlign: "middle",
        objectFit: "cover",
        background: `linear-gradient(
        to top,
        rgb(6 6 6 / 66%) 20%,
        rgb(0 0 0 / 20%) 40%,
        rgba(0, 0, 0, 0) 60%,
        rgb(41 40 40 / 20%) 80%,
        rgba(6 6 6 / 66%) 100%
      )`,
      },
    },

    carousel: {
      "& div:nth-of-type(1)": {
        height: "100%",
        objectFit: "cover",
      },
      borderRadius: props.isRecipe || props.profileGrid ? "6px" : "0px",
      height: "100%",
      "& .carousel .carousel-status": {
        top: props.details ? "-4%" : "-2%",
        right: props.details ? "3%" : "2%",
      },
      "& .slider .animated": {
        height: "100%",
      },
      "& .carousel .slider-wrapper.axis-horizontal ul": {
        height: "100%",
      },
      "& .carousel .slider-wrapper.axis-horizontal .slider .slide": {
        borderRadius: props.isRecipe || props.profileGrid ? "6px" : "0px",
        height: "100%",
      },
      "& .carousel-slider": {
        borderRadius: props.isRecipe || props.profileGrid ? "6px" : "0px",
        height: "100%",
      },
      "& .selected": {
        outline: "none",
      },
    },
    videoContainer: {
      position: "relative",
      height: "100%",
      width: "100%",
      objectFit: "cover",
      outline: "none",
      borderRadius: props.isRecipe ? "6px" : "0px",
    },
    overlay: {
      position: "absolute",
      top: "0",
      width: "100%",
      height: "100%",
      zIndex: "100",
    },

    postVideo: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      outline: "none",
      borderRadius: props.isRecipe ? "6px" : "0px",
    },
    playPauseContainer: {
      height: "unset !important",
      position: "absolute",
      zIndex: "1000",
      top: "43%",
      left: "0",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    playPause: {
      width: "35px !important",
      borderRadius: "50%",
      backgroundColor: "#6979f8",
      transition: "1s all ease-in-out",
      opacity: show ? "1" : "0",
    },
    dotsContainer: {
      position: "absolute",
      bottom: "-5vh",
      width: "100%",
      zIndex: "1",
    },
  }));

  const classes = useStyles();

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      {mediaFiles?.length > 0 ? (
        mediaFiles && typeof mediaFiles === "object" ? (
          <div style={{ position: "relative", height: "100%" }}>
            {mediaFiles.length > 1 && (
              <div className={classes.dotsContainer}>
                <Dots
                  totalSlides={mediaFiles.length}
                  currentSlide={currentSlide}
                  centerDots={2}
                  activeDotColor="#e43e68d6"
                />
              </div>
            )}
            <Carousel
              showArrows={true}
              showThumbs={false}
              autoPlay={true}
              showStatus={
                // mediaFiles.length <= 1 ? false : true
                false
              }
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                if (isSelected) {
                  setCurrentSlide(index);
                }
              }}
              className={classes.carousel}
            >
              {mediaFiles.map((file, idx) => {
                return (
                  <div className={classes.carousel_div} key={file + idx}>
                    {file?.includes("images/") ? (
                      <img
                        src={
                          formateImageUrl(file)
                            ? formateImageUrl(file)
                            : postPlaceHolder
                        }
                        alt="mediaFiles"
                        className={classes.postImage}
                      />
                    ) : (
                      <div
                        className={classes.videoContainer}
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        <video
                          width="100%"
                          height="100%"
                          className={classes.postVideo}
                          ref={vidRef}
                        >
                          <source
                            src={formateVideoUrl(file)}
                            type="video/mp4"
                          />
                        </video>
                        <div className={classes.overlay}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </Carousel>
          </div>
        ) : (
          <div
            className={classes.videoContainer}
            onClick={() => {
              setShow(true);
            }}
          >
            <video
              width="100%"
              height="100%"
              className={classes.postVideo}
              ref={vidRef}
            >
              <source src={formateVideoUrl(mediaFiles)} type="video/mp4" />
            </video>
          </div>
        )
      ) : (
        <img
          src={postPlaceHolder}
          alt="Product_Image"
          className={classes.postImage}
        />
      )}
    </>
  );
}

export default PostImage;
