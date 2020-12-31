import React from 'react'
import FanioContext from '../FanioContext'
import typeList from '../type-list'
import './CreateSingleInstallment.css'


export default class CreateSingleInstallment extends React.Component {

  static contextType = FanioContext

  types = Object.keys(typeList)

  state = {
    type: {value: "", touched: false}, 
    title: {value: "", touched: false}
  }


  handleTypeChange = (e) => {
    this.setState({
     ...this.state, type: {value: e.target.value, touched: true}, installId: this.props.installId
    }, () => this.props.handleAddInstallment({...this.state, canSubmit: !this.invalidType() && !this.invalidTitle()}))
    
  }

  handleTitleChange = (e) => {
    const p = new Promise((resolve, reject) => resolve(this.setState({
          ...this.state, title: {value: e.target.value, touched: true}, installId: this.props.installId
    })))
    p.then(() => this.props.handleAddInstallment({...this.state, canSubmit: !this.invalidType() && !this.invalidTitle()})
    )
  }

  invalidType = () => {
    return !this.state.type.value
  }

  invalidTitle = () => {
    return !this.state.title.value
  }

  render() {
    return (
      <div className="single-installment-form">
        <label htmlFor={`type-${this.props.installId}`}>What type of installment is this?</label>
        {(this.invalidType() && this.state.type.touched) && <div class="error">Installment type is required</div>}
        <select onChange = {this.handleTypeChange} id={`type-${this.props.installId}`}>
          <option></option>
          {this.types && this.types.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
        {this.state.type.value !== "" &&
        <React.Fragment>
        <label htmlFor={`name-${this.props.installId}`}>What is the name of this {this.state.type.value}?</label>
        {(this.invalidTitle() && this.state.title.touched) && <div class="error">Installment title is required</div>}
        <input onChange={this.handleTitleChange} type="text" />
        </React.Fragment>
  }     
        
      </div>
    );
  }
}
