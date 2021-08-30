import React from "react";
import uniqid from "uniqid";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";

const BooleanFields = (props) => {
  const { bool, values, handleChange, additionalValues } = props;
  return (
    <Box style={{ marginTop: "3%", display: "flex", justifyContent: "space-evenly" }}>
      {bool.map((field) => (
        <FormControlLabel
          key={uniqid()}
          control={<Checkbox checked={!!values[field]} onChange={handleChange} name={field} />}
          label={additionalValues[field]}
        />
      ))}
    </Box>
  );
};

export default BooleanFields;
