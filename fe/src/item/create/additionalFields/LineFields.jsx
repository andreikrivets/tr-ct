import React from "react";
import { TextField } from "@material-ui/core";
import { withTranslation } from "react-i18next";

const LineField = ({ av, f, field: { onChange, value } }) => {
  return (
    <TextField
      margin="normal"
      id={f}
      name={f}
      inputProps={{ maxLength: 40 }}
      label={av[f]}
      value={value[f]}
      onChange={onChange}
    />
  );
};

const TitleField = ({ t, field: { onChange, value } }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="title"
      name="title"
      inputProps={{ maxLength: 40 }}
      label={t("itemName")}
      onChange={onChange}
      value={value.title}
    />
  );
};

const TranslatedTitleField = withTranslation("items")(TitleField);
export { TranslatedTitleField as TitleField, LineField };
