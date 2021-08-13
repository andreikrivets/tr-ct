import React from "react";
import { withTranslation } from "react-i18next";
import Upload from "rc-upload";

import { useTheme } from "@material-ui/core/styles";

const Dropzone = (props) => {
  const { t } = props;
  const theme = useTheme();
  const color = theme.palette.primary.light;

  const handleUpload = async () => {};
  return (
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
      customRequest={handleUpload}
    >
      {t("form.img")}
    </Upload>
  );
};

export default withTranslation("collection")(Dropzone);
