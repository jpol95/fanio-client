import React from "react";
import ReactDOM from "react-dom";
import SignUpForm from './SignUpForm'

describe("SignUp component", () => {
  it("renders without crashing", () => {
    const personalInfo = { name: "", interests: "", city: "", education: "" };
    const div = document.createElement("div");
    ReactDOM.render(   
          <SignUpForm {...personalInfo} />, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
})