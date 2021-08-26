import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import CreatableSelect from "react-select/creatable";
import { connect } from "react-redux";

import Skeleton from "react-loading-skeleton";

import { fetchTags } from "../../actions/tags";

const createTag = (id, val) => ({
  value: id,
  label: val.toLowerCase().replace(/\W/g, ""),
});

const TagSelect = (props) => {
  const { t, fetchAllTags, tags, val, setVal, isLoading, setNewTags } = props;
  const [opts, setOpts] = useState([]);
  useEffect(async () => {
    await fetchAllTags();
  }, []);
  useEffect(() => {
    setOpts(tags[0] ? tags.map((tag) => createTag(tag.TagId, tag.text)) : []);
  }, [tags]);
  // console.log()
  const handleCreateTag = (v) => {
    if (val.length <= 3) {
      const newOption = createTag(opts.length + 1, v);
      setOpts((prev) => [...prev, newOption]);
      setVal((prev) => [...prev, newOption]);
      setNewTags((prev) => [...prev, newOption]);
    }
  };

  const handleTagChange = (newVal) => {
    if (val.length <= 3) setVal(newVal);
  };
  if (!tags) return <Skeleton />;
  return (
    <>
      <CreatableSelect
        placeholder={`${t("tags")}`}
        isMulti
        maxMenuHeight={150}
        isLoading={isLoading}
        onChange={handleTagChange}
        value={val}
        onCreateOption={handleCreateTag}
        options={opts}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllTags: () => dispatch(fetchTags()),
});

const mapStateToProps = (state) => ({
  tags: state.tags.data,
  isLoading: state.tags.loading,
});

const TagSelectConnected = connect(mapStateToProps, mapDispatchToProps)(TagSelect);
export default withTranslation("items")(TagSelectConnected);
