import React from "react";
import FanioContext from "../FanioContext";
import Section from "../Section/Section";
import { Link } from "react-router-dom";
import typeList from "../type-list";
import "./InstallmentView.css";

export default class InstallmentView extends React.Component {
  static contextType = FanioContext;

  userId = Number(this.props.match.params.userId);
  isLoggedInUser = this.context.loggedInUser === this.userId;

  getInstallment = () => {
    return this.context.installmentList.find(
      (installment) =>
        Number(this.props.match.params.installmentId) === installment.id
    );
  };

  getType = () => {
    return typeList[this.getInstallment().type];
  };

  getSections() {
    const sectionsArray = this.context.sectionList
      .filter((section) => {
        return (
          section.installmentId ===
          Number(this.props.match.params.installmentId)
        );
      })
      .map((section) => {
        return (
          <Section
            key={section.id}
            {...section}
            {...this.props}
            type={this.getType()}
          />
        );
      });

    sectionsArray.sort((a, b) => a.props.order - b.props.order);
    return sectionsArray;
  }

  render() {
    if (!this.getInstallment()) return null;
    return (
      <>
        <h1>{this.getInstallment() && this.getInstallment().title}</h1>
        <div className="fandom-view">
          <h3>
            {this.getType().sectionName.charAt(0).toUpperCase() +
              this.getType().sectionName.slice(1)}
            s
          </h3>
          {this.getSections()}
          {this.isLoggedInUser && (
            <Link
              className={"add-sections-link"}
              to={`/users/${this.userId}/fandoms/${
                this.getInstallment().fandomId
              }/installments/${this.getInstallment().id}/add-sections-form`}
            >
              Add {this.getType().sectionName}s
            </Link>
          )}
        </div>
      </>
    );
  }
}
