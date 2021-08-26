/* eslint-disable no-unused-vars */
import * as profileTypes from "../../actions/types/profile";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  loading: false,
  error: {
    message: "",
    status: "",
  },
  data: {},
  collections: [],
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case profileTypes.PROFILE_DATA_FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case profileTypes.PROFILE_DATA_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
        collections: action.payload.collections,
      };
    case profileTypes.PROFILE_DATA_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    default:
      return state;
  }
};

export default profile;
