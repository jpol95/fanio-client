import React from "react";
import ReactDOM from "react-dom";
import CreateSingleInstallment from './CreateSingleInstallment'

describe("Create Single Installment component", () => {
    const props = {
        installId: 1
    }
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(   
          <CreateSingleInstallment {...props} />, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
})