import * as tagsTypes from "../types/tags";

const httpRequest = async (url, method = "GET", data) => {
  const body = data ? JSON.stringify(data) : null;
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(url, { method, headers, body });
  return res;
};

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

const sendTagsStart = () => ({
  type: tagsTypes.CREATE_TAGS_START,
});

const sendTagsSuccess = (tags) => ({
  type: tagsTypes.CREATE_TAGS_SUCCESS,
  payload: tags,
});

const sendTagsFailure = (error, status) => ({
  type: tagsTypes.CREATE_TAGS_FAILURE,
  payload: { message: error, status },
});

const sendTags = (tags) => {
  return async (dispatch) => {
    dispatch(sendTagsStart());
    if (!tags) return;
    try {
      const result = await httpRequest(`/api/tags`, "POST", tags);
      const json = await result.json();
      if (result.ok) {
        dispatch(sendTagsSuccess(json.tags));
      } else {
        dispatch(sendTagsFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(sendTagsFailure(e));
    }
  };
};

export { fetchTags, sendTags };
