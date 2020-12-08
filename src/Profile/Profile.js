import React from "react";
import PersonalInfo from '../PersonalInfo/PersonalInfo'
import Reviews from '../Reviews/Reviews'
import Fandom from '../Fandom/Fandom'
import './Profile.css'

export default class Profile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PersonalInfo />
        <Reviews />
        <Fandom />
      </React.Fragment>
    );
  }
}
