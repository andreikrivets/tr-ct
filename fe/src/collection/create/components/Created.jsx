import React from "react";
import { connect } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { withTranslation } from "react-i18next";

import { closeModal } from "../../../actions/app";

const Created = (props) => {
  const { t, closeModalWindow } = props;
  return (
    <>
      <Typography variant="h1">{t("form.created.title")}</Typography>
      <Button variant="outlined" color="secondary" onClick={() => closeModalWindow()}>
        {t("form.created.btn")}
      </Button>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeModalWindow: () => dispatch(closeModal()),
});

const ConnectedCreated = connect(null, mapDispatchToProps)(Created);
export default withTranslation("collection")(ConnectedCreated);
