import React from "react";
import "./Section.css";
import FanioContext from "../FanioContext";
import { Link } from "react-router-dom";
import FetchService from "../FetchService";

export default class Section extends React.Component {
  state = {
    clicked: false,
  };
  static contextType = FanioContext;

  fandomId = this.props.match.params.fandomId;
  installmentId = this.props.match.params.installmentId;
  sectionId = this.props.id;
  userId = Number(this.props.match.params.userId);
  isLoggedInUser = this.context.loggedInUser === this.userId;

  getReview(element) {
    return this.context.reviewList.find(
      (review) => review.id === element.reviewId
    );
  }

  getSubDisplay() {
    return (
      <React.Fragment>
        <div className="subsection-list ">{this.getSubSections()}</div>
        {this.isLoggedInUser && (
          <Link
            className="add-subs-link"
            to={`/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/add-subs-form`}
          >
            Add {this.props.type.subName}s
          </Link>
        )}
      </React.Fragment>
    );
  }

  handleDeleteSub = (e, subId) => {
    e.preventDefault();
    FetchService.deleteSub(subId).then(() => {
      this.context.handleDeleteSub(subId);
    });
  };

  handleDeleteSection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    FetchService.deleteSection(this.sectionId).then(() => {
      this.context.handleDeleteSection(this.sectionId);
    });
  };

  handleEditSection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(
      `/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/edit-section`,
      "_self"
    );
  };

  handleEditSub = (e, subId) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(
      `/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/subs/${subId}/edit-sub`,
      "_self"
    );
  };

  getSubSections() {
    const subSections = this.context.subList
      .filter((subSection) => {
        return subSection[`sectionId`] === this.sectionId;
      })
      .map((subSection) => {
        const subReview = this.getReview(subSection);
        return (
          <Link
            {...subSection}
            to={
              subReview
                ? `/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/subs/${subSection.id}/review/${subReview.id}`
                : ""
            }
            key={subSection.id}
            onClick={(e) => {
              e.stopPropagation();
              if (!subReview) e.preventDefault();
            }}
            className={`episode ${!subReview ? "disabled-link" : ""}`}
          >
            <div className="label">
              {`${
                this.props.type.subName.charAt(0).toUpperCase() +
                this.props.type.subName.slice(1)
              } ${subSection.order}`}
            </div>
            {subSection.title}{" "}
            {subReview ? (
              <p> {subReview.content.substring(0, 100)}</p>
            ) : this.isLoggedInUser ? (
              <>
                <br />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(
                      `/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/subs/${subSection.id}/reviews/create-review`,
                      "_self"
                    );
                  }}
                >
                  {" "}
                  Write Review{" "}
                </button>
              </>
            ) : (
              ""
            )}
            {this.isLoggedInUser && (
              <>
                <button
                  onClick={(e) => {
                    this.handleEditSub(e, subSection.id);
                  }}
                >
                  Edit
                </button>
                <button onClick={(e) => this.handleDeleteSub(e, subSection.id)}>
                  Delete
                </button>
              </>
            )}
          </Link>
        );
      });

    subSections.sort((a, b) => a.props.order - b.props.order);

    return subSections;
  }

  render() {
    const review = this.getReview(this.props);
    return (
      <div className="fandom-comp">
        <div
          onClick={() => this.setState({ clicked: !this.state.clicked })}
          className="section"
        >
          <div className="label">
            {`${
              this.props.type.sectionName.charAt(0).toUpperCase() +
              this.props.type.sectionName.slice(1)
            } ${this.props.order}`}
          </div>
          {this.props.title}
          {<br />}
          {review ? (
            <React.Fragment>
              <p>{review.content.substring(0, 100)}</p>
              <Link
                className="full-page-link write-review-button"
                to={`/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/review/${review.id}`}
              >
                View Full Review
              </Link>
            </React.Fragment>
          ) : this.isLoggedInUser ? (
            <Link
              className="write-review-button"
              to={`/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/reviews/create-review`}
            >
              {" "}
              Write Review{" "}
            </Link>
          ) : (
            ""
          )}
          {this.isLoggedInUser && (
            <>
              <br />
              <button onClick={this.handleEditSection}>Edit</button>
              <button onClick={this.handleDeleteSection}>Delete</button>
            </>
          )}
          {this.state.clicked &&
            this.props.type.subName &&
            this.getSubDisplay()}
        </div>
      </div>
    );
  }
}
