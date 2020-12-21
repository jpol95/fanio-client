import React from "react";
import "./ReviewMain.css";
import FanioContext from "../FanioContext";

export default class ReviewMain extends React.Component {
  static contextType = FanioContext;

  userId = Number(this.props.match.params.userId);
  isLoggedInUser = this.context.loggedInUser === this.userId;
  getReview() {
    // console.log(this.props)
    return this.context.reviewList.find(
      (review) => review.id === Number(this.props.match.params.reviewId)
    );
  }

  handleDeleteReview() {}

  getTags(reviewId) {
    return this.context.reviewTagList
      .filter((tag) => reviewId === tag.reviewId)
      .map((tag) => (
        <span key={tag.tagId}>
          #
          {
            this.context.tagList.find((tListTag) => tListTag.id === tag.tagId)
              .title
          }
        </span>
      ));
  }
  render() {
    const review = this.getReview();
    if (!review) return null;
    const tags = this.getTags(review.id);
    return (
      <div className="review-full">
        <h2>{review.title}</h2>
        <p>{review.rating} stars</p>
        <p>{tags}</p>
        <p>{review.content}</p>
        {this.isLoggedInUser && (
          <>
            <button>Edit Review</button>
            <button onClick={this.handle}>Delete Review</button>
          </>
        )}
      </div>
    );
  }
}
