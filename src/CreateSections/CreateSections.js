import React from "react";
import CreateSingleSection from "../CreateSingleSection/CreateSingleSection";
import FanioContext from "../FanioContext";
import "./CreateSections.css";
import typeList from "../type-list";
import FetchService from "../FetchService";

export default class CreateSections extends React.Component {
  static contextType = FanioContext;

  getType() {
    return typeList[this.getInstallment().type];
  }

  getInstallment = () => {
    return this.context.installmentList.find(
      (installment) =>
        Number(this.props.match.params.installmentId) === installment.id
    );
  };

  genListName = this.props.match.params.sectionId ? "subList" : "sectionList";
  parentName = this.props.match.params.sectionId ? "section" : "installment";
  userId = Number(this.props.match.params.userId);

  state = {
    numSections: 0,
    sectionList: [],
  };

  handleNumSections = (e) => {
    const sectionList = [];
    const numSections = e.target.value;
    for (let i = 0; i < numSections; i++) {
      sectionList.push({});
    }
    this.setState({
      numSections,
      sectionList,
    });
  };

  createSectionForms() {
    const sectionFormArray = [];
    for (let i = 0; i < this.state.numSections; i++) {
      sectionFormArray.push(
        <CreateSingleSection
          {...this.props}
          type={this.getType()}
          handleAddSection={this.handleAddSection}
          sectionId={i}
        />
      );
    }
    return sectionFormArray;
  }

  handleAddSection = (section) => {
    const sectionListCopy = [...this.state.sectionList];
    sectionListCopy[section.sectionId] = {
      ...section,
      [`${this.parentName}Id`]: Number(
        this.props.match.params[`${this.parentName}Id`]
      ),
    };
    this.setState({
      ...this.state,
      sectionList: sectionListCopy,
    });
  };

  preventSubmit = () => {
    if (!this.state.sectionList || this.state.sectionList.length === 0)
      return true;
    for (let section of this.state.sectionList) {
      if (!section.canSubmit) return true;
    }
    return false;
  };

  handleSubmitSections = async (e) => {
    e.preventDefault();
    const link =
      this.parentName === "installment"
        ? `/sections/section/parent/${this.props.match.params.installmentId}`
        : `/sections/sub/parent/${this.props.match.params.sectionId}`;
    const sectionCopy = [...this.state.sectionList].map((section) => {
      return {
        ...section,
        title: section.title.value,
        order: section.order.value,
      };
    });
    const sections = await FetchService.postSections(sectionCopy, link);
    this.props.history.push(
      `/users/${this.userId}/fandoms/${this.props.match.params.fandomId}/installment-view/${this.props.match.params.installmentId}`
    );
    this.context.handleSubmitSections(sections, this.genListName);
  };

  render() {
    if (!this.getInstallment()) return null;
    const listName = this.props.match.params.sectionId
      ? this.getType().subName
      : this.getType().sectionName;
    return (
      <form className="add-sections" onSubmit={this.handleSubmitSections}>
        <label htmlFor={`section-title-${this.props.installId}`}>
          How many {listName}s would you like to add?
        </label>
        <input
          id={`section-title-${this.props.installId}`}
          type="number"
          onChange={this.handleNumSections}
        />
        {this.createSectionForms()}
        <button
          disabled={this.preventSubmit()}
          className="submit-sections-button"
          type="submit"
        >
          Add {listName}s{" "}
        </button>
      </form>
    );
  }
}
