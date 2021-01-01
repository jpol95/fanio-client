import React from "react";
import ReactDOM from "react-dom";
import CreateSingleSection from "./CreateSingleSection";

describe("Create Single Sections component", () => {
  const props = {
    match: {
      params: {
        userId: 1,
        installmentId: 1,
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
        <CreateSingleSection {...props} /> , div );
    ReactDOM.unmountComponentAtNode(div);
  });
});
