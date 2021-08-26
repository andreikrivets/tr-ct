/* eslint-disable no-unused-vars */
import * as appTypes from "../types/app";
import i18n from "../../shared/locales/i18n";

export const openModal = (component) => ({
  type: appTypes.OPEN_MODAL,
  payload: component,
});

export const closeModal = () => ({
  type: appTypes.CLOSE_MODAL,
});

const switchTheme = () => ({
  type: appTypes.CHANGE_THEME,
});

const changeLang = (newLang) => ({
  type: appTypes.CHANGE_LANGUAGE,
  payload: newLang,
});

export const changeTheme = () => (dispatch) => {
  const config = JSON.parse(localStorage.getItem("config"));
  const theme = config ? config.theme : false;
  localStorage.setItem("config", JSON.stringify({ ...config, theme: !theme }));
  dispatch(switchTheme());
};

export const changeLanguage = (newLang) => (dispatch) => {
  const config = JSON.parse(localStorage.getItem("config"));
  localStorage.setItem("config", JSON.stringify({ ...config, lang: newLang }));
  i18n.changeLanguage(newLang);
  dispatch(changeLang(newLang));
};
