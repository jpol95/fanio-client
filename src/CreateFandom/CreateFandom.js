import React from "react";
import "./CreateFandom.css";
import FanioContext from "../FanioContext";
import InstallDropDown from "../InstallDropDown/InstallDropDown";

//rename type attribute to title

export default class Fandom extends React.Component {
  state = {
    fandomName: "",
    fandomId: null,
    installments: [],
    sections: [],
    subSections: [],
  };

  handleSectionAdd(section) {
    this.setState({
      ...this.state,
      sections: [...this.state.sections, section],
    });
  }

  handleSubSectionAdd(subSection) {
    this.setState({
      ...this.state,
      subSections: [...this.state.subSections, subSection],
    });
  }

  handleInstallmentAdd(installment) {
    this.setState({
      ...this.state,
      installments: [...this.state.installments, installment],
    });
  }

  callBacks = {
    handleInstallmentAdd: this.handleInstallmentAdd,
    handleSubSectionAdd: this.handleSectionAdd,
    handleSectionAdd: this.handleSectionAdd,
  };
  static contextType = FanioContext;

  getInstallDDs(numInstalls) {
    let installDDs = [];
    for (let i = 0; i < numInstalls; i++) {
      installDDs.push(
        <InstallDropDown {...this.callBacks} key={i} installId={i} />
      );
    }
    return installDDs;
  }

  // this.setState({
  //   ...this.state, numOfInstalls: installDDs.length
  // })
  render() {
    return (
      <div className="fandom">
        <p>Create a new fandom</p>
        <p>
          The only field required is the name of the fandom. If you wish to
          supply the other details of the fandom now, you may do so as well.
        </p>
        <label htmlFor="workname">Name of fandom*</label>
        <input id="workname" type="text" />
        <label htmlFor="seasons">Number of Installments</label>
        <input id="seasons" type="text" />
        {this.getInstallDDs(this.state.numOfInstalls)}
        <button>Create New Fandom</button>
      </div>
    );
  }
}
