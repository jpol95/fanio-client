import React from "react";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import Reviews from "../Reviews/Reviews";
import Fandom from "../Fandom/Fandom";
import FanioContext from "../FanioContext";
import "./Profile.css";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  static contextType = FanioContext;
  userId = Number(this.props.match.params.userId)
  isLoggedInUser = this.context.loggedInUser === this.userId
  getFandoms() {
    // console.log(this.context.fandomList)
    return this.context.fandomList.map(fandom => {
      return <Fandom key={fandom.id} {...this.props} {...fandom} />
    })
  }

  render() {

    return (
      <React.Fragment>
        <PersonalInfo />
        <Reviews />
        {this.getFandoms()}
        {this.isLoggedInUser && <Link to={`/users/${this.userId}/create-fandom`}>Create Fandom</Link>}
      </React.Fragment>
    );
  }
}
