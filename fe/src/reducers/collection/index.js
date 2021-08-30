import * as collectionTypes from "../../actions/types/collection";

const initialError = { message: "", status: "" };
const initialState = {
  loading: false,
  error: initialError,
  data: {},
  items: [],
  additionalFields: [],
};

const collection = (state = initialState, action) => {
  switch (action.type) {
    case collectionTypes.COLLECTION_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: initialError,
      };
    case collectionTypes.COLLECTION_FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case collectionTypes.UPDATE_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case collectionTypes.COLLECTION_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.collection,
        items: action.payload.items,
        additionalFields:
          Object.keys(action.payload.collection).filter(
            (key) => key.startsWith("add") && action.payload.collection[key]
          ) || [],
      };
    case collectionTypes.COLLECTION_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    case collectionTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: initialError,
        items: state.items.filter((element) => element.id !== action.payload),
      };
    default:
      return state;
  }
};

export default collection;
