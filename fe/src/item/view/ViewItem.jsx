import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Checkbox,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Chip,
} from "@material-ui/core";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import uniqid from "uniqid";

import Skeleton from "react-loading-skeleton";
import { getItem } from "../../actions/item";
import CircularProgressBar from "../../shared/components/CircularProgressBar";

const ViewItem = (props) => {
  const { id, isLoading, fetchItemData, fetchedItemData } = props;
  const { itemId } = useParams();
  useEffect(async () => {
    await fetchItemData(itemId || id);
  }, []);

  useEffect(() => {}, [fetchedItemData]);
  if (!fetchedItemData || isLoading) return <CircularProgressBar />;

  const additionalHeaders = Object.keys(fetchedItemData).filter(
    (key) => key.startsWith("add") && fetchedItemData[key]
  );

  const { Name, createdAt, Tags, Collection } = fetchedItemData;
  const getElement = (field) => {
    if (field.startsWith("addText")) return <ReactMarkdown>{fetchedItemData[field]}</ReactMarkdown>;
    if (field.startsWith("addBool")) return <Checkbox checked={!!fetchedItemData[field]} />;
    return <Typography variant="body1">{fetchedItemData[field]}</Typography>;
  };
  const date = new Date(createdAt).toLocaleDateString();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5%",
        textAlign: "center",
      }}
    >
      {isLoading ? (
        <Skeleton width={600} height={130} />
      ) : (
        <>
          <Typography variant="h2">{Name}</Typography>
          <Typography variant="body1">{date}</Typography>
          <div>
            {Tags &&
              Tags.map((tag) => (
                <Chip
                  key={uniqid()}
                  icon={<LocalOfferOutlinedIcon />}
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={`/tag/${tag.TagId}`}
                  label={`${tag.text}`}
                />
              ))}
          </div>
        </>
      )}
      <TableContainer component={Box}>
        <Table>
          <TableBody>
            {additionalHeaders.map((field) => (
              <TableRow key={uniqid()} style={{ display: "flex", width: "100%" }}>
                <TableCell style={{ display: "flex", alignItems: "center", width: "20%" }}>
                  <Typography variant="h4" style={{ margin: "10px", width: "20%" }}>
                    {Collection[field]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box style={{ height: "100%", display: "flex", alignItems: "center" }}>
                    {getElement(field)}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
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
