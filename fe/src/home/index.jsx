import {
  TableContainer,
  Box,
  Chip,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import uniqid from "uniqid";
import { withTranslation } from "react-i18next";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import { useHistory } from "react-router-dom";

import SingleItem from "../shared/components/SingleItem";
import { fetchLastItems } from "../actions/item";
import CircularProgressBar from "../shared/components/CircularProgressBar";

const HomePage = (props) => {
  const { t, fetchInitialItems, items, tags, isLoading } = props;
  const history = useHistory();
  useEffect(async () => {
    await fetchInitialItems();
  }, []);
  if (!items || isLoading) return <CircularProgressBar />;
  return (
    <>
      <Typography variant="h3" style={{ margin: "2%" }}>
        {t("lastItems")}
      </Typography>
      <TableContainer
        component={Box}
        style={{ marginTop: "3%", marginBottom: "3%", display: "flex", justifyContent: "center" }}
      >
        <Table style={{ width: "98%" }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>{t("tableHeaders.id")}</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>{t("tableHeaders.item")}</TableCell>
              {/* <TableCell style={{ fontWeight: "bold" }}>{t("tableHeaders.tags")}</TableCell> */}
              <TableCell style={{ fontWeight: "bold" }}>{t("tableHeaders.collection")}</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>{t("tableHeaders.owner")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <SingleItem key={uniqid()} data={item} additionalKeys={[]} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={{ padding: "3%", display: "flex", justifyContent: "space-evenly" }}>
        {tags.map((tag) => (
          <Chip
            key={uniqid()}
            icon={<LocalOfferOutlinedIcon />}
            component="a"
            onClick={() => history.push(`/tag/${tag.TagId}`)}
            variant="outlined"
            clickable
            label={`${tag.text}`}
          />
        ))}
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  items: state.item.lastItems,
  tags: state.item.lastTags,
  isLoading: state.item.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialItems: () => dispatch(fetchLastItems()),
});

const HomePageConnected = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default withTranslation("main")(HomePageConnected);
