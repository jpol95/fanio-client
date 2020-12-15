import React from 'react'
import FanioContext from '../FanioContext'


export default class InstallDropDown extends React.Component {

  static contextType = FanioContext

  types = this.context.typeList

  state = {
    typeId: 0, 
    title: ""
  }


  getType = (id) => {
    return this.context.typeList.find(type => type.id === Number(id))
  }

  //make a service class for this type of map and filter logic

  handleTypeChange = (e) => {
    this.setState({
     ...this.state, typeId: e.target.value, installId: this.props.installId
    })
    this.props.handleAddInstallment(this.state)
  }

  handleTitleChange = (e) => {
    const p = new Promise((resolve, reject) => resolve(this.setState({
          ...this.state, title: e.target.value, installId: this.props.installId
    })))
    p.then(() => this.props.handleAddInstallment(this.state)
    )
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor={`type-${this.props.installId}`}>What type of installment is this?</label>
        <select onChange = {this.handleTypeChange} id={`type-${this.props.installId}`}>
          <option></option>
          {this.types && this.types.map((type) => (
            <option value={type.id}>{type.title}</option>
          ))}
        </select>
        {this.state.typeId != 0 &&
        <React.Fragment>
        <label htmlFor={`name-${this.props.installId}`}>What is the name of this {this.getType(this.state.typeId).title}?</label>
        <input onChange={this.handleTitleChange} type="text" />
        </React.Fragment>
  }     
        
      </React.Fragment>
    );
  }
}
