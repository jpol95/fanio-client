import React from "react";
import './Reviews.css'


export default class Reviews extends React.Component {
  render() {
    return (
      <div className="review">
        <p> Review Section </p>
        <p className="review-comp">
          This is an example of the latest review this person posted. They
          watched a show and wrote their feelings about it. You can click here
          and it'll go to the review.
          <br /> 5 stars
        </p>
        <p className="review-comp">
          Here, have another. This is another show. Maybe better? Maybe worse?
          Who knows. <br />3 stars
        </p>
      </div>
    );
  }
}
