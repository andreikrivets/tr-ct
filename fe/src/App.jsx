/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider, Paper, Modal, Snackbar, IconButton } from "@material-ui/core";
import { I18nextProvider } from "react-i18next";
import { connect } from "react-redux";
import i18n from "./shared/locales/i18n";

import { dark, light } from "./shared/theme";
import Login from "./auth/login";
import Register from "./auth/register";
import ErrorSnackbar from "./shared/components/ErrorSnackbar";

import { CreateCollection, ViewCollection } from "./collection";
import Navbar from "./shared/components/Navbar/Navbar";
import Profile from "./profile";
import { closeModal } from "./actions/app";
import CreateItem from "./item/create";
import ViewItem from "./item/view";
import HomePage from "./home";

import "./App.css";

const App = (props) => {
  const { modal, component, closeModalWindow, theme, lang } = props;
  const appliedTheme = createTheme(theme ? dark : light);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, []);
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={appliedTheme}>
        <Paper elevation={3}>
          <Router>
            {/* <Navbar themeSwitch={themeSwitch} checked={!!darkTheme} /> */}
            <Navbar />
            <Modal open={modal} onClose={() => closeModalWindow()}>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "5%",
                  padding: "5%",
                  overflow: "auto",
                  height: "100%",
                }}
              >
                {component}
              </div>
            </Modal>
            <ErrorSnackbar />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/user/:userId" exact>
                <Profile />
              </Route>
              <Route path="/collection/:collectionId" exact>
                <ViewCollection />
              </Route>
              <Route path="/edit/collection/:collectionId" exact>
                <CreateCollection />
              </Route>
              <Route path="/item/:itemId" exact>
                <ViewItem />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Router>
        </Paper>
      </ThemeProvider>
    </I18nextProvider>
  );
};

const mapStateToProps = (state) => {
  const { app, auth } = state;

  return {
    modal: app.modal,
    component: app.component,
    theme: app.theme,
    lang: app.lang,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeModalWindow: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
