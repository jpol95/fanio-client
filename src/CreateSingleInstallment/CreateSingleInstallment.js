import React from 'react'
import FanioContext from '../FanioContext'


export default class InstallDropDown extends React.Component {

  static contextType = FanioContext

  types = this.context.types

  state = {
    type: 0, 
    title: ""
  }


  getType = (id) => {
    return this.context.map(type => type.id === id)
  }

  //make a service class for this type of map and filter logic

  handleTypeChange = (e) => {
    this.setState({
     ...this.state, type: this.getType(e.target.value)
    })
  }

  handleTitleChange = (e) => {
    this.setState({
      ...this.state, title: e.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor={`type-${this.props.installId}`}>What type of installment is this?</label>
        <select onChange = {this.handleTypeChange} id={`type-${this.props.installId}`}>
          {this.types.map((type) => (
            <option value={type.id}>{type.title}</option>
          ))}
        </select>
        <label htmlFor={`name-${this.props.installId}`}>What is the name of this {this.getType(this.state.type)}?</label>
        <input onChange={this.handleTitleChange} type="text" />
        
      </React.Fragment>
    );
  }
}
