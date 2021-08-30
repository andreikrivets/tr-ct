import * as itemTypes from "../../actions/types/item";

const initialError = { message: "", status: "" };
const initialState = {
  loading: false,
  error: initialError,
  data: [],
  lastItems: [],
  lastTags: [],
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case itemTypes.ITEM_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: initialError,
      };
    case itemTypes.ITEM_FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case itemTypes.ITEM_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case itemTypes.ITEM_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: initialError,
        data: action.payload,
      };
    case itemTypes.FETCH_LAST_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: initialError,
        lastItems: action.payload.data,
        lastTags: action.payload.tags,
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
