import React, {useContext} from "react";
import "../styles/SearchBox.css";
import DataAreaContext from "../utils/DataAreaContext"

const SearchBox = () => {

  const context = useContext(DataAreaContext);


  return (
    <div className="searchbox">
      <form className="form-inline">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => context.handleSearchChange(e)}
        />
      </form>
    </div>
  );
}
export default SearchBox;
