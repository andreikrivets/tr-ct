import React from "react";
import { Avatar, Button, CssBaseline, TextField, Typography, Container } from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik } from "formik";
import { withTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import validator from "./validator";

const Login = (props) => {
  const { t, login, isLoading } = props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar>
          {isLoading ? <Skeleton circle height={50} width={50} /> : <LockOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLoading ? <Skeleton /> : t("form.header")}
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(v) => validator(v, t)}
          onSubmit={(values, { setSubmitting }) => {
            login(values);
            setSubmitting(false);
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
      </div>
    </Container>
  );
};

export default withTranslation("login")(Login);
