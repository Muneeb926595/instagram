import React, { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { viewedStory } from "@store/stories/StoriesActions";
import { updateLocalStoriesData } from "@store/stories/StoriesActions";
import { CrossButton } from "@components";

const useStyles = makeStyles((theme) => ({
  storiesScreen: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  crossIconContainer: {
    position: "absolute",
    right: "2rem",
    top: "2rem",
    width: "30px",
    height: "30px",
  },
  crossIcon: {
    position: "absolute",
    top: "3%",
    right: "3%",
    width: "25px",
    height: "25px",
    cursor: "pointer",
    zIndex: "1000",
    [theme.breakpoints.down("sm")]: {
      width: "18px",
      height: "18px",
    },
  },
  storyCloser: {
    width: "inherit",
    height: "inherit",
    display: "flex",
    position: "absolute",
  },
  storyCloserLeft: {
    width: "50%",
    zIndex: "500",
  },
  storyCloserRight: {
    width: "50%",
    zIndex: "10000",
  },
}));

const StoriesScreen = ({
  storyId,
  stories,
  setShowStoriesModal,
  storiesData,
  setShowStoryCircle,
  fromFoodAndiPage,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [storyClose, setStoryClose] = useState(false);
  const unReadStoriesData = useSelector(
    ({ Foodbook }) => Foodbook.stories.stories.UnreadStoriesData
  );
  const readStoriesData = useSelector(
    ({ Foodbook }) => Foodbook.stories.stories.ReadStoriesData
  );

  const [allStories, setAllStories] = useState();

  useEffect(() => {
    if (
      unReadStoriesData &&
      unReadStoriesData.length > 0 &&
      readStoriesData &&
      readStoriesData.length <= 0
    ) {
      setAllStories([...unReadStoriesData]);
    } else if (
      readStoriesData &&
      readStoriesData.length > 0 &&
      unReadStoriesData &&
      unReadStoriesData.length <= 0
    ) {
      setAllStories([...readStoriesData]);
    } else if (
      unReadStoriesData &&
      unReadStoriesData.length > 0 &&
      readStoriesData &&
      readStoriesData.length > 0
    ) {
      setAllStories([...unReadStoriesData, ...readStoriesData]);
    }
  }, [unReadStoriesData, readStoriesData]);

  const handleStoriesEnd = () => {
    setShowStoriesModal(false);
    if (fromFoodAndiPage !== "fromFoodAndiPage") {
      let currentlyUserReadStory = allStories.find(
        (story) => story._id === storyId
      );
      currentlyUserReadStory = {
        ...currentlyUserReadStory,
        showStoryCircle: false,
      };
      const tempStoriesResult = allStories.filter(
        (story) => story._id !== storyId
      );
      const updatedArray = sortDataOnBasisOfStories([
        ...tempStoriesResult,
        currentlyUserReadStory,
      ]);
      const UnreadStoriesData = [];
      for (let i = 0; i < updatedArray.length; i++) {
        if (updatedArray[i].showStoryCircle) {
          let tempStory = { ...updatedArray[i], priority: i + 1 };
          UnreadStoriesData.push(tempStory);
        }
      }

      const ReadStoriesData = [];
      for (let i = 0; i < updatedArray.length; i++) {
        if (!updatedArray[i].showStoryCircle) {
          let tempStory = { ...updatedArray[i], priority: i + 1 };
          ReadStoriesData.push(tempStory);
        }
      }
      dispatch(
        updateLocalStoriesData({
          stories: { UnreadStoriesData, ReadStoriesData },
        })
      );
    }
  };
  const handleStoryStart = (index) => {
    if (index === stories.length - 1) {
      setStoryClose(true);
      if (fromFoodAndiPage === "fromFoodAndiPage") {
        setShowStoryCircle(false);
      }
    } else {
      setStoryClose(false);
    }
    dispatch(viewedStory(storiesData[index]._id));
  };
  let sortDataOnBasisOfStories = (inputArray) => {
    let len = inputArray.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (
          inputArray[j].stories[inputArray[j].stories.length - 1].createdAt <
          inputArray[j + 1].stories[inputArray[j + 1].stories.length - 1]
            .createdAt
        ) {
          let tmp = inputArray[j];
          inputArray[j] = inputArray[j + 1];
          inputArray[j + 1] = tmp;
        }
      }
    }
    return inputArray;
  };
  return (
    <div className={classes.storiesScreen}>
      <div className={storyClose && classes.storyCloser}>
        <div className={classes.storyCloserLeft}> </div>
        <div
          className={classes.storyCloserRight}
          onClick={() => {
            setShowStoriesModal(false);
          }}
        >
          {" "}
        </div>
      </div>
      <div
        className={classes.crossIcon}
        onClick={() => setShowStoriesModal(false)}
      >
        <CrossButton />
      </div>
      <Stories
        stories={stories}
        defaultInterval={10000000 * stories.length}
        onStoryStart={handleStoryStart}
        keyboardNavigation={true}
        height="100vh"
        onAllStoriesEnd={handleStoriesEnd}
        storyStyles={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default StoriesScreen;
