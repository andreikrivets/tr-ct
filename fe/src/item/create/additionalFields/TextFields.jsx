import React from "react";

import Editor from "../../../shared/components/Editor";

const TextFields = (props) => {
  const { setFieldValue, values, text } = props;
  const textFields = (length) => {
    switch (length) {
      case 1:
        return <Editor value={values.addText1} setFieldValue={setFieldValue} field="addText1" />;
      case 2:
        return (
          <>
            <Editor value={values.addText1} setFieldValue={setFieldValue} field="addText1" />
            <Editor value={values.addText2} setFieldValue={setFieldValue} field="addText2" />
          </>
        );
      case 3:
        return (
          <>
            <Editor value={values.addText1} setFieldValue={setFieldValue} field="addText1" />
            <Editor value={values.addText2} setFieldValue={setFieldValue} field="addText2" />
            <Editor value={values.addText3} setFieldValue={setFieldValue} field="addText3" />
          </>
        );
      default:
        return null;
    }
  };
  return <>{text && textFields(text.length)}</>;
};

export default TextFields;
