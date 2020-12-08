import React from "react";
import "./ReviewMain.css";

export default class ReviewMain extends React.Component {
  render() {
    return (
      <div className="review-full">
        <h2>Title of the review</h2>
        <p>Some graphic displaying the number of stars</p>
        <p>
          #we #have #some #tags #to #describe #what #topics #are #discussed #in
          #the #article
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button>Edit Review</button>
        <button>Delete Review</button>
      </div>
    );
  }
}
