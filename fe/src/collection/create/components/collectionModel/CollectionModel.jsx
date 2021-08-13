import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { TextField, Box, Chip, Select, Typography, IconButton } from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";

import SaveIcon from "@material-ui/icons/Save";
import uniqid from "uniqid";

import getIcon from "./getIcon";

const CollectionModel = ({ t, additionalTags, setAdditionalTags }) => {
  const theme = useTheme();
  const { primary, secondary, info, success } = theme.palette;
  const colors = [primary.main, secondary.main, info.main, success.main];
  const [val, setVal] = useState({ type: 0 });
  const [colName, setColName] = useState("");
  const addCols = ["text", "line", "boolean", "date"];
  const cols = ["id", "name", "tags"];

  const handleChange = (e) => {
    setVal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveTag = () => {
    const current = addCols[val.type];
    if (!colName || (additionalTags[current] && additionalTags[current].includes(colName))) return;
    if (!additionalTags[current]) setAdditionalTags((prev) => ({ ...prev, [current]: [colName] }));
    else if (additionalTags[current].length < 3)
      setAdditionalTags((prev) => ({ ...prev, [current]: [...prev[current], colName] }));
    setColName("");
  };

  const handleDelete = (text, v) => {
    const current = addCols[v];
    setAdditionalTags((prev) => ({
      ...prev,
      [current]: additionalTags[current].filter((el) => el !== text),
    }));
  };

  return (
    <>
      <Box>
        <Typography>{`${t("fields.header1")}: `}</Typography>
        {cols.map((el) => (
          <Chip key={uniqid()} label={`${t(`fields.${el}`)}`} />
        ))}
        {addCols.map((el, i) => {
          return additionalTags[el]
            ? additionalTags[el].map((text) => {
                return (
                  <Chip
                    label={text}
                    key={uniqid()}
                    icon={getIcon(i)}
                    color="primary"
                    style={{ color: "#fff", backgroundColor: `${colors[i]}` }}
                    onDelete={() => handleDelete(text, i)}
                  />
                );
              })
            : null;
        })}
      </Box>
      <Typography>{`${t("fields.add")}:`}</Typography>
      <Box display="flex" alignContent="center">
        <Select
          native
          value={val.type}
          onChange={handleChange}
          inputProps={{
            name: "type",
            id: "age-native-simple",
          }}
        >
          {addCols.map((el, i) => (
            <option key={uniqid()} value={i}>
              {t(`fields.${el}`)}
            </option>
          ))}
        </Select>
        <TextField
          id="standard-basic"
          label={`${t("fields.ph")}`}
          value={colName}
          onChange={(e) => setColName(e.target.value)}
        />
        <IconButton onClick={handleSaveTag} color="secondary">
          <SaveIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default withTranslation("collection")(CollectionModel);
