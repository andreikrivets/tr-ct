import React from "react";
import { Avatar, Button, CssBaseline, TextField, Typography, Container } from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik } from "formik";
import { withTranslation } from "react-i18next";

const Login = (props) => {
  const { t } = props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("form.header")}
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = `${t("form.email-error")}`;
            }
            return errors;
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("form.email")}
                onChange={handleChange}
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                value={values.password}
              />
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
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
