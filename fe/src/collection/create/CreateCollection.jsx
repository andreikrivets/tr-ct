import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import {
  TextField,
  Typography,
  Avatar,
  Container,
  Button,
  IconButton,
  Tooltip,
  Grid,
  Divider,
} from "@material-ui/core";
import { Formik } from "formik";
import QueueOutlinedIcon from "@material-ui/icons/QueueOutlined";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import Dropzone from "./Dropzone";
import Editor from "./Editor";
import Selector from "./components/Select";
import CollectionModel from "./components/collectionModel/CollectionModel";

const CreateCollection = (props) => {
  const { t } = props;
  const [additionalTags, setAdditionalTags] = useState({});
  const [additionalFields, setAdditionalFields] = useState({ image: false });

  return (
    <Container component="main" maxWidth="xl">
      <Avatar>
        <QueueOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("header")}
      </Typography>
      <Formik
        initialValues={{ title: "", description: "", category: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values, additionalTags);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, validateForm, setFieldValue, submitForm, isSubmitting }) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm(e);
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label={t("form.title")}
                    onChange={handleChange}
                    value={values.title}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Selector value={values.category} setFieldValue={setFieldValue} />
                </Grid>
              </Grid>
              <Tooltip title={`${t("form.img")}`}>
                <IconButton
                  size="small"
                  onClick={() => setAdditionalFields((prev) => ({ ...prev, image: !prev.image }))}
                >
                  {additionalFields.image ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              </Tooltip>
              {additionalFields.image ? <Dropzone /> : null}
              <Editor value={values.description} setFieldValue={setFieldValue} />
              <Divider style={{ margin: "20px" }} />
              <Typography variant="caption">{t("fields.model")}</Typography>
              <CollectionModel
                additionalTags={additionalTags}
                setAdditionalTags={setAdditionalTags}
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
          );
        }}
      </Formik>
    </Container>
  );
};

export default withTranslation("collection")(CreateCollection);
