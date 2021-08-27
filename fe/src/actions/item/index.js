import * as itemTypes from "../types/item";

const httpRequest = async (url, method = "GET", data) => {
  const token = localStorage.getItem("user") || "";
  const body = data ? JSON.stringify(data) : null;
  const headers = { "Content-Type": "application/json", "x-access-token": token };
  const res = await fetch(url, { method, headers, body });
  return res;
};

const sendItemSuccess = () => ({
  type: itemTypes.ITEM_SUBMIT_SUCCESS,
});

const fetchItemStart = () => ({
  type: itemTypes.ITEM_FETCH_START,
});

const fetchItemSuccess = (data) => ({
  type: itemTypes.ITEM_FETCH_SUCCESS,
  payload: data,
});

const fetchLastItemSuccess = (data, tags) => ({
  type: itemTypes.FETCH_LAST_ITEM_SUCCESS,
  payload: { data, tags },
});

const fetchItemFailure = (error, status) => ({
  type: itemTypes.ITEM_FETCH_FAILURE,
  payload: { message: error, status },
});

const updateItemSuccess = () => ({
  type: itemTypes.ITEM_UPDATE_SUCCESS,
});

const getItem = (id) => {
  return async (dispatch) => {
    dispatch(fetchItemStart());
    try {
      const result = await httpRequest(`/api/item/${id}`, "GET");
      const json = await result.json();
      if (result.ok) {
        dispatch(fetchItemSuccess(json.items));
      } else {
        dispatch(fetchItemFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(fetchItemFailure(e));
    }
  };
};

const sendItem = (data) => {
  return async (dispatch) => {
    dispatch(fetchItemStart());
    try {
      const result = await httpRequest(`/api/item/`, "POST", data);
      const json = await result.json();
      if (result.ok) {
        dispatch(sendItemSuccess(json.info, json.collections));
      } else {
        dispatch(fetchItemFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(fetchItemFailure(e));
    }
  };
};

const fetchLastItems = () => {
  return async (dispatch) => {
    dispatch(fetchItemStart());
    try {
      const result = await httpRequest(`/api/last/item`, "GET");
      const json = await result.json();
      if (result.ok) {
        dispatch(fetchLastItemSuccess(json.items, json.tags));
      } else {
        dispatch(fetchItemFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(fetchItemFailure(e));
    }
  };
};

const updateItem = (item) => {
  return async (dispatch) => {
    dispatch(fetchItemStart());
    try {
      const result = await httpRequest(`/api/item/`, "PUT", item);
      const json = await result.json();
      if (result.ok) {
        dispatch(updateItemSuccess());
      } else {
        dispatch(fetchItemFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(fetchItemFailure(e));
    }
  };
};

export { sendItem, getItem, fetchLastItems, updateItem };
