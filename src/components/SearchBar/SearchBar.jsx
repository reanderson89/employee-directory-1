import React from "react";


const SearchBar = (props) => {
  return (
    //   search bar to filter employees
    <div className="create-form" style={{textAlign: "center"}}>
      <div className="input-group">
        <input
          type="text"
          className="form-control mb-3 mt-3"
          placeholder="Search Employee"
          aria-label="Search Employee"
          onChange={props.onChange}
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
                                                                                                                                                                                         