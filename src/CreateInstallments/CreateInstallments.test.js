import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import CreateInstallments from "./CreateInstallments";

describe("Create Installments component", () => {
  const props = {
    match: {
      params: {
        userId: 1,
      },
    },
    installId: 1,
  };
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreateInstallments {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const tree = renderer.create(<CreateInstallments {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
