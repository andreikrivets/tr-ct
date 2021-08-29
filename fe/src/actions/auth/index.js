import * as types from "../types";
import { httpRequest } from "../utils";

const authStarted = () => ({
  type: types.USER_AUTH_STARTED,
});

const authFailure = (error, status) => ({
  type: types.USER_AUTH_FAILURE,
  payload: { message: error, status },
});

const userLogout = () => ({
  type: types.USER_LOGOUT,
});

const registerSuccess = (status) => ({
  type: types.USER_REGISTER_SUCCESS,
  payload: status,
});

const loginSuccess = (user) => ({
  type: types.USER_LOGIN_SUCCESS,
  payload: user,
});

export const register = (data) => {
  return async (dispatch) => {
    dispatch(authStarted());
    try {
      const result = await httpRequest("/api/auth/register", "POST", data);
      const json = await result.json();
      if (result.ok) {
        dispatch(registerSuccess(result.status));
      } else {
        dispatch(authFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(authFailure(e));
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    dispatch(authStarted());
    try {
      const result = await httpRequest("/api/auth/login", "POST", data);
      const json = await result.json();
      if (result.ok) {
        dispatch(loginSuccess(json));
        localStorage.setItem("user", JSON.stringify(json));
      } else {
        dispatch(authFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(authFailure(e));
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(userLogout());
    localStorage.removeItem("user");
  };
};
