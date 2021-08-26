import React from "react";
import uniqid from "uniqid";
import { TextField } from "@material-ui/core";

const DateFields = (props) => {
  const { date, values, handleChange, additionalValues } = props;
  const currentDate = new Date(Date.now()).toISOString();

  return (
    <>
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
    </>
  );
};

export default DateFields;
