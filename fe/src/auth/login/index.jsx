import { connect } from "react-redux";

import { closeModal } from "../../actions/app";
import { login } from "../../actions/auth";
import Login from "./Login";

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
  closeModalWindow: () => dispatch(closeModal()),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  isLoggedIn: state.auth.loggedIn,
  authError: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
