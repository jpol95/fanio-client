import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import CreateSections from "./CreateSections";
import FanioContext from "../FanioContext";

describe("Create Sections component", () => {
  const props = {
    match: {
      params: {
        userId: 1,
        installmentId: 1,
      },
    },
    installId: 1,
  };
  const installmentList = [
    { id: 1, title: "Doctor Who TV Series", type: "Show", fandomId: 1 },
    { id: 2, title: "Parks and Rec TV Series", type: "Show", fandomId: 3 },
    { id: 3, title: "Buffy TV Series", type: "Show", fandomId: 4 },
    { id: 4, title: "Buffy Comic Series", type: "Comic series", fandomId: 4 },
    { id: 5, title: "Supernatural TV Series", type: "Show", fandomId: 2 },
    { id: 6, title: "Harry Potter Books", type: "Book series", fandomId: 5 },
  ];
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <FanioContext.Provider value={{ installmentList: installmentList }}>
        {" "}
        <CreateSections {...props} />{" "}
      </FanioContext.Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <FanioContext.Provider value={{ installmentList: installmentList }}>
          {" "}
          <CreateSections {...props} />{" "}
        </FanioContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
