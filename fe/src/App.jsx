import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme } from "@material-ui/core/styles";
import { Box, ThemeProvider, Paper, Modal } from "@material-ui/core";
import { I18nextProvider } from "react-i18next";
import { connect } from "react-redux";
import i18n from "./shared/locales/i18n";

import ErrorSnackbar from "./shared/components/ErrorSnackbar";
import Navbar from "./shared/components/Navbar/Navbar";
import { dark, light } from "./shared/theme";
import { closeModal } from "./actions/app";
import useRoutes from "./routes";

import "./App.css";

const App = (props) => {
  const { modal, component, closeModalWindow, theme, lang } = props;
  const appliedTheme = createTheme(theme ? dark : light);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, []);
  const routes = useRoutes();
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={appliedTheme}>
        <Paper elevation={3} style={{ paddingBottom: "5%" }}>
          <Box component={Paper} mx="15%" pb="1%">
          <Router>
            <Navbar />
            <Modal open={modal} onClose={() => closeModalWindow()}>
              <Paper
                style={{
                  margin: "5%",
                    padding: "2%",
                  overflow: "auto",
                    height: "90%",
                }}
              >
                {component}
              </Paper>
            </Modal>
            <ErrorSnackbar />
            {routes}
          </Router>
          </Box>
        </Paper>
      </ThemeProvider>
    </I18nextProvider>
  );
};

const mapStateToProps = (state) => {
  const { app } = state;
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
