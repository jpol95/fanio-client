import React from "react";

export default class CreateInstallment extends React.Component {
  state = {
    numSections: 0,
    title: "",
    sectionList: []
  };

  createSections() {
    const subName = props.type.subName;
    const sectionInputArray = [];

    for (let i = 0; i < this.state.numSections; i++) {
      sectionInputArray.push(<CreateSection {...props} sectionId={i} />);
    }
    return sectionInputArray;
  }

  handleTitle = (e) => {
    const title = e.target.value
    this.setState({
        title
    })
  }

  handleNumSections = (e) => {
    const numSections = e.target.value
    this.setState({
      numSections,
    });
  };

  addSection = (sectionObject) => {
    const {sectionId} = sectionObject
    const stateSectionsCopy = [...this.state.sectionList]
    stateSectionsCopy[sectionId] = {...sectionObject, installId: this.props.sectionId}
    this.setState({
        ...this.state, subList: [...stateSubsCopy]
    })
  }

  render() {
    const typeName = this.props.type.title;
    return (
      <React.Fragment>
        <label for={`installment-title-${this.props.installId}`}>Name of {typeName}</label>
        <input id={`installment-title-${this.props.installId}`} type="text" onChange={this.handleTitle} />
        <label for={`installment-num-sections-${this.props.installId}`}>{`Number of ${this.props.type.sectionName}s`}</label>
        <input id={`installment-num-sections-${this.props.installId}`} type="number" onChange={this.handleNumSections} />
        {this.createSections()}
      </React.Fragment>
    );
  }
}
