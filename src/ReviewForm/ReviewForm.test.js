import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import ReviewForm from "./ReviewForm";
import FanioContext from "../FanioContext";
import dummyStore from "../dummy-store";

describe("Edit Review component", () => {
  const props = {
    match: {
      params: {
        userId: 1,
        fandomId: 1,
        installmentId: 1,
        sectionId: 1,
        subId: 1,
        reviewId: 13,
      },
    },
    installId: 1,
    title: "", 
    rating: null, 
    content: "",
     tags: []
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <FanioContext.Provider
        value={{
          reviewList: dummyStore.reviewList,
          reviewTagList: dummyStore.reviewTagList,
          tagList: dummyStore.tagList,
        }}
      >
        {" "}
        <ReviewForm  {...props} />{" "}
      </FanioContext.Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
