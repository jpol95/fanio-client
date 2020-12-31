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
    this.setState({
      ...this.state, installmentList: installmentListCopy,
    });
  };

  handleSubmitInstallments = async (e) => {
    e.preventDefault()
    const installCopy = [...this.state.installmentList].map(installment => {
      return {...installment, title: installment.title.value, type: installment.type.value}
    })
    const installments = await FetchService.postInstallments(installCopy, this.props.match.params.fandomId)
    this.props.history.push(`/users/${this.userId}/fandom-view/${this.props.match.params.fandomId}`)
    this.context.handleSubmitInstallments(installments)
  }



  preventSubmit = () => {
    if (!this.state.installmentList || this.state.installmentList.length === 0) return true
    for (let section of this.state.installmentList){
      if (!section.canSubmit) return true
    }
    return false;
  }


  render() {
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
        <button disabled={this.preventSubmit()} className="submit-installments-button" type="submit">Create Installments</button>
      </form>
    );
  }
}


