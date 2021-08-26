/* eslint-disable no-unused-vars */
import * as tagsTypes from "../../actions/types/tags";

const initialState = {
  loading: false,
  error: {
    message: "",
    status: "",
  },
  data: {},
};

const tags = (state = initialState, action) => {
  switch (action.type) {
    case tagsTypes.FETCH_TAGS_START:
      return {
        ...state,
        loading: true,
      };
    case tagsTypes.FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case tagsTypes.FETCH_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    case tagsTypes.CREATE_TAGS_START:
      return {
        ...state,
        loading: true,
      };
    case tagsTypes.CREATE_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case tagsTypes.CREATE_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    default:
      return state;
  }
};

export default tags;
