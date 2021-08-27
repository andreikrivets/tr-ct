import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import CreateItem from "../create";
import { getItem } from "../../actions/item";

const EditItem = ({ item, fetchItem }) => {
  const { itemId } = useParams();
  useEffect(async () => {
    await fetchItem(itemId);
  }, []);

  useEffect(() => {}, [item]);

  if (!item.id) return <CircularProgress />;
  return (
    <>
      <CreateItem data={item.Collection} content={item} />
    </>
  );
};

const mapStateToProps = (state) => ({
  item: state.item.data,
});
const mapDispatchToProps = (dispatch) => ({
  fetchItem: (id) => dispatch(getItem(id)),
});

const EditItemConnected = connect(mapStateToProps, mapDispatchToProps)(EditItem);
export default EditItemConnected;
