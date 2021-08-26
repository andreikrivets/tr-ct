import * as searchTypes from "../types/search";

const httpRequest = async (url, method = "GET", data) => {
  const token = localStorage.getItem("user") || "";
  const body = data ? JSON.stringify(data) : null;
  const headers = { "Content-Type": "application/json", "x-access-token": token };
  const res = await fetch(url, { method, headers, body });
  return res;
};

const searchItemStart = () => ({
  type: searchTypes.SEARCH_START,
});

const searchItemSuccess = (result) => ({
  type: searchTypes.SEARCH_SUCCESS,
  payload: result,
});

const searchItemFailure = (error, status) => ({
  type: searchTypes.SEARCH_FAILURE,
  payload: { message: error, status },
});

const searchItem = (query) => {
  return async (dispatch) => {
    dispatch(searchItemStart());
    try {
      const result = await httpRequest(`/api/search/?q=${query}`, "GET");
      const json = await result.json();
      if (result.ok) {
        dispatch(searchItemSuccess(json.result));
      } else {
        dispatch(searchItemFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(searchItemFailure(e));
    }
  };
};

export default searchItem;
