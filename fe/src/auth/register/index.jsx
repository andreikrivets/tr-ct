import { connect } from "react-redux";

import { register } from "../../actions/auth";
import { closeModal } from "../../actions/app";
import Register from "./Register";

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(register(data)),
  closeModalWindow: () => dispatch(closeModal()),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  authError: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
