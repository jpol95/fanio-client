import React from "react";
import "./SignUpForm.css";
import FetchService from '../FetchService'


export default class SignupForm extends React.Component {
  state={
    fullname: {touched: false, value: this.props.fullname}, 
    interests: {touched: false, value: this.props.interests}, 
    city: {touched: false, value: this.props.city}, 
    education: {touched: false, value: this.props.education}
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


  //finish user sign up on client and server*/
  render() {
    // console.log(this.state)
    return (
      <form onSubmit={(e) => this.props.handleSubmitUser(e, this.state)} className="new-user-form">
        {this.props.children}
        <div className="personal">
          <p>Tell us about yourself</p>
          <label htmlFor="fullname">Full Name</label>
          <input defaultValue={this.state.fullname.value} id="fullname" onChange={this.handleFullnameChange} type="text" />
          <label htmlFor="interests">Interests</label>
          <input defaultValue={this.state.interests.value} id="interests" onChange={this.handleInterestsChange} type="text" />
          <label htmlFor="city">City</label>
          <input defaultValue={this.state.city.value} id="city" onChange={this.handleCityChange} type="text" />
          <label htmlFor="education">Education</label>
          <input defaultValue={this.state.education.value} id="education" onChange={this.handleEducationChange} type="text" />
        </div>
        <button className="submit-account-button" type="submit">Submit</button>
      </form>
    );
  }
}
