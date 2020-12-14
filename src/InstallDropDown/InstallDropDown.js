import React from 'react'
import FanioContext from '../FanioContext'


export default class InstallDropDown extends React.Component {

  static contextType = FanioContext

  types = this.context.types

  state = {
    type: ""
  }


  getType = (id) => {
    return this.context.map(type => type.id === id)
  }

  //make a service class for this type of map and filter logic

  handleTypeChange = (e) => {
    this.setState({
      type: this.getType(e.target.value)
    })
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor={`${this.props.id}`}>What type of installment is this?</label>
        <select onChange = {this.props.handleTypeChange} id={`${this.props.id}`}>
          {this.types.map((type) => (
            <option>{type.title}</option>
          ))}
        </select>
        <CreateInstallment type={this.state.type} {...props} />
      </React.Fragment>
    );
  }
}
