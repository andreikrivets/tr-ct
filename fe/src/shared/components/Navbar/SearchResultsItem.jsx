import React from "react";
import { Typography, Card, CardActionArea } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";

const SearchResultsItem = ({ q, data }) => {
  const history = useHistory();
  const handleOpenItem = () => {
    history.push(`/item/${data.id}`);
  };
  return (
    <Card style={{ margin: "20px" }}>
      <CardActionArea onClick={handleOpenItem}>
        <ReactMarkdown variant="h5">{data.Name.replace(`${q}`, `**${q}**`)}</ReactMarkdown>
        <Typography variant="body1">{data.id}</Typography>
      </CardActionArea>
    </Card>
  );
};

export default SearchResultsItem;
