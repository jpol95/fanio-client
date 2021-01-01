import React from "react";
import ReactDOM from "react-dom";
import PersonalInfo from "./PersonalInfo";
import FanioContext from "../FanioContext";
import dummyStore from "../dummy-store";
import { BrowserRouter } from "react-router-dom";

describe("Profile component", () => {
    const props = {
        match: {
          params: {
            userId: 1,
            fandomId: 1,
            installmentId: 1,
          },
        },
        installId: 1,
      };
      const currentLoadedUser = {
        id: 1,
        username: "kingbumii",
        fullname: "Jesse A Pollack",
        password: "$2y$12$4R1JkopQ4LgjXH27bUAV5OwezOQLoBP6Yv7mbd.Nv7V67yBSmepZq",
        education: "Purple University",
        interests: ["skating", "softball", "listending to show tunes", "knitting"],
        city: "Gallifrey",
      };

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
          <PersonalInfo {...props} currentLoadedUser={currentLoadedUser} />{" "}
        </FanioContext.Provider>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
})