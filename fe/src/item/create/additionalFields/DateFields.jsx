import React from "react";
import uniqid from "uniqid";
import { Box, TextField } from "@material-ui/core";

const DateFields = (props) => {
  const { date, values, handleChange, additionalValues } = props;
  const currentDate = new Date(Date.now()).toISOString();

  return (
    <Box style={{ marginTop: "2%", display: "flex", justifyContent: "space-evenly" }}>
      {date.map((field) => (
        <TextField
          key={uniqid()}
          label={additionalValues[field]}
          type="date"
          value={values[field] || currentDate.slice(0, 10)}
          InputLabelProps={{
            shrink: true,
          }}
          name={field}
          onChange={handleChange}
        />
      ))}
    </Box>
  );
};

export default DateFields;
