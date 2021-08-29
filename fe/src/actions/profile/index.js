import * as profileTypes from "../types/profile";
import { httpRequest } from "../utils";

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

const deleteCollectionSuccess = (id) => ({
  type: profileTypes.COLLECTION_DELETE_SUCCESS,
  payload: id,
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

const deleteCollection = (id) => {
  return async (dispatch) => {
    dispatch(profileDataFetchStart());
    try {
      const result = await httpRequest(`/api/collection/${id}`, "DELETE");
      const json = await result.json();
      if (result.ok) {
        dispatch(deleteCollectionSuccess(id));
      } else {
        dispatch(profileDataFetchFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(profileDataFetchFailure(e));
    }
  };
};

export { fetchProfileData, deleteCollection };
