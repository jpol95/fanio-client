import React from "react";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import Reviews from "../Reviews/Reviews";
import Fandom from "../Fandom/Fandom";
import FanioContext from "../FanioContext";
import "./Profile.css";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  static contextType = FanioContext;
  getFandoms() {
    // console.log(this.context.fandomList)
    return this.context.fandomList.map(fandom => {
      return <Fandom key={fandom.id} {...fandom} />
    })
  }


  render() {

    return (
      <React.Fragment>
        <PersonalInfo />
        <Reviews />
        {this.getFandoms()}
        <Link to={`/users/1/fandom-form`}>Create Fandom</Link>
      </React.Fragment>
    );
  }
}
