import * as collectionTypes from "../../actions/types/collection";

const initialState = {
  loading: false,
  error: { message: "", status: "" },
  data: {},
  items: [],
  additionalFields: [],
};

const collection = (state = initialState, action) => {
  switch (action.type) {
    case collectionTypes.COLLECTION_SUBMIT_START:
      return {
        ...state,
        loading: true,
      };
    case collectionTypes.COLLECTION_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case collectionTypes.COLLECTION_SUBMIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: { message: action.payload.message, status: action.payload.status },
      };
    case collectionTypes.COLLECTION_FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case collectionTypes.COLLECTION_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
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
    default:
      return state;
  }
};

export default collection;
