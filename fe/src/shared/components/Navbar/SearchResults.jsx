import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { InputBase, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import uniqid from "uniqid";
import SearchIcon from "@material-ui/icons/Search";

import { withTranslation } from "react-i18next";
import searchItem from "../../../actions/search";
import SearchResultsItem from "./SearchResultsItem";

const SearchResults = ({ t, q, data, isLoading, sendSearch }) => {
  const [searchVal, setSearchVal] = useState(q);
  if (isLoading) return <Skeleton />;

  const handleSearchResults = () => {
    if (!searchVal && !searchVal.trim()) return;
    sendSearch(searchVal);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <InputBase
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder={`${t("search")}`}
          inputProps={{ "aria-label": "search", maxLength: 20 }}
        />
        <IconButton onClick={handleSearchResults}>
          <SearchIcon />
        </IconButton>
      </div>
      {!data.length ? (
        <p>No results</p>
      ) : (
        data.map((result) => <SearchResultsItem key={uniqid()} data={result} q={q} />)
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.search.result,
  isLoading: state.search.loading,
});

const mapDispatchToProps = (dispatch) => ({
  sendSearch: (query) => dispatch(searchItem(query)),
});

const SearchResultsConnected = connect(mapStateToProps, mapDispatchToProps)(SearchResults);
export default withTranslation("navbar")(SearchResultsConnected);
