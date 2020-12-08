import React from "react";
import "./Season.css";
import FanioContext from "../FanioContext";
import { Link } from "react-router-dom";

export default class Season extends React.Component {
  static contextType = FanioContext;

  getReview(element) {
    return this.context.reviewList.find(
      (review) => review.id === element.reviewId
    );
  }

  getEpisodes() {
    return this.context.episodeList
      .filter((episode) => episode.seasonId === this.props.id)
      .map((episode) => {
        const epReview = this.getReview(episode);
        return (
          <Link
            to={
              epReview
                ? `/users/1/review-main/${epReview.id}`
                : `/users/1/profile`
            }
            key={episode.id}
            className="episode"
          >
            {episode.name}{" "}
            {epReview ? (
              <p>{epReview.content.substring(0, 100)}</p>
            ) : (
              <button> Write Review</button>
            )}
          </Link>
        );
      });
  }
  render() {
    const review = this.getReview(this.props);
    return (
      <div className="fandom-comp">
        <div className="season">
          {this.props.name}
          {<br />}
          {review ? (
            <React.Fragment>
              {review.content.substring(0, 100)}
              <Link className="full-page-link" to={`/users/1/review-main/${review.id}`}>
                <button>View Full Review</button>
              </Link>
            </React.Fragment>
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
