import React from "react";
import "./NavBar.css";
import TokenService from "../Services/token-service";
import { Link } from "react-router-dom";
import FetchService from "../FetchService";
import FanioContext from "../FanioContext";
import bg11 from '../backgrounds/bg11.jpeg'
import bg15 from '../backgrounds/bg15.jpeg'

export default class NavBar extends React.Component {
  static contextType = FanioContext

  picArray = [bg11, bg15]
  chosenPic = this.picArray[Math.round(Math.random())]
  handleDeleteAccount = () => {

    const userId = this.context.loggedInUser
    FetchService.deleteUser(userId)
    .then(() =>{
    TokenService.clearAuthToken()
    window.open("/signup", "_self")
    }
    )
  }
  render() {
    const userId = this.context.loggedInUser
    return (
      <header>
        <div className="navbar">
          <div className="logo">FANIO</div>
          {TokenService.hasAuthToken() ? (
            <div className="navbar-buttons">
            <button onClick={() => window.open(`/users/${userId}/profile`, "_self")}>Home</button>
            <button onClick={() => {TokenService.clearAuthToken(); window.open("/login", "_self")}}>Log Out</button>
            <button onClick={this.handleDeleteAccount} >Delete Account</button>
            </div>
          ) : (
            <div className="navbar-buttons">
            <Link className="login-link" to="/login">Log In</Link>
            <Link className="create-account-link" to="/signup">Create Account</Link>
            <Link className="landing-page-link" to="/landing">About</Link>
            </div>
          )}
        </div>
        <img alt="background" className="background" src={this.chosenPic} />
      </header>
    );
  }
}
