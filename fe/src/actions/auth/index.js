import * as types from "../types";

const httpRequest = async (url, method = "GET", data) => {
  const body = data ? JSON.stringify(data) : "";
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(url, { method, headers, body });
  const json = await res.json();
  return json;
};

const registerStarted = () => ({
  type: types.USER_REGISTER_STARTED,
});

const registerSuccess = (status) => ({
  type: types.USER_REGISTER_SUCCESS,
  payload: status,
});

const registerFailure = (e) => ({
  type: types.USER_REGISTER_FAILURE,
  payload: e,
});

export const register = (data) => {
  return async (dispatch) => {
    dispatch(registerStarted());
    try {
      const result = await httpRequest("/api/auth/register", "POST", data);
      dispatch(registerSuccess(result));
    } catch (e) {
      dispatch(registerFailure(e));
    }
  };
};

export const login = () => ({
  type: types.USER_LOGIN,
  // payload: current,
});
