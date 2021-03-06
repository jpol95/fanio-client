import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import FandomForm from "./FandomForm";
import FanioContext from "../FanioContext";
import dummyStore from "../dummy-store";
import {BrowserRouter} from 'react-router-dom'

describe("Fandom Form component", () => {
  const props = {
    match: {
      params: {
        userId: 1,
        fandomId: 1,
        installmentId: 1,
        sectionId: 1,
      },
    },
    installId: 1,
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <BrowserRouter>
      <FanioContext.Provider value={{ ...dummyStore }}>
        {" "}
        <FandomForm {...props} />{" "}
      </FanioContext.Provider>
    </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
})