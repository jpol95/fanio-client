import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import FandomView from "./FandomView";
import FanioContext from "../FanioContext";
import dummyStore from "../dummy-store";
import { BrowserRouter } from "react-router-dom";

describe("Fandom view component", () => {
  const props = {
    match: {
      params: {
        userId: 1,
        fandomId: 5,
        installmentId: 6,
        sectionId: 1,
      },
    },
    installId: 1,
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <FanioContext.Provider
          value={{
            fandomList: dummyStore.fandomList,
            installmentList: dummyStore.installmentList,
            loggedInUser: 1,
          }}
        >
          {" "}
          <FandomView {...props} />{" "}
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
              fandomList: dummyStore.fandomList,
              installmentList: dummyStore.installmentList,
              loggedInUser: 1,
            }}
          >
            {" "}
            <FandomView {...props} />{" "}
          </FanioContext.Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
