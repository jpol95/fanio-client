import React from "react";
import Season from '../Season/Season'
import './Fandom.css'

export default class Fandom extends React.Component {
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
