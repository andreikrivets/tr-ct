import { Typography, Grid, Divider, Button, CircularProgress } from "@material-ui/core";
import { Formik, Form, FastField, FieldArray } from "formik";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import AdditionalFields from "./additionalFields";
import TagSelect from "./TagSelect";
import { sendTags } from "../../actions/tags";
import { sendItem, updateItem } from "../../actions/item";

import { LineField, TitleField } from "./additionalFields/LineFields";

const CreateItem = (props) => {
  const { t, sendNewTags, data, sendNewItem, content, updateItemData, isLoading } = props;
  const initialTags = content
    ? content.Tags.map((tag) => ({ value: tag.TagId, label: tag.text }))
    : [];
  const [tags, setTags] = useState(initialTags);
  const [newTags, setNewTags] = useState([]);
  const additionalValues = {};
  const additionalFields = {};
  const keys = Object.keys(data).filter((value) => value.startsWith("add") && data[value]);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    additionalFields[key] = content ? content[key] : "";
    additionalValues[key] = data[key];
  }
  const kes = Object.keys(additionalValues);
  const line = kes.filter((key) => key.startsWith("addLine"));

  return (
    <>
      <Typography variant="h3">
        {content ? `${t("fields.h2s")} ` : `${t("fields.h1s")} `}
        {`"${data.Name}" ${t("fields.h1e")}`}
      </Typography>
      <Formik
        initialValues={{ title: content ? content.Name : "", ...additionalFields }}
        onSubmit={async (values) => {
          const itemTags = tags.map((tag) => ({ TagId: tag.value, text: tag.label }));
          if (newTags[0]) {
            sendNewTags(newTags.map((el) => ({ TagId: el.value, text: el.label })));
          }
          if (content) {
            await updateItemData({ ...values, id: content.id, itemTags });
          } else await sendNewItem({ ...values, id: data.id, itemTags });
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, handleChange, validateForm, setFieldValue, submitForm }) => {
          return (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm(e);
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                  <FastField component={TitleField} />
                </Grid>
                <Grid item xs={3}>
                  <TagSelect
                    newTags={newTags}
                    setNewTags={setNewTags}
                    val={tags}
                    setVal={setTags}
                  />
                </Grid>
              </Grid>
              <AdditionalFields
                values={values}
                setFieldValue={setFieldValue}
                additionalValues={additionalValues}
                handleChange={handleChange}
              />
              <FieldArray
                name="friends"
                render={() => (
                  <div>
                    {line.map((field, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={index}>
                        <FastField component={LineField} av={additionalValues} f={field} />
                      </div>
                    ))}
                  </div>
                )}
              />
              <Divider style={{ margin: "20px" }} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => validateForm()}
              >
                {content ? t("fields.btn.update") : t("fields.btn.create")}
              </Button>
            </Form>
          );
        }}
      </Formik>
      {isLoading && <CircularProgress />}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.item.loading,
});

const mapDispatchToProps = (dispatch) => ({
  sendNewTags: (tags) => dispatch(sendTags(tags)),
  sendNewItem: (item) => dispatch(sendItem(item)),
  updateItemData: (item) => dispatch(updateItem(item)),
});

const ConnectedCreateItem = connect(mapStateToProps, mapDispatchToProps)(CreateItem);
export default withTranslation("collection")(ConnectedCreateItem);
