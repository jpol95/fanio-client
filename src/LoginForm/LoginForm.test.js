import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import LoginForm from "./LoginForm";
import FanioContext from "../FanioContext";
import dummyStore from "../dummy-store";
import {BrowserRouter} from 'react-router-dom'

describe("Fandom Form component", () => {
 
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <LoginForm />, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
})