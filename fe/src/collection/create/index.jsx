import { connect } from "react-redux";

import { closeModal } from "../../actions/app";
import { submitCollection, updateCollection } from "../../actions/collection";
import CreateCollection from "./CreateCollection";

const mapDispatchToProps = (dispatch) => ({
  closeModalWindow: () => dispatch(closeModal()),
  submitCollectionForm: (data) => dispatch(submitCollection(data)),
  updateCollectionForm: (data) => dispatch(updateCollection(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.collection.loading,
  error: state.collection.error,
  collections: state.profile.collections,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection);
