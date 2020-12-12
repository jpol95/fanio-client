import React from "react";
import "./Section.css";
import FanioContext from "../FanioContext";
import { Link } from "react-router-dom";

export default class Section extends React.Component {
  static contextType = FanioContext;

  getReview(element) {
    return this.context.reviewList.find(
      (review) => review.id === element.reviewId
    );
  }

  getSubDisplay() {
    return (
      <React.Fragment>
        <div className="subsection-list ">{this.getSubSection()}</div>
        <button>Add {this.props.type.subName}</button>
        <label className="hidden" htmlFor={`add-episode ${this.props.id}`}>
          Add {this.props.type.subName}
        </label>
        <input
          className="hidden"
          i
          d={`add-${this.props.type.subName} ${this.props.id}`}
          type="text"
        />
      </React.Fragment>
    );
  }

  getSubSection() {
    const subSection =  this.context[`${this.props.type.subName}List`]
      .filter((subSection) => subSection[`${this.props.type.sectionName}Id`] === this.props.id)
      .map((subSection) => {
        const subReview = this.getReview(subSection);
        return (
          <Link
          {...subSection}
            to={
              subReview
                ? `/users/1/review-main/${subReview.id}`
                : `/users/1/profile`
            }
            key={subSection.id}
            className="episode"
          >
            {`${this.props.type.subName.charAt(0).toUpperCase() + this.props.type.subName.slice(1)} ${subSection.order}`}
            {<br />}
            {subSection.title}{" "}
            {subReview ? (
              <p>{subReview.content.substring(0, 100)}</p>
            ) : (
              <Link to={`/users/1/review-form/${this.props.id}/episode/`}>
                <button> Write Review</button>
              </Link>
            )}
          </Link>
        );
      });
      
      subSection.sort((a,b) => a.props.order - b.props.order)

      return subSection
  }
  render() {
    const review = this.getReview(this.props);
    return (
      <div className="fandom-comp">
        <div className="section">
        {`${this.props.type.sectionName.charAt(0).toUpperCase() + this.props.type.sectionName.slice(1)} ${this.props.order}`}
        {<br />}
          {this.props.title}
          {<br />}
          {review ? (
            <React.Fragment>
              {review.content.substring(0, 100)}
              <Link
                className="full-page-link"
                to={`/users/1/review-main/${review.id}`}
              >
                <button>View Full Review</button>
              </Link>
            </React.Fragment>
          ) : (
            <Link to={`/users/1/review-form/${this.props.id}`}>
              <button>Write Review</button>
            </Link>
          )}
          {this.props.type.hasSubs && this.getSubDisplay()}
        </div>
      </div>
    );
  }
}
