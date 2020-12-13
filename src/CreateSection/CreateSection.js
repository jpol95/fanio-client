import React from "react";

export default class CreateSection extends React.Component {
  state = {
    numSubs: 0,
    sectionOrder: 0,
    sectionTitle: "",
  };

  handleSectionOrder = (e) => {
    sectionOrder = e.target.value;
    this.setState({
      ...this.state,
      sectionOrder,
    });
  };

  handleNumSubs = (e) => {
    numSubs = e.target.value;
    this.setState({
      ...this.state,
      numSubs,
    });
  };

  handleSectionTitle = (e) => {
    sectionTitle = e.target.value;
    this.setState({
      ...this.state,
      sectionTitle,
    });
  };

  createSubLists = () => {
    const subListArray = [];
    for (let i = 0; i < this.state.numSubs; i++) {
      subListArray.push(<CreateSubList {...props} subId={`${i}`} />);
    }
    return subListArray;
  };

  render() {
    return (
      <React.Fragment>
        <label
          for={`section-title-${this.props.installId}-${this.props.sectionId}`}
        >
          What's the title of this {this.props.type.sectionName}
        </label>
        <input
          onChange={this.handleSectionTitle}
          id={`section-title-${this.props.installId}-${this.props.sectionId}`}
        />
        <label
          for={`section-order-${this.props.installId}-${this.props.sectionId}`}
        >
          In what order does this {this.props.type.sectionName} come?
        </label>
        <input
          onChange={this.handleSectionOrder}
          type="number"
          id={`section-order-${this.props.installId}-${this.props.sectionId}`}
        />
        {this.props.type.hasSubs && (
          <React.Fragment>
            <label
              for={`section-num-subs${this.props.installId}${this.props.sectionId}`}
            >
              How many {this.props.type.sectionName}s are in this{" "}
              {this.props.type.sectionName}
            </label>
            <input
              onChange={this.handleNumSubs}
              type="number"
              id={`section-num-subs${this.props.installId}${this.props.sectionId}`}
            />
            {this.createSubLists()}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

//WHEN YOU GET BACK make sure you separe this into another class since this neweds its own title an dorder number, then your job is tofigure
//out how to put this whole form together, including sending the info up
