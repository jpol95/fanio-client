import React from "react";
import FanioContext from "../FanioContext";
import Section from "../Section/Section";
import {Link} from 'react-router-dom'
import typeList from '../type-list'

export default class InstallmentView extends React.Component {
  static contextType = FanioContext;

  userId = Number(this.props.match.params.userId)
  isLoggedInUser = this.context.loggedInUser === this.userId


//change type to user lower case

  getInstallment = () => {
    return this.context.installmentList.find(
      (installment) => Number(this.props.match.params.installmentId) === installment.id
    );
  };

  getType = () => {
    // console.log(this.getInstallment())
    return typeList[this.getInstallment().type]
  };

  getSections() {
    // console.log(this.context)
    const sectionsArray = this.context.sectionList
      .filter((section) => {
        return section.installmentId === Number(this.props.match.params.installmentId);
      })
      .map((section) => {
        return <Section key={section.id} {...section} {...this.props} type={this.getType()} />;
      });

    sectionsArray.sort((a, b) => a.props.order - b.props.order);
    return sectionsArray;
  }

  render() {
    // console.log(this.context)
    return (
      <div className="fandom-view">
        <h4>{this.getInstallment() && this.getInstallment().title}</h4>
        {this.getSections()}
        {this.isLoggedInUser && <Link to={`/users/${this.userId}/fandoms/${this.getInstallment().fandomId}/installments/${this.getInstallment().id}/add-sections-form`}>Add {this.getType().sectionName}s</Link>}
      </div>
    );
  }
}
