import * as types from "../../actions/types";

const initialState = {
  loading: false,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_REGISTER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default auth;
