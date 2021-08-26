import React, { useState, useEffect } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../../actions/auth";

const ErrorSnackbar = (props) => {
  const { error } = props;
  const [open, setOpen] = useState(false);
  const history = useHistory();
  console.log(error);
  useEffect(() => {
    if (error[0]) {
      setOpen(() => true);
      // if (error.status === 404) {
      //   history.push("/user");
      // }
      if (error[0].status === 404) {
        // handleLogOut();
        history.goBack();
      }
    }
  }, [error]);

  if (!error.length) return null;
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      message={error[0].message}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

const mapStateToProps = (state) => {
  // const { auth, app, profile, collection, tags, item } = state;
  const errors = Object.keys(state)
    .map((key) => state[key].error)
    .filter((error) => error && error.message && error.status);
  return {
    error: errors,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(logOut()),
});

const ErrorSnackbarConnected = connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);
export default ErrorSnackbarConnected;
