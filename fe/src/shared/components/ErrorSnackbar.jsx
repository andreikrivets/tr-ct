import React, { useState, useEffect } from "react";
import { Paper, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/auth.hook";

const ErrorSnackbar = (props) => {
  const { error } = props;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const { checkIfExpired } = useAuth();
  useEffect(() => {
    checkIfExpired();
    // console.log(checkIfExpired());
    if (error[0]) {
      setOpen(() => true);
      setMessage(message === error[0].message ? null : error[0].message);
      // if (error.status === 404) {
      //   history.push("/user");
      // }
      if (error[0].status === 404) {
        history.goBack();
      }
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    setMessage(null);
  };
  if (!error.length || !message) return null;
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <Paper>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>
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

const ErrorSnackbarConnected = connect(mapStateToProps, null)(ErrorSnackbar);
export default ErrorSnackbarConnected;
