import { connect } from "react-redux";

import { register } from "../../actions/auth";
import Register from "./Register";

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(register(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
