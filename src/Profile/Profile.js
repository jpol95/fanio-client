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
  getFandoms() {
    // console.log(this.context.fandomList)
    const fandomList =  this.context.fandomList.map(fandom => {
      return <Fandom key={fandom.id} {...this.props} {...fandom} />
    })
    fandomList.sort((a,b) => {
     return a.props.id - b.props.id
    })
    return fandomList
  }

  render() {
    const isLoggedInUser = this.context.loggedInUser === this.userId
    return (
      <React.Fragment>
        <PersonalInfo />
        <Reviews />
        {this.getFandoms()}
        {isLoggedInUser && <Link to={`/users/${this.userId}/create-fandom`}>Create Fandom</Link>}
      </React.Fragment>
    );
  }
}
