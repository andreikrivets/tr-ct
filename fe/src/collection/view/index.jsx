import { connect } from "react-redux";

import ViewCollection from "./ViewCollection";
import { fetchCollection, deleteItem } from "../../actions/collection";
import { openModal } from "../../actions/app";

const mapStateToProps = (state) => ({
  collection: state.collection.data,
  items: state.collection.items,
  isLoading: state.collection.loading,
  isLogged: state.auth.loggedIn,
  userId: state.auth.user.userId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionData: (id) => dispatch(fetchCollection(id)),
  openModalWindow: (component) => dispatch(openModal(component)),
  deleteCollectionItem: (id) => dispatch(deleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCollection);
