import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import SignUp from "./SignUp";
import FanioContext from "../FanioContext";
import dummyStore from "../dummy-store";
import { BrowserRouter } from "react-router-dom";

describe("SignUp component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <FanioContext.Provider
          value={{
            reviewList: dummyStore.reviewList,
            fandomList: dummyStore.fandomList,
            installmentList: dummyStore.installmentList,
            loggedInUser: 1,
            sectionList: dummyStore.sectionList,
          }}
        >
          {" "}
          <SignUp />{" "}
        </FanioContext.Provider>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <FanioContext.Provider
            value={{
              reviewList: dummyStore.reviewList,
              fandomList: dummyStore.fandomList,
              installmentList: dummyStore.installmentList,
              loggedInUser: 1,
              sectionList: dummyStore.sectionList,
            }}
          >
            {" "}
            <SignUp />{" "}
          </FanioContext.Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
