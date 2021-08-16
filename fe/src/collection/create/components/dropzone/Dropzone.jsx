import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import Upload from "rc-upload";

import { useTheme } from "@material-ui/core/styles";

const Dropzone = (props) => {
  const { t, setFile } = props;
  const text = ["img", "imgUploadStarted", "imgUploadFinished", "imgUploadError"];
  const [formText, setFormText] = useState(`${t(`form.${text[0]}`)}`);
  const theme = useTheme();
  const color = theme.palette.primary.light;

  const handleUpload = async (h) => {
    const { file } = h;
    const imageReg = /[/.](gif|jpg|jpeg|tiff|png)$/i;
    if (!imageReg.test(file.type)) {
      setFile("");
      setFormText(`${t(`form.${text[3]}`)}`);
    } else {
      setFormText(`${t(`form.${text[2]}`)}`);
      setFile(h.file);
    }
  };

  return (
    <>
      <Upload
        style={{
          border: `1px solid ${color}`,
          borderRadius: "5px",
          display: "block",
          width: "100%",
          textAlign: "center",
          padding: "2rem 0",
          color: `${color}`,
          marginBottom: "10px",
        }}
        multiple={false}
        accept="image/*"
        customRequest={handleUpload}
      >
        {formText}
      </Upload>
    </>
  );
};

export default withTranslation("collection")(Dropzone);
