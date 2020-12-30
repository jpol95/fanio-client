import React from "react";
import "./FandomForm.css";
import FanioContext from "../FanioContext";
import FetchService from '../FetchService'

//rename type attribute to title

export default class Fandom extends React.Component {

  static contextType = FanioContext
  state = {
    title: {value: this.props.title, touched: false}
  };



  handleName = (e) => {
    this.setState({
      ...this.state, title: {value: e.target.value, touched: true}
    })
  }

  invalidTitle = () => {
    return !this.state.title.value
  }

 
  render() {
    return (
      <div className="fandom">
        <form onSubmit={(e) => this.props.handleSubmit(e, {title: this.state.title.value})} className="create-fandom">
        <label htmlFor="workname">Name of fandom*</label>
        {(this.invalidTitle() && this.state.title.touched) && <div className="error">Title is required</div>}
        <input onChange={this.handleName} defaultValue={this.state.title.value} id="workname" type="text" />
        <button disabled={this.invalidTitle()} className="submit-fandom-button" type="submit">Submit</button>
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
