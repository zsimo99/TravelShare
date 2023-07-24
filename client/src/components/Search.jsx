import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="max-w-2xl relative mx-auto">
      <input
        type="text"
        id="searchInput"
        placeholder="What place do you want to visit"
        className="w-[calc(100%-3.5rem)] font-semibold py-2 pl-2 text-lg rounded-l-md outline-none bg-transparent border-2 border-b-4 border-secondary-100"
      />
      <button className="absolute text-xl right-0 top-1/2 -translate-y-1/2 text-white bg-secondary-100 h-full w-14 flex items-center justify-center rounded-r-full">
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
