import React from "react";
import { Link } from "react-router-dom";
import FanioContext from "../FanioContext";

export default class Installment extends React.Component {
  static contextType = FanioContext;

  fandomId = this.props.match.params.fandomId;
  installmentId = this.props.id;

  getType = () => {
    return this.context.typeList.find((type) => type.id === this.props.typeId);
  };

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
