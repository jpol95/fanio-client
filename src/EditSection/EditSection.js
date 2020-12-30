import React from "react";
import FanioContext from '../FanioContext'
import typeList from '../type-list'
import FetchService from "../FetchService";

export default class EditSection extends React.Component {

  static contextType = FanioContext
  state = {
    order: {value: 0, touched: false},
    title: {value: "", touched: false},
    loaded: false
  };

  userId = Number(this.props.match.params.userId)
  installmentId = Number(this.props.match.params.installmentId)
  subId = Number(this.props.match.params.subId)
  sectionId = Number(this.props.match.params.sectionId)
  genListName = this.props.match.params.subId ? "subList" : "sectionList"


  componentDidUpdate(){
      if (!this.getSection() || this.state.loaded) return 
      this.setState({
          order: {value: this.getSection().order, touched: false}, 
          title: {value: this.getSection().title, touched: false}, 
          loaded: true
      })
  }

  getInstallment = () => {
    return this.context.installmentList.find(installment => this.installmentId === installment.id)
}
  getType = () => {
    // console.log("hello")
    return typeList[this.getInstallment().type]
  }
//   //fix classes to not use type from context, then on with debugging the get calls for the seeded data

getSection = () => {
    return this.context[this.subId ? "subList" : "sectionList"].find(section => this[ this.subId ? "subId" : "sectionId"] === section.id)
}

  handleEditSection = async (e) => {
    e.preventDefault()
    const link = this.subId ? `/sections/sub/${this.props.match.params.subId}` : `/sections/section/${this.props.match.params.sectionId}`
    const sectionCopy = {title: this.state.title.value, order: this.state.order.value, id: this.subId ? this.subId : this.sectionId}
    const section = await FetchService.patchSection(sectionCopy, link)
    this.props.history.push(`/users/${this.userId}/fandoms/${this.props.match.params.fandomId}/installment-view/${this.props.match.params.installmentId}`) //CHANGE
    this.context.handleEditSection(section, this.genListName)
  }

  handleSectionOrder = (e) => {
    const order = e.target.value;
    this.setState({
      ...this.state,
      order: {value: order, touched: true},
    })
  };

  invalidOrder = () => {
    return  (!this.state.order.value || this.state.order.value < 0 || !Number.isInteger(Number(this.state.order.value)))
  }

  invalidTitle = () => {
    return  !this.state.title.value
  }

  handleSectionTitle = (e) => {
    const title = e.target.value;
    this.setState({
      ...this.state,
      title: {value: title, touched: true},
    })
  };

  render() {
      if (!this.state.loaded) return null
  const listName = this.props.match.params.subId ? this.getType().subName : this.getType().sectionName
    return (
      <form onSubmit={this.handleEditSection}>
        <label
          htmlFor={`section-title-${this.getSection().id}`}
        >
          What's the title of this {this.getType() && listName}?
        </label>
        {this.invalidTitle() && <div className="error">Title is required</div>}
        <input
          defaultValue={this.state.title.value}
          onChange={this.handleSectionTitle}
          id={`section-title-${this.getSection().id}`}
        />
        <label
          htmlFor={`section-order-${this.getSection().id}`}
        >
          In what order does this {this.getType() && listName} come?
        </label>
        {this.invalidOrder() && <div className="error">Title is required</div>}
        <input
          defaultValue={this.state.order.value}
          onChange={this.handleSectionOrder}
          type="number"
          id={`section-order-${this.getSection().id}`}
        />
        <br />
        <button disabled={this.invalidOrder() || this.invalidTitle()} className="edit-section-button" type="submit">Submit</button>
        </form>
    );
  }
}

