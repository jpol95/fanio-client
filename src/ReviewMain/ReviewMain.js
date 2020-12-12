import React from "react";
import "./ReviewMain.css";
import FanioContext from '../FanioContext'

export default class ReviewMain extends React.Component {
  static contextType = FanioContext
  getReview() {
    // console.log(this.props)
    return this.context.reviewList.find(review => review.id === Number(this.props.match.params.reviewId))
  }

  getTags(reviewId) {
    return this.context.reviewTagList
    .filter(tag => reviewId === tag.reviewId)
    .map(tag => <span key={tag.tagId}>#{this.context.tagList.find(tListTag => tListTag.id === tag.tagId).name}</span>)
  }
  render() {
    const review = this.getReview()
    if (!review) return null
    const tags = this.getTags(review.id)
    return (
      <div className="review-full">
        <h2>{review.title}</h2>
        <p>{review.rating} stars</p>
        <p>
          {tags}
        </p>
        <p>
          {review.content}
        </p>
        <button>Edit Review</button>
        <button>Delete Review</button>
      </div>
    );
  }
}
