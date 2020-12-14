import React from "react";
import FanioContext from "../FanioContext";
import Section from "../Section/Section";

export default class InstallmentView extends React.Component {
  static contextType = FanioContext;

  getInstallment = () => {
    return this.context.installmentList.find(
      (installment) => Number(this.props.match.params.installmentId) === installment.id
    );
  };

  getType = () => {
    return this.context.typeList.find(
      (type) => this.getInstallment().typeId === type.id
    );
  };

  getSections() {
    const sectionsArray = this.context[`${this.getType().sectionName}List`]
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
    return (
      <div className="fandom-view">
        <h4>{this.getInstallment() && this.getInstallment().title}</h4>
        {this.context.fandomList.length != 0 && this.getSections()}
      </div>
    );
  }
}
