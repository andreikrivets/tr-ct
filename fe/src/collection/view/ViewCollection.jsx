import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Card,
  Chip,
  Button,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";
import { withTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import uniqid from "uniqid";

import CreateItem from "../../item/create";
import SingleItem from "../../shared/components/SingleItem";
import CircularProgressBar from "../../shared/components/CircularProgressBar";

const ViewCollection = (props) => {
  const {
    t,
    fetchCollectionData,
    collection,
    items,
    isLoading,
    openModalWindow,
    isLogged,
    userId,
    deleteCollectionItem,
  } = props;
  const { collectionId } = useParams();
  const { Name, Description, ImageId, Type, createdAt, OwnerId } = collection;
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(async () => {
    await fetchCollectionData(collectionId);
  }, []);
  if (isLoading) return <CircularProgressBar />;

  const handleDeleteItem = () => {
    deleteCollectionItem(deleteId);
    setOpen(false);
  };

  const isAuth = isLogged && userId === OwnerId;
  const additionalKeys =
    Object.keys(collection).filter((key) => key.startsWith("add") && collection[key]) || [];
  const date = new Date(createdAt).toLocaleDateString();
  return (
    <Card style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar alt={Name} style={{ marginTop: "3%", width: "150px", height: "150px" }}>
        {ImageId ? (
          <img src={ImageId} alt={Name} />
        ) : (
          <NotInterestedOutlinedIcon fontSize="large" />
        )}
      </Avatar>
      <Typography variant="h2">{Name}</Typography>
      <Chip label={Type} />
      <div>
        <ReactMarkdown className="react-markdown">{Description}</ReactMarkdown>
        <Typography variant="body1">{date}</Typography>
      </div>
      {isAuth && (
        <Button
          variant="outlined"
          onClick={() => openModalWindow(<CreateItem data={collection} />)}
        >
          {t("items.btn.create")}
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>{t("fields.id")}</TableCell>
              <TableCell>{t("fields.name")}</TableCell>
              <TableCell>{t("fields.tags")}</TableCell>
              {additionalKeys.map((key) => (
                <TableCell key={uniqid()}>{collection[key]}</TableCell>
              ))}
              {isAuth && <TableCell style={{ textAlign: "center" }}>{t("edit")}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <SingleItem
                key={uniqid()}
                additionalKeys={additionalKeys}
                ownerId={OwnerId}
                data={item}
                setDeleteId={setDeleteId}
                setOpen={setOpen}
              />
            ))}
          </TableBody>
          {!items.length && <caption>{t("fields.noItems")}</caption>}
        </Table>
      </TableContainer>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle id="simple-dialog-title">{t("confirm")}</DialogTitle>
        <div>
          <Button style={{ width: "50%" }} onClick={handleDeleteItem} color="secondary">
            {t("btn.yes")}
          </Button>
          <Button
            style={{ width: "50%" }}
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            {t("btn.no")}
          </Button>
        </div>
      </Dialog>
    </Card>
  );
};

export default withTranslation("collection")(ViewCollection);
