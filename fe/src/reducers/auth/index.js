import * as types from "../../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  loading: false,
  error: {
    message: "",
    status: "",
  },
  loggedIn: !!user,
  user: user || {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_REGISTER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    case types.USER_LOGIN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        loggedIn: true,
        user: action.payload,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        user: {},
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default auth;
