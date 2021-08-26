/* eslint-disable no-unused-vars */
import * as itemTypes from "../../actions/types/item";

const initialState = {
  loading: false,
  error: { message: "", status: "" },
  data: [],
  lastItems: [],
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case itemTypes.ITEM_SUBMIT_START:
      return {
        ...state,
        loading: true,
      };
    case itemTypes.ITEM_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case itemTypes.ITEM_SUBMIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    case itemTypes.ITEM_FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case itemTypes.ITEM_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case itemTypes.FETCH_LAST_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        lastItems: action.payload,
      };
    case itemTypes.ITEM_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    default:
      return state;
  }
};

export default item;
