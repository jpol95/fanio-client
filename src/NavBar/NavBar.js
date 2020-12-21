import React from "react";
import "./NavBar";
import TokenService from "../Services/token-service";
import { Link } from "react-router-dom";
import FetchService from "../FetchService";
import FanioContext from "../FanioContext";

export default class NavBar extends React.Component {
  static contextType = FanioContext
  handleDeleteAccount = () => {
    // console.log("hello")
    // console.log("kjrenflkrejnfrewljknf")
    // console.log(this.context)
    const userId = this.context.loggedInUser
    FetchService.deleteUser(userId)
    .then(() =>{
    TokenService.clearAuthToken()
    window.open("/signup", "_self")
    }
    )
  }
  render() {
    return (
      <header>
        <div className="navbar">
          Nav Bar
          {TokenService.hasAuthToken() ? (
            <>
            <button onClick={() => {TokenService.clearAuthToken(); window.open("/login", "_self")}}>Log Out</button>
            <button onClick={this.handleDeleteAccount} >Delete Account</button>
            </>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </div>
      </header>
    );
  }
}
