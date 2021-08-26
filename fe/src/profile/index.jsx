import { connect } from "react-redux";

import { deleteCollection, fetchProfileData } from "../actions/profile";
import { openModal, closeModal } from "../actions/app";
import Profile from "./Profile";

const mapDispatchToProps = (dispatch) => ({
  getProfileData: (id) => dispatch(fetchProfileData(id)),
  deleteProfileCollection: (id) => dispatch(deleteCollection(id)),
  openModalWindow: (component) => dispatch(openModal(component)),
  closeModalWindo: () => dispatch(closeModal()),
});

const mapStateToProps = (state) => {
  const { profile, auth, app } = state;
  return {
    isLoading: profile.loading,
    profile: profile.data,
    collections: profile.collections,
    isLogged: auth.loggedIn,
    user: auth.user,
    modal: app.modal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
