/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Avatar,
  Checkbox,
  Chip,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Box,
  Dialog,
  DialogTitle,
  TableBody,
  Tooltip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@material-ui/core";
import uniqid from "uniqid";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { withTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Link, useHistory, useParams } from "react-router-dom";

const ProfileCollection = ({ t, data, user }) => {
  const { Name, Description, Type, ImageId, id } = data;
  const { userId } = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const additional = Object.keys(data)
    .filter((key) => data[key] && key.startsWith("add"))
    .reduce((obj, key) => {
      const acc = obj;
      const corrKey = key.slice(3, key.length - 1).toLowerCase();
      acc[corrKey] = `${acc[corrKey] || ""} ${data[key].trim()},`;
      return acc;
    }, {});
  const cut = Description.length > 200 ? `${Description.slice(0, 200)}...` : Description;

  return (
    <>
      <TableContainer component={Box}>
        <Table>
          <TableBody>
            <TableRow hover>
              <TableCell style={{ width: "5%", textAlign: "center" }}>
                <Checkbox color="primary" />
              </TableCell>
              <TableCell style={{ width: "5%", textAlign: "center" }}>
                {ImageId ? <Avatar src={ImageId} alt={Name} /> : <NotInterestedOutlinedIcon />}
              </TableCell>
              <TableCell
                style={{ width: "15%", cursor: "pointer" }}
                onClick={() => history.push(`/collection/${id}`)}
              >
                <Typography variant="subtitle1">{Name}</Typography>
              </TableCell>
              <TableCell style={{ width: "35%" }}>
                <ReactMarkdown>{cut}</ReactMarkdown>
              </TableCell>
              <TableCell style={{ width: "10%", textAlign: "center" }}>
                <Chip label={Type} />
              </TableCell>
              <TableCell style={{ width: "15%" }}>
                <div>
                  {additional
                    ? Object.entries(additional).map((add) => (
                        <Typography
                          variant="body2"
                          style={{ margin: "3px" }}
                          key={uniqid()}
                        >{`${add[0]}: ${add[1]}`}</Typography>
                      ))
                    : null}
                </div>
              </TableCell>
              {user.userId === +userId && (
                <TableCell style={{ width: "5%" }}>
                  <Tooltip title={t("editLabel")}>
                    <IconButton onClick={() => history.push(`/edit/collection/${id}`)}>
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={t("deleteLabel")}>
                    <IconButton onClick={() => setOpen(true)}>
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle id="simple-dialog-title">{t("confirm")}</DialogTitle>
        <div>
          <Button style={{ width: "50%" }} color="secondary">
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
    </>
  );
};

export default withTranslation("profile")(ProfileCollection);
