/* eslint-disable no-unused-vars */
import * as searchTypes from "../../actions/types/search";

const initialState = {
  loading: false,
  error: {
    message: "",
    status: "",
  },
  result: {},
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case searchTypes.SEARCH_START:
      return {
        ...state,
        loading: true,
      };
    case searchTypes.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload,
      };
    case searchTypes.SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    default:
      return state;
  }
};

export default search;
