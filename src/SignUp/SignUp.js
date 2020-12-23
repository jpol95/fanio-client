import React from "react";
import "./SignUp.css";
import FetchService from '../FetchService'
import SignUpForm from '../SignUpForm/SignUpForm'

export default class Signup extends React.Component {

  state={
    username: {touched: false, value: ""}, 
    password: {touched: false, value: ""}, 
    passwordConfirm: {touched: false, value: ""},
  }

  handleUsernameChange = (e) => {
    const username = e.target.value
    this.setState({
      ...this.state, username : {touched: true,  value: username}
    })
  }

  handlePasswordChange = (e) => {
    const password = e.target.value
    this.setState({
      ...this.state, password : {touched: true,  value: password}
    })
  }

  handlePasswordConfirmChange = (e) => {
    const passwordConfirm = e.target.value
    this.setState({
      ...this.state, passwordConfirm:  {touched: true,  value: passwordConfirm}
    })
  }


//   handleNameChange = (e) => {
//     const name = e.target.value
//     this.setState({
//       ...this.state,  name: {touched: true,  value: name}
//     })
//   } WHY did I take this out again????    




  handleSubmitUser = (e, personalInfo) => {
    e.preventDefault()
    const user = {
      username: this.state.username.value, 
      password: this.state.password.value, 
      fullname: personalInfo.fullname, 
      interests: personalInfo.interests.value.split(","),
      city: personalInfo.city.value, 
      education: personalInfo.education.value
    }
    FetchService.postUser(user)
    .then(() => {
      window.open("/login", "_self")
    })
  }

  //finish user sign up on client and server*/
  render() {
    // console.log(this.state)
    const personalInfo = {name: "", interests: "", city: "", education: ""}
    return (

        <SignUpForm handleSubmitUser={this.handleSubmitUser} {...personalInfo} >
        <div className="basic">
          <p> Basic account information </p>
          <label htmlFor="username">Username</label>
          <input id="username" onChange={this.handleUsernameChange} type="text" />
          <label htmlFor="pw">Password</label>
          <input id="pw" onChange={this.handlePasswordChange} type="text" />
          <label htmlFor="pw-confirm">Confirm Password</label>
          <input id="pw-confirm" onChange={this.handlePasswordConfirmChange} type="text" />
        </div>
             </SignUpForm>
    );
  }
}
