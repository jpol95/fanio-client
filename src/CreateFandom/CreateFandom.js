import React from "react";
import "./CreateFandom.css";

export default class Fandom extends React.Component {
  render() {
    return (
      <div className="fandom">
        <p>Create a new fandom</p>
        <label htmlFor="workname">Name of work</label>
        <input id="workname" type="text" />
        <label htmlFor="seasons">Number of seasons</label>
        <input id="seasons" type="text" />
        <button>Create New Fandom</button>
      </div>
    );
  }
}
