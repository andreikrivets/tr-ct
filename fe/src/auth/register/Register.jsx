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

const Register = (props) => {
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
          {({ handleSubmit, isSubmitting }) => (
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label={t("form.firstName")}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label={t("form.lastName")}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label={t("form.email")}
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
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
              >
                {t("form.button")}
              </Button>
              <Grid container justifyContent="flex-end" />
            </form>
          )}
        </Formik>
        ;
      </div>
    </Container>
  );
};

export default withTranslation("register")(Register);
