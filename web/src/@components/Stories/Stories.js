import React from "react";

import { AddStory, Story } from "./components";

const Stories = () => {
  return (
    <div className="flex flex-col w-full  mt-8">
      <p className="text-gray-700 font-sans font-bold text-lg ">Stories</p>
      <div className="flex flex-row items-center mt-3 overflow-scroll overflow-y-hidden no-scrollbar">
        <AddStory />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    </div>
  );
};

export default Stories;
