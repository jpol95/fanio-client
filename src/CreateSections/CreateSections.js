import React from "react";
import CreateSingleInstallment from "../CreateSingleInstallment/CreateSingleInstallment";
import FanioContext from '../FanioContext'
import './CreateInstallments.css'


export default class CreateSections extends React.Component {

  static contextType = FanioContext
  state = {
    numInstallments: 0,
    installmentList: [],
    // title: "",
    // sectionList: []
  };

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
      fandomId: Number(this.props.match.params.fandomId),
      id: Math.round(Math.random()*100000000)
    };
    // console.log(installmentListCopy)
    this.setState({
      ...this.state, installmentList: installmentListCopy,
    });
  };

  handleSubmitInstallments = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.props.history.push(`/users/1/fandom-view/${this.props.match.params.fandomId}`)
    this.context.handleSubmitInstallments(this.state.installmentList)
  }

//is there a way to combine the add seasons and add episodes form?
//figure out why form is not submitting properly

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
