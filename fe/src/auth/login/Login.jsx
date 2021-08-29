import React, { useRef } from "react";
import { Avatar, Button, CssBaseline, TextField, Typography, Container } from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik } from "formik";
import { withTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import validator from "./validator";

const Login = (props) => {
  const { t, login, isLoading, closeModalWindow, authError } = props;
  const errorRef = useRef("");
  if (authError) {
    if (authError.message) errorRef.current = authError.message;
  } else errorRef.current = "";
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="avatar-wrapper">
        <Avatar style={{ width: "150px", height: "150px" }}>
          {isLoading ? <Skeleton circle height={150} width={150} /> : <LockOutlinedIcon />}
        </Avatar>
      </div>
      <Typography variant="h5">{isLoading ? <Skeleton /> : t("form.header")}</Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(v) => validator(v, t)}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          await login(values);
          if (!errorRef.current) {
            resetForm();
            setSubmitting(false);
            closeModalWindow();
          }
        }}
      >
        {({ values, errors, touched, handleChange, validateForm, submitForm, isSubmitting }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm(e);
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("form.email")}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? `${t("form.emailError")}` : ""}
              onChange={handleChange}
              value={values.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={t("form.pw")}
              type="password"
              id="password"
              onChange={handleChange}
              value={values.password}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              onClick={() => validateForm()}
            >
              {t("form.button")}
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default withTranslation("login")(Login);
