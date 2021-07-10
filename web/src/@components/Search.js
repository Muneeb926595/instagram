import React from "react";

import { Icon } from "@components";

const Search = () => {
  return (
    <form className="flex flex-row items-center px-4  rounded-lg bg-gray-100">
      <Icon type="search" size="24px" marg="0 1rem 0 0" />
      <input
        className="font-sans bg-gray-100 py-3 pr-12 h-full outline-none"
        type="text"
        placeholder="Search"
      />
    </form>
  );
};

export default Search;
