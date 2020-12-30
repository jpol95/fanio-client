import React from "react";
import "./PersonalInfo.css";
import FanioContext from "../FanioContext";
import { Link } from "react-router-dom";

export default class PersonalInfo extends React.Component {
  userId = this.props.userId;
  getInterests() {
    return this.context.currentLoadedUser.interests
      .split(",")
      .map((interest, index) => {
        return <p key={index}>{interest}</p>;
      });
  }

  static contextType = FanioContext;
  render() {
    if (!this.context.currentLoadedUser) return null;
    const isLoggedInUser = this.context.loggedInUser === this.userId;
    const user = this.context.currentLoadedUser;
    return (
      <div className="personal">
        <h1>{user.username}</h1>
        {user.fullname && (
          <>
            <h3>Full name</h3>
            <p>{user.fullname}</p>
          </>
        )}
        {user.education && (
          <>
            <h3>Education</h3>
            <p>{user.education}</p>
          </>
        )}
        {user.city && (
          <>
            <h3>City</h3>
            <p>{user.city}</p>
          </>
        )}
        {this.getInterests() && (
          <>
            <h3>Interests</h3>
            {this.getInterests()}
          </>
        )}
        {isLoggedInUser && (
          <Link
            className="edit-personal-link"
            to={`/users/${this.userId}/edit-user`}
          >
            Edit
          </Link>
        )}
      </div>
    );
  }
}
