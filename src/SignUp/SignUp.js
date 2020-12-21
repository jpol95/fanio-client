import React from "react";
import "./SignUp.css";
import FetchService from '../FetchService'


export default class Signup extends React.Component {
  state={
    username: {touched: false, value: ""}, 
    password: {touched: false, value: ""}, 
    passwordConfirm: {touched: false, value: ""},
    name: {touched: false, value: ""}, 
    interests: {touched: false, value: ""}, 
    city: {touched: false, value: ""}, 
    education: {touched: false, value: ""}
  }

  handleUsernameChange = (e) => {
    const username = e.target.value
    this.setState({
      ...this.state, username : {touched:true,  value: username}
    })
  }

  handlePasswordChange = (e) => {
    const password = e.target.value
    this.setState({
      ...this.state, password : {touched:true,  value: password}
    })
  }

  handlePasswordConfirmChange = (e) => {
    const passwordConfirm = e.target.value
    this.setState({
      ...this.state, passwordConfirm:  {touched:true,  value: passwordConfirm}
    })
  }


  handleNameChange = (e) => {
    const name = e.target.value
    this.setState({
      ...this.state,  name: {touched:true,  value: name}
    })
  }

  handleInterestsChange = (e) => {
    const interests = e.target.value
    this.setState({
      ...this.state, interests : {touched:true,  value: interests}
    })
  }

  handleCityChange = (e) => {
    const city = e.target.value
    this.setState({
      ...this.state, city :  {touched:true,  value: city}
    })
  }

  handleEducationChange = (e) => {
    const education = e.target.value
    this.setState({
      ...this.state, education :  {touched:true,  value: education}
    })
  }

  handleSubmitUser = (e) => {
    e.preventDefault()
    const user = {
      username: this.state.username.value, 
      password: this.state.password.value, 
      name: this.state.name.value, 
      interests: this.state.interests.value.split(","),
      city: this.state.city.value, 
      education: this.state.education.value
    }
    FetchService.postUser(user)
    .then(() => {
      window.open("/login", "_self")
    })
  }

  //finish user sign up on client and server*/
  render() {
    // console.log(this.state)
    return (
      <form onSubmit={this.handleSubmitUser} className="new-user-form">
        <div className="basic">
          <p> Basic account information </p>
          <label htmlFor="username">Username</label>
          <input id="username" onChange={this.handleUsernameChange} type="text" />
          <label htmlFor="pw">Password</label>
          <input id="pw" onChange={this.handlePasswordChange} type="text" />
          <label htmlFor="pw-confirm">Confirm Password</label>
          <input id="pw-confirm" onChange={this.handlePasswordConfirmChange} type="text" />
        </div>

        <div className="personal">
          <p>Tell us about yourself</p>
          <label htmlFor="interests">Interests</label>
          <input id="interests" onChange={this.handleInterestsChange} type="text" />
          <label htmlFor="city">City</label>
          <input id="city" onChange={this.handleCityChange} type="text" />
          <label htmlFor="education">Education</label>
          <input id="education" onChange={this.handleEducationChange} type="text" />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    );
  }
}
