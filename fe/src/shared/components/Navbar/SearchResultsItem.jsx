import React from "react";
import { Typography, Card, CardActionArea, Divider } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";

const SearchResultsItem = ({ q, data }) => {
  const history = useHistory();
  const handleOpenItem = () => {
    history.push(`/item/${data.id}`);
  };
  return (
    <Card style={{ margin: "20px", width: "50%" }}>
      <CardActionArea
        style={{ paddingLeft: "5%", display: "flex", justifyContent: "start" }}
        onClick={handleOpenItem}
      >
        <Typography variant="body1">{data.id}</Typography>
        <Divider style={{ margin: "0 5%" }} orientation="vertical" flexItem />
        <ReactMarkdown variant="h5">{data.Name.replace(`${q}`, `**${q}**`)}</ReactMarkdown>
      </CardActionArea>
    </Card>
  );
};

export default SearchResultsItem;
