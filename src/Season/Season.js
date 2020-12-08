import React from "react";
import "./Season.css";
import FanioContext from "../FanioContext";
import { Link } from "react-router-dom";

export default class Season extends React.Component {
  static contextType = FanioContext;

  getReview() {
    console.log(this.context);
    return this.context.reviewList.find(
      (review) => review.id === this.props.reviewId
    );
  }

  getEpisodes() {
    return this.context.episodeList
      .filter((episode) => episode.seasonId === this.props.id)
      .map((episode) => {
        return (
          <Link key={episode.id} className="episode">
            {episode.name} <button>Write Review</button>
          </Link>
        );
      });
  }
  render() {
    const review = this.getReview();
    return (
      <div className="fandom-comp">
        <div className="season">
          {this.props.name}
          {<br />}
          {review ? (
            review.content.substring(0, 100) 
            <button>View Full Review</button>
          ) : (
            
            <button>Write Review</button>
          )}
          <div className="episode-list ">{this.getEpisodes()}</div>
          <button>Add episode</button>
          <label className="hidden" htmlFor={`add-episode ${this.props.id}`}>
            Add episode
          </label>
          <input
            className="hidden"
            id={`add-episode ${this.props.id}`}
            type="text"
          />
        </div>
      </div>
    );
  }
}
