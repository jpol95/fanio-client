import React from "react";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import Fandom from "../Fandom/Fandom";
import FanioContext from "../FanioContext";
import "./Profile.css";
import { Link } from "react-router-dom";
import divider2 from "../dividers/divider2.PNG";

export default class Profile extends React.Component {
  static contextType = FanioContext;
  userId = Number(this.props.match.params.userId);
  getFandoms() {
    const fandomList = this.context.fandomList.map((fandom) => {
      return <Fandom key={fandom.id} {...this.props} {...fandom} />;
    });
    fandomList.sort((a, b) => {
      return a.props.id - b.props.id;
    });
    return fandomList;
  }

  render() {
    const isLoggedInUser = this.context.loggedInUser === this.userId;
    return (
      <React.Fragment>
        <div className="profile-label">PROFILE</div>
        <PersonalInfo userId={this.userId} />
        {/* <Reviews /> */}
        <div className="profile-label">FANDOMS</div>
        <img alt="superhero divider" className="divider" src={divider2} />
        {this.getFandoms()}
        {isLoggedInUser && (
          <Link
            className="create-fandom-button"
            to={`/users/${this.userId}/create-fandom`}
          >
            Create Fandom
          </Link>
        )}
      </React.Fragment>
    );
  }
}
