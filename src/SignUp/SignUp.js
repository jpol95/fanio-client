import React from "react";
import "./SignUp.css";

export default class Signup extends React.Component {
  render() {
    return (
      <form class="new-user-form">
        <div className="basic">
          <p> Basic account information </p>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" />
          <label htmlFor="pw">Password</label>
          <input id="pw" type="text" />
          <label htmlFor="pw-confirm">Confirm Password</label>
          <input id="pw-confirm" type="text" />
        </div>

        <div className="personal">
          <p>Tell us about yourself</p>
          <label htmlFor="username">Name</label>
          <input id="username" type="text" />
          <label htmlFor="fandoms">Fandoms</label>
          <input id="fandoms" type="text" />
          <label htmlFor="hobbies">Hobbies</label>
          <input id="hobbies" type="text" />
          <label htmlFor="interests">Interests</label>
          <input id="interests" type="text" />
          <label htmlFor="city">City</label>
          <input id="city" type="text" />
          <label htmlFor="education">Education</label>
          <input id="education" type="text" />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    );
  }
}
