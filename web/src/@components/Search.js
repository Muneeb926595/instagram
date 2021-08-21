import React from "react";

import { Icon, Clickable } from "@components";

const Search = () => {
  return (
    <div className="w-full pt-4 pb-2 px-6">
      <form className="flex w-full rounded-full bg-gray-100 px-2 pr-4 items-center ">
        <input
          placeholder="Search..."
          className="w-full  bg-gray-100 rounded-full  py-2 px-2 font-sans outline-none"
        />
        <Clickable>
          <Icon type="search" size="20px" />
        </Clickable>
      </form>
    </div>
  );
};

export default Search;
