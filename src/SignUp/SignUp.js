import React from "react";
import "./SignUp.css";

export default class Signup extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class="basic">
          <p> Basic account information </p>
          <label for="username">Username</label>
          <input id="username" type="text" />
          <label for="pw">Password</label>
          <input id="pw" type="text" />
          <label for="pw-confirm">Confirm Password</label>
          <input id="pw-confirm" type="text" />
          <label for="username">Profile Picture</label>
          <button> Browse </button>
        </div>

        <div class="personal">
          <p>Tell us about yourself</p>
          <label for="username">Name</label>
          <input id="username" type="text" />
          <label for="fandoms">Fandoms</label>
          <input id="fandoms" type="text" />
          <label for="hobbies">Hobbies</label>
          <input id="hobbies" type="text" />
          <label for="interests">Interests</label>
          <input id="interests" type="text" />
          <label for="city">City</label>
          <input id="city" type="text" />
          <label for="education">Education</label>
          <input id="education" type="text" />
        </div>
        <button>Create Profile</button>
      </React.Fragment>
    );
  }
}
