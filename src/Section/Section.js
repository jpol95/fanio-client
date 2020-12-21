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
  userId = Number(this.props.match.params.userId)
  isLoggedInUser = this.context.loggedInUser === this.userId


  getReview(element) {
    return this.context.reviewList.find(
      (review) => review.id === element.reviewId
    );
  }

  //figure out how to return review not in promise form

  getSubDisplay() {
    return (
      <React.Fragment>
        <div className="subsection-list ">{this.getSubSections()}</div>
        {this.isLoggedInUser && <Link
          to={`/users/1/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/add-subs-form`}
        >
          Add {this.props.type.subName}s
        </Link>}
      </React.Fragment>
    );
  }

  //const link = this.parentName === "installment" ? `/sections/section/${this.props.match.params.installmentId}` : `/sections/sub/${this.props.match.params.sectionId}`
    

  handleDeleteSub = (e, subId) => {
    e.preventDefault()
    FetchService.deleteSub(this.userId, subId)
    .then(() => {
      this.context.handleDeleteSub(subId)
    })
  }

  handleDeleteSection = (e) => {
    e.preventDefault()
    e.stopPropagation()
    FetchService.deleteSection(this.userId, this.sectionId)
    .then(() => {
      this.context.handleDeleteSection(this.sectionId)
    })
  }

  getSubSections() {
    const subSections = this.context.subList
      .filter((subSection) => {
        return (
          subSection[`sectionId`] === this.sectionId
        );
      })
      .map((subSection) => {
        const subReview = this.getReview(subSection);
        return (
          <Link
            {...subSection} //??????????
            to={subReview ? `/users/1/review-main/${subReview.id}` : ""}
            key={subSection.id}
            onClick={(e) => {
              e.stopPropagation();
              if (!subReview) e.preventDefault();
            }}
            className={`episode ${!subReview ? "disabled-link" : ""}`}
          >
            {`${
              this.props.type.subName.charAt(0).toUpperCase() +
              this.props.type.subName.slice(1)
            } ${subSection.order}`}
            {<br />}
            {subSection.title}{" "}
            {subReview ? (
              <p> {subReview.content.substring(0, 100)}</p>
            ) : (
              this.isLoggedInUser ? 
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(
                    `/users/1/subs/${subSection.id}/review-form/`,
                    "_self"
                  );
                }}
              >
                {" "}
                Write Review{" "}
              </button>
              :
              ""
            )}
            <button>Edit</button>
            <button onClick={(e) => this.handleDeleteSub(e, subSection.id)}>Delete</button>
          </Link>
        );
      });

    subSections.sort((a, b) => a.props.order - b.props.order);

    return subSections;
  }

  render() {
    console.log(this.context)
    const review = this.getReview(this.props);
    return (
      <div className="fandom-comp">
        <div
          onClick={() => this.setState({ clicked: !this.state.clicked })}
          className="section"
        >
          {`${
            this.props.type.sectionName.charAt(0).toUpperCase() +
            this.props.type.sectionName.slice(1)
          } ${this.props.order}`}
          {<br />}
          {this.props.title}
          {<br />}
          {review ? (
            <React.Fragment>
              <p>{review.content.substring(0, 100)}</p>
              <Link
                className="full-page-link write-review-button"
                to={`/users/1/review-main/${review.id}`}
              >
                View Full Review
              </Link>
            </React.Fragment>
          ) : (
            this.isLoggedInUser ? 
            <Link
              className="write-review-button"
              to={`/users/1/sections/${this.sectionId}/review-form/`}
            >
              {" "}
              Write Review{" "}
            </Link>
            :
            ""
            //make this display block, and then start working on the logic for the display fandom form after you've debugged everything herre
          )}
          <button>Edit</button>
          <button onClick={this.handleDeleteSection}>Delete</button>
          {this.state.clicked &&
            this.props.type.subName &&
            this.getSubDisplay()}
        </div>
      </div>
    );
  }
}
//<Link className="write-review-season-link" to={`/users/1/review-form/${this.props.id}`}>

//make reviews and review buttons work, as well as fandom installation and section posting

// getSubReviews() {
//   const promArray = [];
//   this.context[`subList`]
//     .filter((subSection) => {
//       return (
//         subSection[`sectionId`] === this.sectionId && !!subSection.reviewId
//       );
//     })
//     .forEach((subSection) => {
//       promArray.push(FetchService.fetchReview(subSection.reviewId));
//     });
//   Promise.all(promArray)
//     .then((subReviews) => {
//       subReviews.forEach((review) => {
//         this.context.handleGetReview(review);
//       });
//     })
//     .then(() => {
//       this.render();
//     });
// }

// componentDidMount() {
//   if (this.props.reviewId) {
//     FetchService.fetchReview(this.props.reviewId).then((review) => {
//       this.context.handleGetReview(review);
//       if (this.context[`subList`].length !== 0) {
//         this.getSubReviews();
//       }
//     });
//   } else {
//     this.getSubReviews();
//   }
// }