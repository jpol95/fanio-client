import React, { Component } from "react";
import LoginForm from "../LoginForm/LoginForm";
import FanioContext from "../FanioContext";

export default class LoginPage extends Component {
  static contextType = FanioContext;
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = (userId) => {
    const { location, history } = this.props;
    const destination =
      (location.state || {}).from || `/users/${userId}/profile`;
    history.push(destination);
    this.context.setLoggedInUser();
  };

  render() {
    return (
      <React.Fragment>
        <h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </React.Fragment>
    );
  }
}
