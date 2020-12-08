import React from "react";
import "./Season.css";

export default class Season extends React.Component {
  render() {
    return (
      <div className="fandom-comp">
        <div className="season">
          Season 7<button>Write Review</button>
          <div className="episode-list ">
            <div className="episode">
              Episode 1 1 star <button>Write Review</button>
            </div>
            <div className="episode">
              Episode 2 2 stars<button>Write Review</button>
            </div>
            <div className="episode">
              Episode 3 3 stars<button>Write Review</button>
            </div>
            <div className="episode">
              Episode 4 4 stars<button>Write Review</button>
            </div>
            <div className="episode">
              Episode 5 5 stars<button>Write Review</button>
            </div>
            <div className="episode">
              Episode 6 1 stars<button>Write Review</button>
            </div>
            <div className="episode" id="last">
              Episode 7 2 stars<button>Write Review</button>
            </div>
          </div>
          <button>Add episode</button>
          <label htmlFor="add-episode">Add episode</label>
          <input id="add-episode" type="text" />
        </div>
      </div>
    );
  }
}
