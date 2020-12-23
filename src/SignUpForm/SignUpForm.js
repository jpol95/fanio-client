import React from "react";
import "./SignUpForm.css";
import FetchService from '../FetchService'


export default class SignupForm extends React.Component {
  state={
    fullname: {touched: false, value: ""}, 
    interests: {touched: false, value: ""}, 
    city: {touched: false, value: ""}, 
    education: {touched: false, value: ""}
  }


  handleFullnameChange = (e) => {
    const fullname = e.target.value
    this.setState({
      ...this.state,  fullname: {touched:true,  value: fullname}
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
      fullname: this.state.fullname.value, 
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
      <form onSubmit={(e) => this.props.handleSubmitUser(e, this.state)} className="new-user-form">
        {this.props.children}
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
