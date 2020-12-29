import React from "react";
import "./NavBar.css";
import TokenService from "../Services/token-service";
import { Link } from "react-router-dom";
import FetchService from "../FetchService";
import FanioContext from "../FanioContext";
import logo2 from '../images/logo2.PNG'
import bg1 from '../backgrounds/bg1.jpg'
import bg2 from '../backgrounds/bg2.jpg'
import bg3 from '../backgrounds/bg3amieclostio.jpg'
import bg4 from '../backgrounds/bg3mikesarda.jpg'
import bg5 from '../backgrounds/bg4.jpg'
import bg6 from '../backgrounds/bg5.jpg'
import bg7 from '../backgrounds/bg6.jpg'
import bg8 from '../backgrounds/bg7.jpg'
import bg9 from '../backgrounds/bg8.jpg'
import bg10 from '../backgrounds/bg9.png'
import bg11 from '../backgrounds/bg10.png'

export default class NavBar extends React.Component {
  static contextType = FanioContext

  picArray = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11]
  chosenPic = this.picArray[Math.round(Math.random()*10)]
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
    const userId = this.context.loggedInUser
    return (
      <header>
        <div className="navbar">
          <img src={logo2}/>
          {TokenService.hasAuthToken() ? (
            <div className="navbar-buttons">
            <button onClick={() => window.open(`/users/${userId}/profile`, "_self")}>Home</button>
            <button onClick={() => {TokenService.clearAuthToken(); window.open("/login", "_self")}}>Log Out</button>
            <button onClick={this.handleDeleteAccount} >Delete Account</button>
            </div>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </div>
        <img className="background" src={this.chosenPic} />
      </header>
    );
  }
}
