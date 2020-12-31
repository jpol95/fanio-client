import React from "react";
import FanioContext from "../FanioContext";
import FetchService from "../FetchService";
import ReviewForm from "../ReviewForm/ReviewForm";

export default class CreateReview extends React.Component {
  static contextType = FanioContext;
  tableName = this.props.match.params.subId ? "sub" : "section";
  parentId = this.props.match.params.subId || this.props.match.params.sectionId;
  sectionId = this.props.match.params.sectionId;
  subId = this.props.match.params.subId;
  installmentId = this.props.match.params.installmentId;
  userId = Number(this.props.match.params.userId);
  fandomId = this.props.match.params.fandomId;

  handleSubmit = async (e, reviewObject) => {
    e.preventDefault();
    const { title, content, rating } = reviewObject;
    const reviewToPost = { title, content, rating };
    const { tags } = reviewObject;
    const review = await FetchService.postReview(
      reviewToPost,
      this.installmentId
    );
    const link =
      this.tableName === "sub"
        ? `/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/subs/${this.subId}/review/${review.id}`
        : `/users/${this.userId}/fandoms/${this.fandomId}/installments/${this.installmentId}/sections/${this.sectionId}/review/${review.id}`;
    const trelsToPost = tags.map((tag) => {
      return { tagId: tag, reviewId: review.id };
    });
    this.props.history.push(link);
    this.context.handleSubmitReview(
      review,
      trelsToPost,
      this.tableName,
      this.parentId
    );
  };

  getReviewById = () => {
    this.context.reviewList.find((review) => review.id === this.reviewId);
  };

  render() {
    const review = { title: "", rating: null, content: "", tags: [] };
    return <ReviewForm {...review} handleSubmit={this.handleSubmit} />;
  }
}
