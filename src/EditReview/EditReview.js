import React from "react";
import FanioContext from "../FanioContext";
import FetchService from "../FetchService";
import ReviewForm from '../ReviewForm/ReviewForm'

export default class EditReview extends React.Component {
  static contextType = FanioContext;
  tableName = this.props.match.params.subId ? "sub" : "section";
  sectionId = this.props.match.params.sectionId;
  subId = this.props.match.params.subId;
  fandomId = Number(this.props.match.params.fandomId);
  installmentId = this.props.match.params.installmentId;
  userId = Number(this.props.match.params.userId);
  reviewId = Number(this.props.match.params.reviewId);


  handleSubmit = async (e, reviewObject) => {
    e.preventDefault();
    const link =
      this.tableName === "subs"
        ? `/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/subs/${this.subId}/review/${this.reviewId}`
        : `/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/review/${this.reviewId}`;
    const {title, content, rating} = reviewObject
    const reviewToPost = {title, content, rating, id: this.reviewId }
    const review = await FetchService.patchReview(reviewToPost);
    await FetchService.deleteTrelsByReview(review.id)
    const trelsToPost = reviewObject.tags.map(tag => {return {tagId: tag, reviewId: review.id}} )
    const newTrels = await FetchService.postTrels(trelsToPost)
    this.props.history.push(link);
    this.context.handleEditReview(review, newTrels);
  };

  getReviewById = () => {
    return this.context.reviewList.find((review) => review.id === this.reviewId);
  };

  getTrels = () => {
      return this.context.reviewTagList.filter(trel => trel.reviewId === this.reviewId)
      .map(trel => trel.tagId)
  }

  render() {
      const review = {...this.getReviewById(), tags: this.getTrels()}
    return (
      <>
        <h3>Edit review</h3>
        <ReviewForm {...review} handleSubmit={this.handleSubmit} />
      </>
    );
  }
}
