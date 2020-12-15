import React from 'react'
import FanioContext from '../FanioContext'
import Installment from '../Installment/Installment'
import {Link} from 'react-router-dom'

export default class FandomView extends React.Component{

    static contextType = FanioContext 
    getFandom = () => {
     const fandom = this.context.fandomList.find(fandom => Number(this.props.match.params.fandomId) === fandom.id)
     return fandom
    }

    getInstallments(){
        return this.context.installmentList
        .filter(installment => installment.fandomId === Number(this.props.match.params.fandomId))
        .map(installment => {
          return <Installment key={installment.id} {...installment} {...this.props} />
        })
      }

    
    render() {
      return( 
        <React.Fragment>
      <h3>{this.getFandom() && this.getFandom().title}</h3>
      {this.getInstallments()}
      <Link to={`/users/1/fandoms/${this.props.match.params.fandomId}/add-installments-form`}>Add Installments</Link>
      </React.Fragment>
      )
    }
}