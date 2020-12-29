import React from "react";
import "./ReviewMain.css";
import FanioContext from "../FanioContext";
import FetchService from "../FetchService";
import {Link} from 'react-router-dom'
import decoration4 from '../deocrations/decoration4.jpg'

export default class ReviewMain extends React.Component {
  static contextType = FanioContext;

  userId = Number(this.props.match.params.userId);
  reviewId = Number(this.props.match.params.reviewId)
  fandomId = Number(this.props.match.params.fandomId);
  installmentId = Number(this.props.match.params.installmentId);
  sectionId = Number(this.props.match.params.sectionId);
  subId = Number(this.props.match.params.subId)
  isLoggedInUser = this.context.loggedInUser === this.userId;
  getReview() {
    // console.log(this.props)
    return this.context.reviewList.find(
      (review) => review.id === this.reviewId
    );
  }

  // getSection() {
  //   const section = this.context.sectionList.find(section => section.reviewiewId === this.reviewId)
  //   const sub = this.context.subList.find(sub => sub.reviewId === this.reviewId)
  //   return sub || section
  // }

  // getInstallment() {
  //   const sec = this.getSection()
  //   if (Object.keys(sec).includes("installmentId")){
  //     return this.context.installmentList.find(installment => installment.id === sec.installmentId)
  //   }
  //   return this.context.installmentList.find(installment => installment.id === installment.sectionId)
  // }

  // getFandom() {
  //   return this.context.fandomlist.find(fandom => fandom.id === this.getInstallment().fandomId)
  // }

  handleDeleteReview = () => {
    if (this.isLoggedInUser){
    FetchService.deleteReview(this.reviewId)
    .then(() => {
      const tableName = !!this.subId ? "subList" : "sectionList"
      this.context.handleDeleteReview(this.reviewId, tableName)
      this.props.history.push(`/users/${this.userId}/fandoms/${this.fandomId}/installment-view/${this.installmentId}`)
    })
    }
  }

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
        <div className="review-body">
        <h2>{review.title}</h2>
        <p>{review.rating} stars</p>
        <p>{tags}</p>
        <p>{review.content}</p>
        {this.isLoggedInUser && (
          <>
            <Link className="edit-review-link" to={`/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/${this.subId ? `subs/${this.subId}/` : ``}reviews/${this.reviewId}/edit-review`}>Edit Review </Link>
            <br />
            <button className="delete-review-button" onClick={this.handleDeleteReview}>Delete Review</button>
          </>
        )}
        </div>
      </div>
    );
  }
}
