import React from "react";
import uniqid from "uniqid";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const BooleanFields = (props) => {
  const { bool, values, handleChange, additionalValues } = props;
  return (
    <>
      {bool.map((field) => (
        <FormControlLabel
          key={uniqid()}
          control={<Checkbox checked={!!values[field]} onChange={handleChange} name={field} />}
          label={additionalValues[field]}
        />
      ))}
    </>
  );
};

export default BooleanFields;
