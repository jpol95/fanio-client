import React from "react";
import "./ReviewForm.css";
import FanioContext from "../FanioContext";
import FetchService from "../FetchService";

export default class CreateReview extends React.Component {
  static contextType = FanioContext;

  state = {
    title: { value: this.props.title, touched: false },
    rating: { value: this.props.rating, touched: false },
    content: { value: this.props.content, touched: false },
    tag: { value: "", touched: false},
    tags: { value: this.props.tags, touched: false },
    errorString: "",
  };

  getTagByTitle = (title) => {
    return this.context.tagList.find((tag) => tag.title === title);
  };

  getTagById = (id) => {
    return this.context.tagList.find((tag) => tag.id === Number(id));
  };

  displayTagList = () => {
    return this.context.tagList.map((tag) => {
      return (
        <option value={tag.title} key={tag.id} id={tag.id}>
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

  handleTagChange = (title) => {
    this.setState({
      ...this.state,
      tag: { value: title, touched: true },
    });
  };

  handleTagAdd = (e) => {
    e.preventDefault()
    // console.log(this.state.tag.value)
    const tag = this.getTagByTitle(this.state.tag.value)
    if (!tag || this.state.tags.value.includes(tag.id)) return 
    this.setState({
      ...this.state,
      tags: { value: [...this.state.tags.value, tag.id], touched: true },
    });
  }

  handleContentChange = (content) => {
    // console.log(this.state.content)
    const newContent = { value: content, touched: true };
    this.setState({
      ...this.state,
      content: newContent,
    });
  };

  displayTags = () => {
    return this.state.tags.value.map((tag) => (
      <span key={tag}> <div className="tag-list-el"><button id={tag} onClick={(e) => this.handleRemoveTag(e)} className="tag-cancel">x</button>{this.getTagById(tag).title}</div></span>
    ));
  };

  handleRemoveTag = (e) => {
    e.preventDefault()
    const newTags = this.state.tags.value.filter(tag => tag !== Number(e.target.id))
    this.setState({
      tags: {value: newTags, touched: true}
    })

  }

  createReviewObject = () => {
    return {
      title: this.state.title.value,
      rating: this.state.rating.value,
      content: this.state.content.value,
      tags: this.state.tags.value,
    };
  };

  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(e, this.createReviewObject())} className="create">
        <label htmlFor="title">Title</label>
        <input
          onChange={(e) => this.handleTitleChange(e.target.value)}
          id="title"
          type="text"
        />
        <label htmlFor="rating">Rating</label>
        <input
          onChange={(e) => this.handleRatingChange(e.target.value)}
          id="rating"
          type="text"
        />
        <label htmlFor="content">Review</label>
        
        <textarea
          onChange={(e) => this.handleContentChange(e.target.value)}
          id="content"
          type="text"
        ></textarea>
        <label htmlFor="tag-input">Tags</label>
        <input onChange={(e) => this.handleTagChange(e.target.value)} list="tags" id="tag-input" />
        <button onClick={this.handleTagAdd}>Add Tag</button>
        <datalist
          id="tags"
          type="text"
          >
          {this.displayTagList()}
        </datalist>
        <br />
        <div className="tag-list">{this.displayTags()}</div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
