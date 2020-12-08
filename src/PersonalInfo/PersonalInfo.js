import React from "react";
import './PersonalInfo.css'

export default class PersonalInfo extends React.Component {
  render() {
    return (
      <div className="personal">
        <div className="profile-picture">
          <p>Profile picture goes here</p>
        </div>
        <p>Here's some information about me.</p>
      </div>
    );
  }
}
