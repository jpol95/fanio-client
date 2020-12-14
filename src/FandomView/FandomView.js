import React from 'react'
import FanioContext from '../FanioContext'

export default class FandomView extends React.Component{

    static contextType = FanioContext 
    getInstallments(){
        return this.context.installmentList
        .filter(installment => installment.fandomId === this.props.id)
        .map(installment => {
          return <Installment key={installment.id} {...installment} />
        })
      }

    
    render() {
        return this.getInstallments()
    }
}