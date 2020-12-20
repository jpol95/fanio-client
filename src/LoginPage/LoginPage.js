import React, { Component } from "react";
import LoginForm from "../LoginForm/LoginForm";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = (userId) => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    this.props.setLoggedInUser(userId)
    history.push(destination);
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
