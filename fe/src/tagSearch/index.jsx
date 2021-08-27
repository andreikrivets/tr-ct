import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Box, Card, CardActionArea, Paper, Typography, Icon } from "@material-ui/core";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import uniqid from "uniqid";

import { withTranslation } from "react-i18next";
import { searchTagItems } from "../actions/tags";

const TagSearch = ({ items, fetchTagItems }) => {
  const history = useHistory();
  const { tagId } = useParams();
  useEffect(async () => {
    await fetchTagItems(tagId);
  }, []);
  if (!items) return null;
  const { Items, text } = items;
  if (!Items) return null;

  return (
    <Paper style={{ padding: "5%" }}>
      <Typography variant="h2" style={{ textAlign: "center" }}>
        <Icon color="primary">
          <LocalOfferOutlinedIcon />{" "}
        </Icon>
        {text}
      </Typography>
      <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {Items.map((item) => (
          <Card key={uniqid()} style={{ width: "50%", margin: "1%" }}>
            <CardActionArea
              onClick={() => history.push(`/item/${item.id}`)}
              style={{ padding: "1%" }}
            >
              <Typography color="textPrimary" style={{ padding: "1%" }} variant="subtitle1">
                {item.Name}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  items: state.tags.items,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTagItems: (id) => dispatch(searchTagItems(id)),
});

const TagSearchConnected = connect(mapStateToProps, mapDispatchToProps)(TagSearch);
export default withTranslation("tagSearch")(TagSearchConnected);
