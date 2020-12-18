import React from "react";
import CreateSingleSection from "../CreateSingleSection/CreateSingleSection";
import FanioContext from '../FanioContext'
import './CreateSections.css'
import typeList from '../type-list'
import FetchService from "../FetchService";

export default class CreateSections extends React.Component {

  static contextType = FanioContext

  getType = () => {
    return typeList[this.getInstallment().type]
  }

  //fix classes to not use type from context, then on with debugging the get calls for the seeded data

  getInstallment = () => {
      return this.context.installmentList.find(installment => Number(this.props.match.params.installmentId) === installment.id)
  }

  genListName = this.props.match.params.sectionId ? "subList" : "sectionList"
  listName = this.props.match.params.sectionId ? this.getType().subName : this.getType().sectionName
  parentName = this.props.match.params.sectionId ? "section": "installment"


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
    const sectionFormArray = []
    for (let i = 0; i < this.state.numSections; i++) {
      sectionFormArray.push(<CreateSingleSection {...this.props} type={this.getType()} handleAddSection={this.handleAddSection} sectionId={i} />);
    }
    return sectionFormArray
  }

  handleAddSection = (section) => {
    // console.log(this.props.match.params[`sectionId`])
    const sectionListCopy = [...this.state.sectionList];
    sectionListCopy[section.sectionId] = {
      ...section,
      [`${this.parentName}Id`]: Number(this.props.match.params[`${this.parentName}Id`])
    };
    // console.log(sectionListCopy)
    this.setState({
      ...this.state, sectionList: sectionListCopy,
    });
  };

  handleSubmitSections = async (e) => {
    e.preventDefault()
    console.log("kjvenkejnekrjnfejk")
    const link = this.parentName === "installment" ? `/sections/section/${this.props.match.params.installmentId}` : `/sections/sub/${this.props.match.params.sectionId}`
    const sectionCopy = [...this.state.sectionList]
    const sections = await FetchService.postSections(sectionCopy, link)
    this.props.history.push(`/users/1/fandoms/${this.props.match.params.fandomId}/installment-view/${this.props.match.params.installmentId}`) //CHANGE
    this.context.handleSubmitSections(sections, this.genListName)
  }

//is there a way to combine the add seasons and add episodes form?
//figure out why form is not submitting properly

  render() {
    // console.log("creating Section forms") 
    //HOW IS THIS.PROPS.INSTALLID NOT THROWING AN ERROR IM PRETTY SURE IM NOT PASSING ANY PROPS INTO THIS CLASS
    return (
      <form className="add-sections" onSubmit={this.handleSubmitSections}>
        <label htmlFor={`section-title-${this.props.installId}`}> 
          How many {this.listName}s would you like to add?
        </label>
        <input
          id={`section-title-${this.props.installId}`}
          type="number"
          onChange={this.handleNumSections}
        />
        {this.createSectionForms()}
        <button className="submit-sections-button" type="submit">Add {this.listName}s </button>
      </form>
    );
  }
}
