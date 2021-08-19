import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import userPlaceholder from "assets/icons/user-placeholder.png";
import { formateImageUrl } from "@helpers/formateImageUrl";
import { Clickable, CustomModal, StoriesScreen } from "@components";
import { getLastPostDuration } from "@helpers/timeDateUtils";

const Story = ({
  userId,
  storyId,
  userImage,
  userName,
  userStories,
  storyCircle,
}) => {
  const history = useHistory();
  const [imageHasHttp, setImageHasHttp] = useState(false);
  const [filteredStories, setFilteredStories] = useState();
  const [showStoriesModal, setShowStoriesModal] = useState(false);

  useEffect(() => {
    const tempStories = [];
    userStories.map((story) =>
      tempStories.push({
        url: story.video
          ? process.env.REACT_APP_API_BASE_URL + story.video
          : process.env.REACT_APP_API_BASE_URL + story.image,
        // duration: 3000,
        type: story.video ? "video" : "image",
        header: {
          heading: userName,
          subheading: getLastPostDuration(story.createdAt),
          profileImage: userImage
            ? imageHasHttp
              ? userImage
              : formateImageUrl(userImage)
            : userPlaceholder,
        },
      })
    );
    setFilteredStories(tempStories);
  }, [userStories, imageHasHttp, userImage, userName]);

  useEffect(() => {
    if (userImage && userImage !== "undefined") {
      const prefix = userImage.toString().split("/")[0];
      if (prefix === "images") {
        setImageHasHttp(false);
      } else {
        setImageHasHttp(true);
      }
    }
  }, [userImage]);

  return (
    <>
      <div
        className="rounded-lg mr-4 flex-shrink-0 flex-grow flex-nowrap  "
        onClick={() => setShowStoriesModal(true)}
        style={{
          maxWidth: "9rem",
          minWidth: "9rem",
          height: "22vh",
          position: "relative",
          backgroundImage: `url(${
            userImage
              ? imageHasHttp
                ? userImage
                : formateImageUrl(userImage)
              : userPlaceholder
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="rounded-lg "
          style={{
            background:
              "linear-gradient(140deg, rgba(228, 62, 104, 0.6) 0%,  rgba(250, 164, 73, 0.6) 100%)",
            height: "100%",
            position: "absolute",
            top: "0",
            lef: "0",
            right: "0",
            bottom: "0",
            width: "100%",
          }}
        >
          <Clickable
            onClick={() =>
              history.push({
                pathname: "/profile",
                state: { userId },
              })
            }
          >
            <p className="px-2 py-2 text-white font-sans font-semibold">
              {userName}
            </p>
          </Clickable>
        </div>
      </div>
      <CustomModal
        onCloseModal={() => setShowStoriesModal(false)}
        showModal={showStoriesModal}
        veryDark
      >
        <StoriesScreen
          storyId={storyId}
          stories={filteredStories}
          storiesData={userStories}
          setShowStoriesModal={setShowStoriesModal}
        />
      </CustomModal>
    </>
  );
};

export default Story;
