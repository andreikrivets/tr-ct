import {
  Typography,
  Divider,
  Box,
  Checkbox,
  CircularProgress,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Chip,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import uniqid from "uniqid";

import Skeleton from "react-loading-skeleton";
import { getItem } from "../../actions/item";

const ViewItem = (props) => {
  const { id, isLoading, fetchItemData, fetchedItemData } = props;
  const { itemId } = useParams();
  useEffect(async () => {
    await fetchItemData(itemId || id);
  }, []);

  useEffect(() => {}, [fetchedItemData]);
  if (!fetchedItemData) return <CircularProgress />;

  const additionalHeaders = Object.keys(fetchedItemData).filter(
    (key) => key.startsWith("add") && fetchedItemData[key]
  );

  const { Name, createdAt, Tags } = fetchedItemData;
  const getElement = (field) => {
    if (field.startsWith("addText")) return <ReactMarkdown>{fetchedItemData[field]}</ReactMarkdown>;
    if (field.startsWith("addBool")) return <Checkbox checked={!!fetchedItemData[field]} />;
    return <Typography variant="body1">{fetchedItemData[field]}</Typography>;
  };
  const date = new Date(createdAt).toLocaleDateString();
  return (
    <div>
      <Typography variant="h2">{isLoading ? <Skeleton width={100} /> : Name}</Typography>
      {isLoading ? <Skeleton width={100} /> : <Typography variant="body1">{date}</Typography>}
      {Tags && Tags.map((tag) => <Chip key={uniqid()} label={tag.text} />)}
      <TableContainer component={Box}>
        <Table>
          <TableBody>
            <TableRow style={{ width: "100%" }}>
              {additionalHeaders.map((field) => (
                <TableCell key={uniqid()} style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5" style={{ margin: "10px", width: "10%" }}>
                    {fetchedItemData[field]}
                  </Typography>
                  <Divider orientation="vertical" flexItem style={{ margin: "0 5%" }} />
                  {getElement(field)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fetchedItemData: state.item.data,
  isLoading: state.item.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemData: (id) => dispatch(getItem(id)),
});

const ViewItemConnected = connect(mapStateToProps, mapDispatchToProps)(ViewItem);
export default ViewItemConnected;
