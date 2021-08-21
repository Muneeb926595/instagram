import React, { useState } from "react";
import { debounce } from "debounce";
import { useDispatch } from "react-redux";

import { Icon, SearchResult } from "@components";
import { searchUser } from "@store/search/SearchActions";

const Search = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const requestSearch = (value) => {
    dispatch(searchUser(value));
  };
  const doDebouncedAction = (event) => {
    if (!showModal) {
      setShowModal(true);
    }
    setSearchText(event.target.value);
    debounce(requestSearch(event.target.value), 1000);
  };
  return (
    <>
      <form
        className="flex flex-row items-center px-4  rounded-lg bg-gray-100"
        style={{ position: "relative" }}
        onClick={() => setShowModal(true)}
      >
        <Icon type="search" size="24px" marg="0 1rem 0 0" />
        <input
          value={searchText}
          onChange={doDebouncedAction}
          className="font-sans bg-gray-100 py-3 pr-12 h-full outline-none "
          type="text"
          placeholder="Search"
        />
      </form>
      {showModal && <SearchResult closeModal={handleCloseModal} />}
    </>
  );
};

export default Search;
