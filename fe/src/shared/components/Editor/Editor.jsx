import React, { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import { withTranslation } from "react-i18next";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Editor = (props) => {
  const theme = useTheme();
  const useStyles = makeStyles({
    editor: {
      backgroundColor: `${theme.palette.background.paper}!important`,
      color: `${theme.palette.text.primary}!important`,
    },
  });

  const classes = useStyles();
  const { value, field, setFieldValue, t } = props;
  const [selectedTab, setSelectedTab] = useState("write");
  const commands = ["header", "bold", "italic", "strikethrough"];
  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={(e) => setFieldValue(field || "description", e)}
        textAreaProps={{ autoFocus: true }}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        toolbarCommands={[commands]}
        classes={{
          reactMde: classes.editor,
          toolbar: classes.editor,
          mdeTabs: classes.editor,
          preview: classes.editor,
          textArea: classes.editor,
        }}
        // maxEditorHeight={160}
        // maxPreviewHeight={160}
        l18n={{ write: `${t("write")}`, preview: `${t("preview")}` }}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
      />
    </div>
  );
};

export default withTranslation("editor")(Editor);
