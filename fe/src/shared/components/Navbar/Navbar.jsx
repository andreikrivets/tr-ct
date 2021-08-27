import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import DarkModeToggle from "react-dark-mode-toggle";
import {
  AppBar,
  Avatar,
  Toolbar,
  Select,
  InputBase,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import InputIcon from "@material-ui/icons/Input";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";

import { openModal, closeModal, changeTheme, changeLanguage } from "../../../actions/app";
import SearchResults from "./SearchResults";

import { logOut } from "../../../actions/auth";
import searchItem from "../../../actions/search";
import { Login, Register } from "../../../auth";

const Navbar = (props) => {
  const {
    t,
    loggedIn,
    onLogOut,
    userId,
    changeLang,
    openModalWindow,
    closeModalWindow,
    changeColorTheme,
    theme,
    language,
    sendSearch,
  } = props;
  const [lang, setLang] = useState(language);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogOut();
    setAnchorEl(null);
    closeModalWindow();
  };

  const handleLangChange = (e) => {
    setLang(e.target.value);
    changeLang(e.target.value);
  };

  const handleOpenSearchResults = async () => {
    if (!searchVal && !searchVal.trim()) return;
    sendSearch(searchVal.trim());
    openModalWindow(<SearchResults q={searchVal} />);
  };

  const handleOpenProfile = () => {
    setAnchorEl(null);
    history.push(`/user/${userId}`);
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
          MRKT
        </Typography>

        <div style={{ display: "flex" }}>
          <InputBase
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder={`${t("search")}`}
            inputProps={{ "aria-label": "search", maxLength: 20 }}
          />
          <IconButton onClick={handleOpenSearchResults}>
            <SearchIcon />
          </IconButton>
        </div>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          onChange={handleLangChange}
        >
          <MenuItem value="en">en</MenuItem>
          <MenuItem value="ru">ru</MenuItem>
        </Select>
        <DarkModeToggle checked={theme} onChange={changeColorTheme} size={50} speed={5} />
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <Avatar>
            <AccountCircle />
          </Avatar>
        </IconButton>
        <>
          {loggedIn ? (
            <Menu id="menu-appbar" anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              <MenuItem onClick={handleOpenProfile}>
                <ListItemIcon>
                  <PermIdentityOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("profile")} />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("signout")} />
              </MenuItem>
            </Menu>
          ) : (
            <Menu id="menu-appbar" anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              <MenuItem onClick={() => openModalWindow(<Login />)}>
                <ListItemIcon>
                  <InputIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("signin")} />
              </MenuItem>
              <MenuItem onClick={() => openModalWindow(<Register />)}>
                <ListItemIcon>
                  <MeetingRoomOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("signup")} />
              </MenuItem>
            </Menu>
          )}
        </>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  const { auth, app, profile } = state;
  return {
    loggedIn: auth.loggedIn,
    userId: auth.user.userId,
    modal: app.modal,
    theme: app.theme,
    language: app.lang,
    profileData: profile.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logOut()),
  openModalWindow: (component) => dispatch(openModal(component)),
  closeModalWindow: () => dispatch(closeModal()),
  changeColorTheme: () => dispatch(changeTheme()),
  changeLang: (newLang) => dispatch(changeLanguage(newLang)),
  sendSearch: (query) => dispatch(searchItem(query)),
});

const ConnectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);
export default withTranslation("navbar")(ConnectedNavbar);
