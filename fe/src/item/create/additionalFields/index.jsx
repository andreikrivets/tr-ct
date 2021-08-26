import React from "react";
import { withTranslation } from "react-i18next";
import TextFields from "./TextFields";
import DateFields from "./DateFields";
import BooleanFields from "./BooleanFields";

const AdditionalFields = (props) => {
  const { additionalValues, setFieldValue, handleChange, values } = props;
  const keys = Object.keys(additionalValues);
  const text = keys.filter((key) => key.startsWith("addText"));
  const date = keys.filter((key) => key.startsWith("addDate"));
  // const line = keys.filter((key) => key.startsWith("addLine"));
  const bool = keys.filter((key) => key.startsWith("addBool"));
  return (
    <>
      <TextFields setFieldValue={setFieldValue} values={values} text={text} />
      <DateFields
        date={date}
        values={values}
        handleChange={handleChange}
        additionalValues={additionalValues}
      />
      <BooleanFields
        bool={bool}
        values={values}
        handleChange={handleChange}
        additionalValues={additionalValues}
      />
    </>
  );
};

export default withTranslation("collection")(AdditionalFields);
