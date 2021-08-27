/* eslint-disable no-unused-vars */
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
  Box,
} from "@material-ui/core";
import { Formik } from "formik";
import QueueOutlinedIcon from "@material-ui/icons/QueueOutlined";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Skeleton from "react-loading-skeleton";

import { useParams, useRouteMatch } from "react-router-dom";
import Dropzone from "./components/dropzone/Dropzone";
import Editor from "../../shared/components/Editor";
import Selector from "./components/Select";
import CollectionModel from "./components/collectionModel/CollectionModel";
import submitFile from "./api/submitFile";
import Created from "./components/Created";

const CreateCollection = (props) => {
  const isRoute = useRouteMatch("/edit/collection/:collectionId");
  const { collectionId } = useParams();
  const { t, submitCollectionForm, isLoading, collections, updateCollectionForm } = props;
  const [additionalFields, setAdditionalFields] = useState({ image: false });
  const [file, setFile] = useState({});
  let initialVal;
  let additional;

  if (isRoute) {
    const { isExact } = isRoute;
    if (isExact) {
      const currentCollection = collections.filter((collection) => collection.id === +collectionId);
      if (currentCollection[0]) {
        const { Name: title, Description: description, Type: category } = currentCollection[0];
        initialVal = { title, description, category };
        additional = Object.keys(currentCollection[0])
          .filter((key) => key.startsWith("add") && currentCollection[0][key])
          .reduce((acc, key) => {
            const formatted = key.slice(3, key.length - 1).toLowerCase();
            if (acc[formatted]) {
              if (currentCollection[0][key]) {
                acc[formatted].push(currentCollection[0][key]);
              }
            } else acc[formatted] = [currentCollection[0][key]];
            return acc;
          }, {});
      }
    }
  }

  const [additionalTags, setAdditionalTags] = useState(additional || {});
  return (
    <Container component="main" maxWidth="lg">
      <Box
        style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5%" }}
      >
        <Avatar style={{ width: "100px", height: "100px" }}>
          {isLoading ? <Skeleton circle height={50} width={50} /> : <QueueOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLoading ? <Skeleton /> : t(initialVal ? "editHeader" : "header")}
        </Typography>
      </Box>
      <Formik
        initialValues={initialVal || { title: "", description: "", category: "" }}
        onSubmit={async (values) => {
          if (additionalFields.image && file) {
            const imagePostStatus = await submitFile(file);
            if (imagePostStatus.ok) {
              const json = await imagePostStatus.json();
              const imageUrl = json.url;
              if (initialVal) {
                await updateCollectionForm({ values, additionalTags, imageUrl, collectionId });
              } else {
                await submitCollectionForm({ values, additionalTags, imageUrl });
              }
            } else throw new Error("failed");
          } else if (initialVal) {
            await updateCollectionForm({ values, additionalTags, collectionId });
          } else {
            await submitCollectionForm({ values, additionalTags });
          }
        }}
      >
        {({ values, handleChange, validateForm, setFieldValue, submitForm }) => {
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
                    inputProps={{ maxLength: 40 }}
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
              {additionalFields.image ? <Dropzone setFile={setFile} /> : null}
              <Editor value={values.description} setFieldValue={setFieldValue} />
              <Divider style={{ margin: "20px" }} />
              <Typography variant="caption">{t("fields.model")}</Typography>
              <CollectionModel
                additionalTags={additionalTags}
                setAdditionalTags={setAdditionalTags}
              />
              <Divider style={{ margin: "20px" }} />
              <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                color="primary"
                onClick={() => validateForm()}
              >
                {t(initialVal ? "form.editButton" : "form.button")}
              </Button>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default withTranslation("collection")(CreateCollection);
