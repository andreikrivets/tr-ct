import * as types from "../types";

const httpRequest = async (url, method = "GET", data) => {
  const body = data ? JSON.stringify(data) : "";
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(url, { method, headers, body });
  return res;
};

const registerStarted = () => ({
  type: types.USER_REGISTER_STARTED,
});

const registerSuccess = (status) => ({
  type: types.USER_REGISTER_SUCCESS,
  payload: status,
});

const registerFailure = (error, status) => ({
  type: types.USER_REGISTER_FAILURE,
  payload: { message: error, status },
});

export const register = (data) => {
  return async (dispatch) => {
    dispatch(registerStarted());
    try {
      const result = await httpRequest("/api/auth/register", "POST", data);
      const json = await result.json();
      if (result.ok) {
        dispatch(registerSuccess(result.status));
      } else {
        dispatch(registerFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(registerFailure(e));
    }
  };
};

const loginStarted = () => ({
  type: types.USER_LOGIN_STARTED,
});

const loginSuccess = (user) => ({
  type: types.USER_LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error, status) => ({
  type: types.USER_LOGIN_FAILURE,
  payload: { message: error, status },
});

const userLogout = () => ({
  type: types.USER_LOGOUT,
});

export const login = (data) => {
  return async (dispatch) => {
    dispatch(loginStarted());
    try {
      const result = await httpRequest("/api/auth/login", "POST", data);
      const json = await result.json();
      if (result.ok) {
        dispatch(loginSuccess(json));
        localStorage.setItem("user", JSON.stringify(json));
      } else {
        dispatch(loginFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(loginFailure(e));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch(userLogout());
    localStorage.removeItem("user");
  };
};
