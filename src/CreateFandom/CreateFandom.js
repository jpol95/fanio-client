import React from "react";
import "./CreateFandom.css";
import FanioContext from "../FanioContext";

//rename type attribute to title

export default class Fandom extends React.Component {

  static contextType = FanioContext
  state = {
    fandomName: "",
    id: Math.round(Math.random()*1000000000)
  };

  handleName = (e) => {
    this.setState({
      ...this.state, fandomName: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push(`/users/1/fandom-view/${this.state.id}`)
    // this.props.history.push(`/users/1/profile`)
    this.context.handleAddFandom({title: this.state.fandomName, id: this.state.id, user: 1})
  }

 
  render() {
    return (
      <div className="fandom">
        <p>Create a new fandom</p>
        <form onSubmit={this.handleSubmit} class="create-fandom">
        <label htmlFor="workname">Name of fandom*</label>
        <input onChange={this.handleName} id="workname" type="text" />
        <button type="submit">Create New Fandom</button>
        </form>
      </div>
    );
  }
}

 // handleSectionAdd(section) {
  //   this.setState({
  //     ...this.state,
  //     sections: [...this.state.sections, section],
  //   });
  // }

  // handleSubSectionAdd(subSection) {
  //   this.setState({
  //     ...this.state,
  //     subSections: [...this.state.subSections, subSection],
  //   });
  // }

  // handleInstallmentAdd(installment) {
  //   this.setState({
  //     ...this.state,
  //     installments: [...this.state.installments, installment],
  //   });
  // }

  // addInstallment = (installObject) => {
  //   const {installId} = installObject
  //   const stateInstallmentsCopy = [...this.state.installList]
  //   stateInstallmentsCopy[sectionId] = {...sectionObject, installId: this.props.sectionId}
  //   this.setState({
  //       ...this.state, installList: [...stateInstallmentsCopy]
  //   })
  // }


  // callBacks = {
  //   handleInstallmentAdd: this.handleInstallmentAdd,
  //   handleSubSectionAdd: this.handleSectionAdd,
  //   handleSectionAdd: this.handleSectionAdd,
  // };
  // static contextType = FanioContext;

  // getInstallDDs(numInstalls) {
  //   let installDDs = [];
  //   for (let i = 0; i < numInstalls; i++) {
  //     installDDs.push(
  //       <InstallDropDown {...this.callBacks} key={i} installId={i} />
  //     );
  //   }
  //   return installDDs;
  // }

  // this.setState({
  //   ...this.state, numOfInstalls: installDDs.length
  // })
