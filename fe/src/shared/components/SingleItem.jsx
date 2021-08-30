import React from "react";
import {
  Checkbox,
  CircularProgress,
  TableCell,
  TableRow,
  Chip,
  Tooltip,
  IconButton,
} from "@material-ui/core/";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import uniqid from "uniqid";
import ReactMarkdown from "react-markdown";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { openModal } from "../../actions/app";

const SingleItem = (props) => {
  const { t, data, additionalKeys, ownerId, isLogged, userId, setDeleteId, setOpen } = props;
  const { id, Name, Tags } = data;
  const history = useHistory();
  if (!data) return <CircularProgress />;
  const { Collection } = data;
  const getElement = (key) => {
    if (key.startsWith("addText"))
      return (
        <TableCell key={uniqid()} style={{ width: "25%", overflowWrap: "anywhere" }}>
          <ReactMarkdown>{`${data[key].slice(0, 100)}...`}</ReactMarkdown>
        </TableCell>
      );
    if (key.startsWith("addBool"))
      return (
        <TableCell key={uniqid()}>
          <Checkbox disabled key={uniqid()} checked={!!data[key]} />
        </TableCell>
      );
    return <TableCell key={uniqid()}>{data[key]}</TableCell>;
  };

  const handleOpenDeleteDialog = () => {
    setOpen(true);
    setDeleteId(id);
  };

  const itemWidth = Collection ? "35%" : "15%";
  return (
    <TableRow hover>
      <TableCell style={{ width: "5%" }}>{id}</TableCell>
      <TableCell style={{ width: itemWidth }}>
        <Link to={`/item/${id}`}>{Name}</Link>
      </TableCell>
      {Tags ? (
        <TableCell style={{ width: "15%" }}>
          {Tags &&
            Tags.map((tag) => (
              <Chip
                key={uniqid()}
                component={Link}
                to={`/tag/${tag.TagId}`}
                clickable
                variant="outlined"
                label={tag.text}
              />
            ))}
        </TableCell>
      ) : null}
      {additionalKeys.map((key) => getElement(key))}
      {Collection && (
        <TableCell>
          <Link to={`/collection/${Collection.id}`}>{Collection.Name}</Link>
        </TableCell>
      )}
      {Collection && (
        <TableCell>
          <Link
            to={`/user/${Collection.User.id}`}
          >{`${Collection.User.firstName} ${Collection.User.lastName}`}</Link>
        </TableCell>
      )}
      {isLogged && userId === ownerId && (
        <TableCell style={{ width: "5%" }}>
          <div style={{ display: "flex" }}>
            <Tooltip title={t("editLabel")}>
              <IconButton onClick={() => history.push(`/edit/item/${id}`)}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("deleteLabel")}>
              <IconButton onClick={handleOpenDeleteDialog}>
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.loggedIn,
  userId: state.auth.user.userId,
});

const mapDispatchToProps = (dispatch) => ({
  openItem: (component) => dispatch(openModal(component)),
});

const SingleItemConnected = connect(mapStateToProps, mapDispatchToProps)(SingleItem);
export default withTranslation("profile")(SingleItemConnected);
