import * as collectionTypes from "../types/collection";

const httpRequest = async (url, method = "GET", data) => {
  const token = localStorage.getItem("user") || "";
  const body = data ? JSON.stringify(data) : null;
  const headers = { "Content-Type": "application/json", "x-access-token": token };
  const res = await fetch(url, { method, headers, body });
  return res;
};

const submitCollectionSuccess = (status) => ({
  type: collectionTypes.COLLECTION_SUBMIT_SUCCESS,
  payload: status,
});

const fetchCollectionStart = () => ({
  type: collectionTypes.COLLECTION_FETCH_START,
});

const fetchCollectionSuccess = (data) => ({
  type: collectionTypes.COLLECTION_FETCH_SUCCESS,
  payload: data,
});

const fetchCollectionFailure = (error, status) => ({
  type: collectionTypes.COLLECTION_FETCH_FAILURE,
  payload: { message: error, status },
});

const deleteItemSuccess = (id) => ({
  type: collectionTypes.DELETE_ITEM_SUCCESS,
  payload: id,
});

const submitCollection = (data) => {
  return async (dispatch) => {
    dispatch(fetchCollectionStart());
    try {
      const result = await httpRequest("/api/collection", "POST", data);
      const json = await result.json();
      if (result.ok) {
        dispatch(submitCollectionSuccess(result.status));
      } else {
        dispatch(fetchCollectionFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(fetchCollectionFailure(e));
    }
  };
};

const fetchCollection = (id) => {
  return async (dispatch) => {
    dispatch(fetchCollectionStart());
    try {
      const result = await httpRequest(`/api/collection/${id}`, "GET");
      const json = await result.json();
      if (result.ok) {
        dispatch(fetchCollectionSuccess(json));
      } else {
        dispatch(fetchCollectionFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(fetchCollectionFailure(e));
    }
  };
};

const deleteItem = (id) => {
  return async (dispatch) => {
    dispatch(fetchCollectionStart());
    try {
      const result = await httpRequest(`/api/item/${id}`, "DELETE");
      const json = await result.json();
      if (result.ok) {
        dispatch(deleteItemSuccess(id));
      } else {
        dispatch(fetchCollectionFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(fetchCollectionFailure(e));
    }
  };
};

const updateCollection = (collection) => {
  return async (dispatch) => {
    dispatch(fetchCollectionStart());
    try {
      const result = await httpRequest(`/api/collection`, "PUT", collection);
      const json = await result.json();
      if (result.ok) {
        dispatch(deleteItemSuccess());
      } else {
        dispatch(fetchCollectionFailure(json.message, result.status));
      }
    } catch (e) {
      dispatch(fetchCollectionFailure(e));
    }
  };
};

export { submitCollection, fetchCollection, deleteItem, updateCollection };
