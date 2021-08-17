/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import DarkModeToggle from "react-dark-mode-toggle";
import {
  AppBar,
  Switch as SwitchComponent,
  Link,
  Toolbar,
  Select,
  InputBase,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";

import useLang from "../../../hooks/lang.hook";

const Navbar = (props) => {
  const { t, themeSwitch, checked } = props;
  const { lang, langChange } = useLang();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">MRKT</Typography>
        <div style={{ display: "flex" }}>
          <div>
            <SearchIcon />
          </div>
          <InputBase placeholder={`${t("search")}`} inputProps={{ "aria-label": "search" }} />
        </div>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          onChange={(e) => langChange(e.target.value)}
        >
          <MenuItem value="en">en</MenuItem>
          <MenuItem value="ru">ru</MenuItem>
        </Select>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <AccountCircle />
        </IconButton>
        <DarkModeToggle checked={checked} onChange={themeSwitch} size={50} speed={5} />
        <Menu id="menu-appbar" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <Link href="/profile">{t("profile")}</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/collections">{t("collections")}</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default withTranslation("navbar")(Navbar);
