import React from "react";
import Season from '../Season/Season'
import './Fandom.css'
import FanioContext from '../FanioContext'

export default class Fandom extends React.Component {

  static contextType = FanioContext

  // getSeasons(){
  //   this.context.seasonList
  // }
  render() {
    return (
      <div className="fandom-view">
        <h4>Fandom Section</h4>
        <Season />
        <Season />
        <Season />
      </div>
    );
  }
}
