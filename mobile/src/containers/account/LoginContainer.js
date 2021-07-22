import React from "react";
import { connect } from "react-redux";
import Login from "../../components/account/Login";
import {
  loginAction
} from '../../redux/actions/accountAction'
class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount = () => {

  };

  render() {
    return <Login {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (input) => {
      dispatch(loginAction(input));
    },

  };
};
const mapStateToProps = (state) => {
  console.log(state.loginReducers)
  return {
    loadingLogin: state.loginReducers.loading,
    responseLogin: state.loginReducers.response,
    errorLogin: state.loginReducers.error,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
