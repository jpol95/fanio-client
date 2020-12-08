import React from "react";
import Season from '../Season/Season'
import './Fandom.css'
import FanioContext from '../FanioContext'

export default class Fandom extends React.Component {

  static contextType = FanioContext

  getSeasons(){
    return this.context.seasonList
    .filter(season => season.fandomId === this.props.id)
    .map(season => {
      return <Season {...season} />
    })
  }

  render() {
    return (
      <div className="fandom-view">
        <h4>{this.props.name}</h4>
        {this.getSeasons()}
      </div>
    );
  }
}
