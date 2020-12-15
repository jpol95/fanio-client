import React from "react";

export default class CreateSingleSection extends React.Component {
  listName = this.props.match.params.sectionId ? "subName" : "sectionName"
  state = {
    order: 0,
    title: "",
  };

  handleSectionOrder = (e) => {
    const order = e.target.value;
    const p = new Promise((resolve, reject) => 
    resolve(this.setState({
      ...this.state,
      order,
    })));
    p.then(() => this.props.handleAddSection({ ...this.state, sectionId: this.props.sectionId }));
  };



  handleSectionTitle = (e) => {
    const title = e.target.value;
    const p = new Promise((resolve, reject) => 
    resolve(this.setState({
      ...this.state,
      title,
    })))
  p.then(() => this.props.handleAddSection({ ...this.state, sectionId: this.props.sectionId }));
  };

  render() {
    return (
      <React.Fragment>
        <label
          for={`section-title-${this.props.id}`}
        >
          What's the title of this {this.props.type && this.props.type[this.listName]}?
        </label>
        <input
          onChange={this.handleSectionTitle}
          id={`section-title-${this.props.id}`}
        />
        <label
          for={`section-order-${this.props.id}`}
        >
          In what order does this {this.props.type &&  this.props.type[this.listName]} come?
        </label>
        <input
          onChange={this.handleSectionOrder}
          type="number"
          id={`section-order-${this.props.installId}-${this.props.sectionId}`}
        />
      </React.Fragment>
    );
  }
}


//questions could be put into a template or array
//maybe break things into different routes
//at least add one or two layers of routing



// Installment one
//     Season 1
//     Season 2
//     Season 3
//     Season 4
//     (Add Section)

// INstallment two

// Installment three



//WHEN YOU GET BACK make sure you separe this into another class since this neweds its own title an dorder number, then your job is tofigure
//out how to put this whole form together, including sending the info up

//   handleNumSubs = (e) => {
//     numSubs = e.target.value;
//     const subList = [];
//     for (let i = 0; i < numSubs; i++) {
//       subList.push({});
//     }
//     this.setState({
//       ...this.state,
//       numSubs,
//       subList,
//     });
//     this.props.addSection({ ...this.state, sectionId: this.props.sectionId });
//   };

//   createSubLists = () => {
//     const subListArray = [];
//     for (let i = 0; i < this.state.numSubs; i++) {
//       subListArray.push(
//         <CreateSubSection {...props} subId={`${i}`} addSub={this.addSub} />
//       );
//     }
//     return subListArray;
//   };

//   addSub = (subObject) => {
//     const { subId } = subObject;
//     const stateSubsCopy = [...this.state.subList];
//     stateSubsCopy[subId] = { ...subObject, sectionId: this.props.sectionId };
//     this.setState({
//       ...this.state,
//       subList: [...stateSubsCopy],
//     });
//   };


// {this.props.type.hasSubs && (
//     <React.Fragment>
//       <label
//         for={`section-num-subs${this.props.installId}${this.props.sectionId}`}
//       >
//         How many {this.props.type.subName}s are in this{" "}
//         {this.props.type.sectionName}
//       </label>
//       <input
//         onChange={this.handleNumSubs}
//         type="number"
//         id={`section-num-subs${this.props.installId}${this.props.sectionId}`}
//       />
//       {this.createSubLists()}
//     </React.Fragment>
//   )}