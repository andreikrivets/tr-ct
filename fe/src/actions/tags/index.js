import * as tagsTypes from "../types/tags";
import { httpRequest } from "../utils";

const tagsFetchStart = () => ({
  type: tagsTypes.FETCH_TAGS_START,
});

const tagsFetchSuccess = (tags) => ({
  type: tagsTypes.FETCH_TAGS_SUCCESS,
  payload: tags,
});

const tagsFetchFailure = (error, status) => ({
  type: tagsTypes.FETCH_TAGS_FAILURE,
  payload: { message: error, status },
});

const sendTagsSuccess = (tags) => ({
  type: tagsTypes.CREATE_TAGS_SUCCESS,
  payload: tags,
});

const searchTagSuccess = (data) => ({
  type: tagsTypes.SEARCH_TAG_SUCCESS,
  payload: data,
});

const fetchTags = () => {
  return async (dispatch) => {
    dispatch(tagsFetchStart());
    try {
      const result = await httpRequest(`/api/tags`, "GET");
      const json = await result.json();
      if (result.ok) {
        dispatch(tagsFetchSuccess(json.tags));
      } else {
        dispatch(tagsFetchFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(tagsFetchFailure(e));
    }
  };
};

const sendTags = (tags) => {
  return async (dispatch) => {
    dispatch(tagsFetchStart());
    if (!tags) return;
    try {
      const result = await httpRequest(`/api/tags`, "POST", tags);
      const json = await result.json();
      if (result.ok) {
        dispatch(sendTagsSuccess(json.tags));
      } else {
        dispatch(tagsFetchFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(tagsFetchFailure(e));
    }
  };
};

const searchTagItems = (tag) => {
  return async (dispatch) => {
    dispatch(tagsFetchStart());
    try {
      const result = await httpRequest(`/api/tags/?q=${tag}`, "GET");
      const json = await result.json();
      if (result.ok) {
        dispatch(searchTagSuccess(json.items));
      } else {
        dispatch(tagsFetchFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(tagsFetchFailure(e));
    }
  };
};

export { fetchTags, sendTags, searchTagItems };
