import React, { useState } from "react";
import { Divider, InputBase, IconButton, Paper, Typography } from "@material-ui/core";
import Skeleton from "react-loading-skeleton";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import uniqid from "uniqid";

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
    <Paper style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
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
      <Divider style={{ width: "50%" }} />
      {!data.length ? (
        <Typography variant="subtitle1">{t("notfound")}</Typography>
      ) : (
        data.map((result) => <SearchResultsItem key={uniqid()} data={result} q={q} />)
      )}
    </Paper>
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
