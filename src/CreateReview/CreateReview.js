import React from "react";
import "./CreateReview.css";
import FanioContext from "../FanioContext";

export default class CreateReview extends React.Component {
  static contextType = FanioContext;
  reviewId = Math.round(Math.random()*1000000000)
  state = {
    id: this.reviewId,
    title: { value: "", touched: false },
    rating: { value: null, touched: false },
    content: { value: "", touched: false },
    tags: { value: [], touched: false },
    errorString: "",
  };

  getTagById = (id) => {
    return this.context.tagList.find(tag => tag.id === Number(id))
  }
  
  displayTagList = () => {
    return this.context.tagList.map((tag) => {
      return (
        <option value={tag.id} key={tag.id} id={tag.id}>
          {tag.name}
        </option>
      );
    });
  };

  handleTitleChange = (title) => {
    const newTitle = { value: title, touched: true };
    this.setState({
      ...this.state,
      title: newTitle,
    });
  };

  handleRatingChange = (rating) => {
    const newRating = { value: rating, touched: true };
    this.setState({
      ...this.state,
      rating: newRating,
    });
  };

  handleTagChange = (tag) => {
    if (this.state.tags.value.includes(tag.value)) return 
    this.setState({
      ...this.state,
      tags: { value: [...this.state.tags.value, tag.value], touched: true },
    });
  };

  handleContentChange = (content) => {
    // console.log(this.state.content)
    const newContent = {value: content, touched: true}
    this.setState({
      ...this.state, content: newContent
    })
  }

  displayTags = () => {
    return this.state.tags.value.map(tag => <span key={tag}>#{this.getTagById(tag).name}</span>)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const reviewObject = {
      id: this.state.id, 
      title: this.state.title.value, 
      rating: this.state.rating.value,
      content: this.state.content.value, 
      tags: this.state.tags.value, 
    }
    // this.props.history.push(`/users/${}`)
    this.context.handleSubmit(reviewObject)
    
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className="create">
        <p>Write a review</p>
        <label htmlFor="title">Title</label>
        <input onChange={(e) => this.handleTitleChange(e.target.value)} id="title" type="text" />
        <label htmlFor="rating">Rating</label>
        <input onChange={(e) => this.handleRatingChange(e.target.value)} id="rating" type="text" />
        <label htmlFor="content">Review</label>
        <textarea onChange={(e) => this.handleContentChange(e.target.value)} id="content" type="text"></textarea>
        <label htmlFor="tags">Tags</label>
        <select  onChange={(e) => this.handleTagChange(e.target)} id="tags" type="text">
        {this.displayTagList()}
        </select>
        <br />
        {this.displayTags()}
        <button>Create Review</button>
      </form>
    );
  }
}
