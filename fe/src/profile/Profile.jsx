/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import {
  Avatar,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Modal,
} from "@material-ui/core";
import uniqid from "uniqid";
import { useParams } from "react-router-dom";

import { CreateCollection } from "../collection";
import Collection from "./Collection";

const Profile = (props) => {
  const {
    t,
    getProfileData,
    isLoading,
    profile,
    user,
    openModalWindow,
    collections,
    deleteProfileCollection,
  } = props;
  const { userId } = useParams();
  useEffect(() => {
    getProfileData(userId);
  }, []);

  const { firstName, lastName, email, createdAt, type } = profile;
  const date = new Date(createdAt).toLocaleDateString();
  if (!profile.firstName || isLoading || !collections)
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  const handleDelete = (delId) => deleteProfileCollection(delId);
  return (
    <Paper style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar style={{ height: "100px", width: "100px" }}>
        {`${firstName.slice(0, 1)}${lastName.slice(0, 1)}`}
      </Avatar>
      <Typography
        variant="h2"
        color="textPrimary"
      >{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</Typography>
      <Chip label={`${type === "user" ? t("user") : t("admin")}`} />
      <Typography variant="h4">{`${email}`}</Typography>
      <Typography variant="caption">{`${t("memberSince")} ${date}`}</Typography>
      {collections.length ? (
        collections.map((collection) => (
          <Collection user={user} key={uniqid()} data={collection} handleDelete={handleDelete} />
        ))
      ) : (
        <Typography>{t("notExist")}</Typography>
      )}
      {user.userId === +userId && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => openModalWindow(<CreateCollection />)}
        >
          {t("btn.createCollection")}
        </Button>
      )}
    </Paper>
  );
};

export default withTranslation("profile")(Profile);
