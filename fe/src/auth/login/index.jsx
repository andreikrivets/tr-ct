import { connect } from "react-redux";

import { login } from "../../actions/auth";
import Login from "./Login";

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
