import React from "react";
import './CreateSingleSection.css'

export default class CreateSingleSection extends React.Component {
  listName = this.props.match.params.sectionId ? "subName" : "sectionName"
  state = {
    order: {value: 0, touched: false},
    title: {value: "", touched: false},
  };

  handleSectionOrder = (e) => {
    const order = e.target.value;
    const p = new Promise((resolve, reject) => 
    resolve(this.setState({
      ...this.state,
      order: {value: order, touched: true},
    })));
    p.then(() => this.props.handleAddSection({ ...this.state, sectionId: this.props.sectionId, canSubmit: !this.invalidOrder() && !this.invalidTitle() }));
  };

  invalidOrder = () => {
    return this.state.order.touched && (!this.state.order.value || this.state.order.value < 0 || !Number.isInteger(Number(this.state.order.value)))
  }

  invalidTitle = () => {
    return this.state.title.touched && !this.state.title.value
  }

  handleSectionTitle = (e) => {
    const title = e.target.value;
    const p = new Promise((resolve, reject) => 
    resolve(this.setState({
      ...this.state,
      title: {value: title, touched: true},
    })))
  p.then(() => this.props.handleAddSection({ ...this.state, sectionId: this.props.sectionId, canSubmit: this.state.order.touched && this.state.title.touched && !this.invalidOrder() && !this.invalidTitle() }));
  };

  render() {
    return (
      <div className="create-section-form">
        <label
          htmlFor={`section-title-${this.props.id}`}
        >
          What's the title of this {this.props.type && this.props.type[this.listName]}?
        </label>
        {this.invalidTitle() && <div class="error">{this.props.type[this.listName]} title is required</div>}
        <input
          onChange={this.handleSectionTitle}
          id={`section-title-${this.props.id}`}
        />
        <label
          htmlFor={`section-order-${this.props.id}`}
        >
          In what order does this {this.props.type && this.props.type[this.listName]} come?
        </label>
        {this.invalidOrder() && <div class="error">{this.props.type[this.listName]} order must be a number above 0</div>}
        <input
          onChange={this.handleSectionOrder}
          type="number"
          id={`section-order-${this.props.installId}-${this.props.sectionId}`}
        />
      </div>
    );
  }
}
