import React from "react";
import Installment from '../Installment/Installment'
import './Fandom.css'
import FanioContext from '../FanioContext'


export default class Fandom extends React.Component {

  static contextType = FanioContext

  getInstallments(){
    return this.context.installmentList
    .filter(installment => installment.fandomId === this.props.id)
    .map(installment => {
      return <Installment key={installment.id} {...installment} />
    })
  }

  render() {
    return (
      <div className="fandom-view">
        <h3>{this.props.title}</h3>
        {this.getInstallments()}
      </div>
    );
  }
}
