import React from "react";
import "./NavBar";
import TokenService from "../Services/token-service";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
  render() {
    return (
      <header>
        <div className="navbar">
          Nav Bar
          {TokenService.hasAuthToken() ? (
            <Link onClick={() => {TokenService.clearAuthToken(); window.open("/login", "_self")}}>Log Out</Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </div>
      </header>
    );
  }
}
