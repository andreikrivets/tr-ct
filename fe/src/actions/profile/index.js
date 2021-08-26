import * as profileTypes from "../types/profile";

const httpRequest = async (url, method = "GET", data) => {
  const body = data ? JSON.stringify(data) : null;
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(url, { method, headers, body });
  return res;
};

const profileDataFetchStart = () => ({
  type: profileTypes.PROFILE_DATA_FETCH_START,
});

const profileDataFetchSuccess = (data, collections) => ({
  type: profileTypes.PROFILE_DATA_FETCH_SUCCESS,
  payload: { data, collections },
});

const profileDataFetchFailure = (error, status) => ({
  type: profileTypes.PROFILE_DATA_FETCH_FAILURE,
  payload: { message: error, status },
});

const fetchProfileData = (id) => {
  return async (dispatch) => {
    dispatch(profileDataFetchStart());
    try {
      const result = await httpRequest(`/api/user/${id}`, "GET");
      const json = await result.json();
      if (result.ok) {
        dispatch(profileDataFetchSuccess(json.info, json.collections));
      } else {
        dispatch(profileDataFetchFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(profileDataFetchFailure(e));
    }
  };
};

export default fetchProfileData;
