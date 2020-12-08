import React from "react";
import PersonalInfo from '../PersonalInfo/PersonalInfo'
import Reviews from '../Reviews/Reviews'
import Fandom from '../Fandom/Fandom'
import FanioContext from '../FanioContext'
import './Profile.css'


export default class Profile extends React.Component {
  static contextType = FanioContext
  getFandoms() {
    console.log(this)
    return this.context.fandomList.map(fandom => {
      return <Fandom {...fandom} />
    })
  }
  render() {
    return (
      <React.Fragment>
        <PersonalInfo />
        <Reviews />
        {this.getFandoms()}
      </React.Fragment>
    );
  }
}
