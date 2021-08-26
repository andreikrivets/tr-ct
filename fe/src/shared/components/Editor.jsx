import React, { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import { withTranslation } from "react-i18next";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Editor = (props) => {
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
        // maxEditorHeight={160}
        // maxPreviewHeight={160}
        l18n={{ write: `${t("write")}`, preview: `${t("preview")}` }}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
      />
    </div>
  );
};

export default withTranslation("editor")(Editor);
