import * as appTypes from "../../actions/types/app";

const config = JSON.parse(localStorage.getItem("config"));

const initialState = {
  loading: false,
  modal: false,
  component: () => {},
  theme: config ? config.theme : false,
  lang: config ? config.lang : "en",
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case appTypes.OPEN_MODAL:
      return {
        ...state,
        modal: true,
        component: action.payload,
      };
    case appTypes.CLOSE_MODAL:
      return {
        ...state,
        modal: false,
      };
    case appTypes.CHANGE_THEME:
      return {
        ...state,
        theme: !state.theme,
      };
    case appTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default app;
