import React from "react";
import "./CreateReview.css";

export default class CreateReview extends React.Component {
  state = {
    title: {value: "", touched: false}, 
    rating: {value: null, touched: false}, 
    content: {value: "", touched: false}, 
    errorString: ''
  }

  handleTitleChange = (title) => {
    const newTitle = {value: title, touched: true}
    this.setState({
      ...this.state, title: newTitle
    })
  }

  handleRatingChange = (rating) => {
    
  }
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
