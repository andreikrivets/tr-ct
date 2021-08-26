import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Container,
} from "@material-ui/core/";
import { withTranslation } from "react-i18next";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik } from "formik";
import Skeleton from "react-loading-skeleton";

import validator from "./validators";

const Register = (props) => {
  const { t, register, isLoading } = props;
  return (
    <Container component="main" maxWidth="xl">
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
            register(values);
            setSubmitting(false);
          }}
        >
          {({ handleChange, touched, submitForm, errors, isSubmitting, validateForm }) => {
            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitForm(e);
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label={t("form.firstName")}
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label={t("form.lastName")}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.email && touched.email}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label={t("form.email")}
                      onChange={handleChange}
                      helperText={errors.email && touched.email ? errors.email : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label={t("form.pw")}
                      type="password"
                      id="password"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  onClick={() => validateForm()}
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  {t("form.button")}
                </Button>
                <Grid container justifyContent="flex-end" />
              </form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default withTranslation("register")(Register);
