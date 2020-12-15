import React from "react";
import CreateSingleSection from "../CreateSingleSection/CreateSingleSection";
import FanioContext from '../FanioContext'
import './CreateSections.css'


export default class CreateSections extends React.Component {

  static contextType = FanioContext

  getType = () => {
    return this.context.typeList.find(type => type.id === Number(this.getInstallment().typeId))
  }

  getInstallment = () => {
      return this.context.installmentList.find(installment => Number(this.props.match.params.installmentId) === installment.id)
  }


  state = {
    numSections: 0,
    sectionList: [],
    // title: "",
    // sectionList: []
  };

  handleNumSections = (e) => {
    const sectionList = [];
    const numSections = e.target.value;
    for (let i = 0; i < numSections; i++) {
      sectionList.push({});
    }
    this.setState({
      numSections,
      sectionList
    });
  };

  createSectionForms() {
    const sectionFormArray = [];
    for (let i = 0; i < this.state.numSections; i++) {
      sectionFormArray.push(<CreateSingleSection type={this.getType()} handleAddSection={this.handleAddSection} sectionId={i} />);
    }
    return sectionFormArray
  }

  handleAddSection = (section) => {
    const sectionListCopy = [...this.state.sectionList];
    
    sectionListCopy[section.sectionId] = {
      ...section,
      installmentId: Number(this.props.match.params.installmentId),
      id: Math.round(Math.random()*100000000)
    };
    // console.log(sectionListCopy)
    this.setState({
      ...this.state, sectionList: sectionListCopy,
    });
  };

  handleSubmitSections = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.props.history.push(`/users/1/fandoms/${this.props.match.params.fandomId}/installment-view/${this.props.match.params.installmentId}`)
    this.context.handleSubmitSections(this.state.sectionList)
  }

//is there a way to combine the add seasons and add episodes form?
//figure out why form is not submitting properly

  render() {
    // console.log("creating Section forms")
    return (
      <form className="add-sections" onSubmit={this.handleSubmitSections}>
        <label htmlFor={`section-title-${this.props.installId}`}>
          How many {this.getType(this.getInstallment().typeId).sectionName}s would you like to add?
        </label>
        <input
          id={`section-title-${this.props.installId}`}
          type="number"
          onChange={this.handleNumSections}
        />
        {this.createSectionForms()}
        <button className="submit-sections-button" type="submit">Add {this.getType(this.getInstallment().typeId).sectionName}s </button>
      </form>
    );
  }
}
