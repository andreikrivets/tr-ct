import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Avatar, Paper, Typography, Chip, Button } from "@material-ui/core";
import uniqid from "uniqid";
import { useParams } from "react-router-dom";

import { CreateCollection } from "../collection";
import Collection from "./Collection";
import CircularProgressBar from "../shared/components/CircularProgressBar";

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
  if (!profile.firstName || isLoading || !collections) return <CircularProgressBar />;
  const isAuthorised = user.userId === +userId;
  const handleDelete = (delId) => deleteProfileCollection(delId);
  return (
    <Paper style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar style={{ marginTop: "3%", height: "100px", width: "100px" }}>
        {`${firstName.slice(0, 1)}${lastName.slice(0, 1)}`}
      </Avatar>
      <Typography
        variant="h2"
        color="textPrimary"
      >{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</Typography>
      <Chip label={`${type === "user" ? t("user") : t("admin")}`} />
      <Typography variant="h4">{`${email}`}</Typography>
      <Typography variant="caption">{`${t("memberSince")} ${date}`}</Typography>
      {isAuthorised && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => openModalWindow(<CreateCollection />)}
        >
          {t("btn.createCollection")}
        </Button>
      )}
      {collections.length ? (
        collections.map((collection) => (
          <Collection user={user} key={uniqid()} data={collection} handleDelete={handleDelete} />
        ))
      ) : (
        <Typography>{t("notExist")}</Typography>
      )}
    </Paper>
  );
};

export default withTranslation("profile")(Profile);
