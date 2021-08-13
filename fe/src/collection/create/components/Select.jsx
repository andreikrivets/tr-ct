import React from "react";
import { FormControl, Select, InputLabel } from "@material-ui/core";
import { withTranslation } from "react-i18next";

const Selector = (props) => {
  const { value, setFieldValue, t } = props;
  return (
    <FormControl required>
      <InputLabel htmlFor="age-native-required">{t("categories.placeholder")}</InputLabel>
      <Select
        native
        id="title"
        value={value}
        onChange={(e) => setFieldValue("category", e.target.value)}
        inputProps={{
          name: "val",
          id: "val",
        }}
      >
        <option aria-label="None" value="" />
        <option value="postcards">{t("categories.postcards")}</option>
        <option value="stamps">{t("categories.stamps")}</option>
        <option value="envelopes">{t("categories.envelopes")}</option>
      </Select>
    </FormControl>
  );
};

export default withTranslation("collection")(Selector);
