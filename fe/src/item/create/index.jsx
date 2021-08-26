import { Typography, Grid, Divider, Button } from "@material-ui/core";
import { Formik, Form, FastField, FieldArray } from "formik";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";
import AdditionalFields from "./additionalFields";
import TagSelect from "./TagSelect";
import { sendTags } from "../../actions/tags";
import { sendItem } from "../../actions/item";

import { LineField, TitleField } from "./additionalFields/LineFields";

const CreateItem = (props) => {
  const { t, sendNewTags, data, sendNewItem } = props;
  const [tags, setTags] = useState([]);
  const [newTags, setNewTags] = useState([]);
  const additionalValues = {};
  const additionalFields = {};
  const keys = Object.keys(data).filter((value) => value.startsWith("add") && data[value]);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    additionalFields[key] = "";
    additionalValues[key] = data[key];
  }
  const kes = Object.keys(additionalValues);
  const line = kes.filter((key) => key.startsWith("addLine"));

  return (
    <>
      <Typography variant="h3">{`${t("h1s")} "${data.Name}" ${t("h1e")}`}</Typography>
      <Formik
        initialValues={{ title: "", ...additionalFields }}
        onSubmit={async (values) => {
          const itemTags = tags.map((tag) => ({ TagId: tag.value, text: tag.label }));
          if (newTags[0]) {
            sendNewTags(newTags.map((el) => ({ TagId: el.value, text: el.label })));
          }
          await sendNewItem({ ...values, id: data.id, itemTags });
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
                {t("btn.create")}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sendNewTags: (tags) => dispatch(sendTags(tags)),
  sendNewItem: (item) => dispatch(sendItem(item)),
});

const ConnectedCreateItem = connect(null, mapDispatchToProps)(CreateItem);
export default withTranslation("items")(ConnectedCreateItem);
