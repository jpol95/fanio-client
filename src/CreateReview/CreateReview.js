import React from "react";
import "./CreateReview.css";

export default class CreateReview extends React.Component {
  render() {
    return (
      <div className="create">
        <p>Write a review</p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" />
        <label htmlFor="rating">Rating</label>
        <input id="rating" type="text" />
        <label htmlFor="review">Review</label>
        <textarea id="review" type="text">
        </textarea>
        <label htmlFor="tags">Tags</label>
        <input id="tags" type="text" />
        <button>Create Review</button>
      </div>
    );
  }
}
