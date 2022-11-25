import React from "react";

const SearchFilter = ({ filterValue, setFilterValue }) => {
  return (
    <div>
      <label>
        filter shown with{" "}
        <input type="text" value={filterValue} onChange={setFilterValue} />
      </label>
    </div>
  );
};

export default SearchFilter;
