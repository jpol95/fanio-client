import React from "react";
import CreateSingleInstallment from "../CreateSingleInstallment/CreateSingleInstallment";
import FanioContext from '../FanioContext'
import './CreateInstallments.css'
import FetchService from '../FetchService'

export default class CreateInstallments extends React.Component {

  static contextType = FanioContext
  state = {
    numInstallments: 0,
    installmentList: [],
    // title: "",
    // sectionList: []
  };

  userId = Number(this.props.match.params.userId)

  handleNumInstallments = (e) => {
    const installmentList = [];
    const numInstallments = e.target.value;
    for (let i = 0; i < numInstallments; i++) {
      installmentList.push({});
    }
    this.setState({
      numInstallments,
      installmentList
    });
  };

  createInstallmentForms() {
    const installFormArray = [];
    for (let i = 0; i < this.state.numInstallments; i++) {
      installFormArray.push(<CreateSingleInstallment handleAddInstallment={this.handleAddInstallment} installId={i} />);
    }
    return installFormArray
  }

  handleAddInstallment = (installment) => {
    const installmentListCopy = [...this.state.installmentList];
    
    installmentListCopy[installment.installId] = {
      ...installment,
      fandomId: Number(this.props.match.params.fandomId)
    };
    // console.log(installmentListCopy)
    this.setState({
      ...this.state, installmentList: installmentListCopy,
    });
  };

  handleSubmitInstallments = async (e) => {
    e.preventDefault()
    const installCopy = [...this.state.installmentList]
    const installments = await FetchService.postInstallments(this.userId, installCopy, this.props.match.params.fandomId)
    this.props.history.push(`/users/${this.userId}/fandom-view/${this.props.match.params.fandomId}`)
    this.context.handleSubmitInstallments(installments)
  }

  //see how you want to handle submitting installments, whether handle the array here or on
  //serverside, would be easier on serverside but i want to make sure that's good practice


  render() {
    // console.log("creating installment forms")
    return (
      <form className="add-installments" onSubmit={this.handleSubmitInstallments}>
        <label htmlFor={`installment-title-${this.props.installId}`}>
          How many installments would you like to add?
        </label>
        <input
          id={`installment-title-${this.props.installId}`}
          type="number"
          onChange={this.handleNumInstallments}
        />
        {this.createInstallmentForms()}
        <button className="submit-installments-button" type="submit">Create Installments</button>
      </form>
    );
  }
}


// addSection = (sectionObject) => {
  //   const {sectionId} = sectionObject
  //   const stateSectionsCopy = [...this.state.sectionList]
  //   stateSectionsCopy[sectionId] = {...sectionObject, installId: this.props.sectionId}
  //   this.setState({
  //       ...this.state, sectionList: [...stateSubsCopy]
  //   })
  // }

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

  // state = {
  //   numInstallments: 0,
  //   installmentList: [],
  //   // title: "",
  //   // sectionList: []
  // };
