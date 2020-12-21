import React from "react";
import { Link } from "react-router-dom";
import FanioContext from "../FanioContext";
import FetchService from "../FetchService";


export default class Installment extends React.Component {

  static contextType = FanioContext

  fandomId = this.props.match.params.fandomId;
  installmentId = this.props.id;
  userId = Number(this.props.match.params.userId)


  handleDeleteInstallment = (e) => {
    e.preventDefault()
    FetchService.deleteInstallment(this.userId, this.installmentId)
    .then(() => {
      this.context.handleDeleteInstallment(this.installmentId)
    })
  }

  render() {
    // console.log(this.props);
    return (
      <Link
        to={`/users/1/fandoms/${this.fandomId}/installment-view/${this.installmentId}`}
        className="fandom-view"
      >
        <h4>{this.props.title}</h4>
        <button>Edit</button>
        <button onClick={this.handleDeleteInstallment}>Delete</button>
      </Link>
    );
  }
}
