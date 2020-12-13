import React from "react";

export default class CreateInstallment extends React.Component {
  state = {
    numSections,
  };

    createSections() {
    const subName = props.type.subName;
    const sectionInputArray = [];
  
    for (let i = 0; i < this.state.numSections; i++) {
      sectionInputArray.push(
        <CreateSection {...props} sectionId={i} />
      );
    }
    return sectionInputArray;
  }

  handleNumSections = (numSections) => {
    this.setState({
      numSections,
    });
  };
  render() {
    const typeName = this.props.type.title;
    return (
      <React.Fragment>
        <label for={typeName + this.props.id}>Name of {typeName}</label>
        <input id={typeName + this.props.id} type="text" />
        <label for={`Number of ${typeName}`} />
        <input type="number" onChange={this.handleNumSections} />
        {this.createSections()}
      </React.Fragment>
    );
  }
}



