import React from "react";
import { Link } from "react-router-dom";

export default class Installment extends React.Component {

  fandomId = this.props.match.params.fandomId;
  installmentId = this.props.id;


  render() {
    // console.log(this.props);
    return (
      <Link
        to={`/users/1/fandoms/${this.fandomId}/installment-view/${this.installmentId}`}
        className="fandom-view"
      >
        <h4>{this.props.title}</h4>
      
      </Link>
    );
  }
}
