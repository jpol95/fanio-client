import React from "react";
import FanioContext from "../FanioContext";
import Installment from "../Installment/Installment";
import { Link } from "react-router-dom";
import "./FandomView.css";

export default class FandomView extends React.Component {
  userId = Number(this.props.match.params.userId);
  isLoggedInUser = this.context.loggedInUser === this.userId;

  static contextType = FanioContext;
  getFandom = () => {
    const fandom = this.context.fandomList.find(
      (fandom) => Number(this.props.match.params.fandomId) === fandom.id
    );
    return fandom;
  };

  getInstallments() {
    return this.context.installmentList
      .filter(
        (installment) =>
          installment.fandomId === Number(this.props.match.params.fandomId)
      )
      .map((installment) => {
        return (
          <Installment key={installment.id} {...installment} {...this.props} />
        );
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="fandom-label">
          {this.getFandom() && this.getFandom().title}
        </h1>
        <div className="installment-label">INSTALLMENTS</div>
        {this.getInstallments()}
        {this.isLoggedInUser && (
          <Link
            className="create-installments-link"
            to={`/users/${this.userId}/fandoms/${this.props.match.params.fandomId}/add-installments-form`}
          >
            Add Installments
          </Link>
        )}
      </React.Fragment>
    );
  }
}
