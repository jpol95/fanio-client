import React from "react";
import "./SignUp.css";
import FetchService from '../FetchService'
import SignUpForm from '../SignUpForm/SignUpForm'
import './SignUp.css'

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


  invalidUsername = () => {
    if (!this.state.username.value)
      return <div class="error">Username is required</div>
  }

  invalidPassword = () => {
    if (this.state.password.value.length < 8) {
      return <div class="error">Password must be longer than 8 characters </div>
    }
    if (this.state.password.value.length > 72) {
      return <div class="error">Password must be less than 72 characters</div>
    }
   if (this.state.password.value.startsWith(' ')) {
     return <div class="error">Password must not start or end with empty spaces</div>
   }
   if (this.state.password.value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/))
    return <div class="error">Password must contain a lower case character, an upper case character, a number and a special character</div>
  }
  
  invalidConfirmPassword = () => {
    if (this.state.password.value === this.state.confirmPassword.value)
      return <div class="error">Password must contain a lower case character, an upper case character, a number and a special character</div>
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

  canSubmit = () => {
   return this.invalidConfirmPassword() || this.invalidPassword()
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
          {this.state.password.touched && this.invalidPassword()}
          <input id="pw" onChange={this.handlePasswordChange} type="text" />
          <label htmlFor="pw-confirm">Confirm Password</label>
          {this.state.confirmPassword.touched && this.invalidConfirmPassword()}
          <input id="pw-confirm" onChange={this.handlePasswordConfirmChange} type="text" />
        </div>
             </SignUpForm>
    );
  }
}
