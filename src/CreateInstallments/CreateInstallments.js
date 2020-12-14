import React from "react";
import InstallDropDown from '../CreateSingleInstallment/CreateSingleInstallment'

export default class CreateInstallments extends React.Component {
  state = {
    numInstallments: 0,
    installmentList: []
    // title: "",
    // sectionList: []
  };

//   createSections() {
//     const subName = props.type.subName;
//     const sectionInputArray = [];

//     for (let i = 0; i < this.state.numSections; i++) {
//       sectionInputArray.push(<CreateSection {...props} sectionId={i} addSection={this.addSection} />);
//     }
//     return sectionInputArray;
//   }

  // handleTitle = (e) => {
  //   const title = e.target.value
  //   this.setState({
  //       title
  //   })
  // }

  handleNumInstallments = (e) => {
    const numInstallments = e.target.value
    this.setState({
      numInstallments,
    });
  };

  // addSection = (sectionObject) => {
  //   const {sectionId} = sectionObject
  //   const stateSectionsCopy = [...this.state.sectionList]
  //   stateSectionsCopy[sectionId] = {...sectionObject, installId: this.props.sectionId}
  //   this.setState({
  //       ...this.state, sectionList: [...stateSubsCopy]
  //   })
  // }

  createInstallmentsForms(){
    const installFormArray = []
    for (let i = 0; i < this.state.numInstallments; i++){
      installFormArray.push(<CreateSingleInstallment installId={i} />)
    }
  }

  handleAddInstallment = () => {
  
  }

  render() {
    return (
      <React.Fragment>
        <label for={`installment-title-${this.props.installId}`}>How many installments would you like to add?</label>
        <input id={`installment-title-${this.props.installId}`} type="number" onChange={this.handleTitle} />
        {this.createInstallmentForms()}
      </React.Fragment>
    );
  }
}
