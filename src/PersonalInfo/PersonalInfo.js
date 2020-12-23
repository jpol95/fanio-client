import React from "react";
import './PersonalInfo.css'
import FanioContext from '../FanioContext'

export default class PersonalInfo extends React.Component {

  getInterests() {
    return this.context.currentLoadedUser.interests.split(",").map((interest, index) => {
      return <p key={index}>{interest}</p>
    })
  }

  static contextType = FanioContext
  render() {
    if (!this.context.currentLoadedUser) return null
    const user = this.context.currentLoadedUser
    return (
      <div className="personal">
        <h1>{user.username}</h1>
        <h3>Full name</h3>
        <p>{user.fullname}</p>
        <h3>Education</h3>
        <p>{user.education}</p>
        <h3>City</h3>
        <p>{user.city}</p>
        <h3>Interests</h3>
        {this.getInterests()}
      </div>
    );
  }
}
