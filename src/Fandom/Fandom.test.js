import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Fandom from "./Fandom";
import FanioContext from "../FanioContext";
import dummyStore from "../dummy-store";
import {BrowserRouter} from 'react-router-dom'

describe("Fandom component", () => {
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
        <Fandom {...props} />{" "}
      </FanioContext.Provider>
    </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
})