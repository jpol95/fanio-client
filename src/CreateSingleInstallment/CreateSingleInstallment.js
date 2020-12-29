import React from 'react'
import FanioContext from '../FanioContext'
import typeList from '../type-list'
import './CreateSingleInstallment.css'


export default class InstallDropDown extends React.Component {

  static contextType = FanioContext

  types = Object.keys(typeList)

  state = {
    type: "", 
    title: ""
  }

  //make a service class for this type of map and filter logic

  handleTypeChange = (e) => {
    this.setState({
     ...this.state, type: e.target.value, installId: this.props.installId
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
      <div className="single-installment-form">
        <label htmlFor={`type-${this.props.installId}`}>What type of installment is this?</label>
        <select onChange = {this.handleTypeChange} id={`type-${this.props.installId}`}>
          <option></option>
          {this.types && this.types.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        {this.state.type !== "" &&
        <React.Fragment>
        <label htmlFor={`name-${this.props.installId}`}>What is the name of this {this.state.type}?</label>
        <input onChange={this.handleTitleChange} type="text" />
        </React.Fragment>
  }     
        
      </div>
    );
  }
}
