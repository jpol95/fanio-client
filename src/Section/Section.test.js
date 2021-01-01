import React from "react";
import ReactDOM from "react-dom";
import Section from "./Section";
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
    type : {
        sectionName: "arc",
        subName: "issue",
      }

  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <BrowserRouter>
      <FanioContext.Provider value={{ ...dummyStore }}>
        <Section {...props} />
      </FanioContext.Provider>
    </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
})