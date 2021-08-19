import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddStory, Story } from "./components";
import { getStories } from "@store/stories/StoriesActions";

const Stories = ({ otherUser }) => {
  const dispatch = useDispatch();

  const unReadStoriesData = useSelector(
    ({ Foodbook }) => Foodbook.stories.stories.UnreadStoriesData
  );
  const readStoriesData = useSelector(
    ({ Foodbook }) => Foodbook.stories.stories.ReadStoriesData
  );

  const [localUnReadStoriesData, setLocalUnReadStoriesData] =
    useState(unReadStoriesData);
  const [localReadStoriesData, setLocalReadStoriesData] =
    useState(readStoriesData);

  useEffect(() => {
    setLocalUnReadStoriesData(unReadStoriesData);
    setLocalReadStoriesData(readStoriesData);
  }, [unReadStoriesData, readStoriesData]);

  useEffect(() => {
    dispatch(getStories(localStorage.getItem("userId")));
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full  mt-8">
      <p className="text-gray-700 font-sans font-bold text-lg ">Stories</p>
      <div className="flex flex-row items-center mt-3 overflow-scroll overflow-y-hidden no-scrollbar">
        {!otherUser && <AddStory />}
        {localUnReadStoriesData &&
          localUnReadStoriesData.length > 0 &&
          localUnReadStoriesData.map((story) => {
            return (
              story.stories &&
              story.stories.length > 0 && (
                <Story
                  userId={story?._id}
                  storyId={story._id}
                  userImage={story.image}
                  userName={story.userName}
                  userStories={story.stories}
                  storyCircle={story.showStoryCircle}
                  key={story._id}
                />
              )
            );
          })}
        {localReadStoriesData &&
          localReadStoriesData.length > 0 &&
          localReadStoriesData.map((story) => {
            return (
              story.stories &&
              story.stories.length > 0 && (
                <Story
                  userId={story?._id}
                  storyId={story._id}
                  userImage={story.image}
                  userName={story.userName}
                  userStories={story.stories}
                  storyCircle={story.showStoryCircle}
                  key={story._id}
                />
              )
            );
          })}
      </div>
    </div>
  );
};

export default Stories;
