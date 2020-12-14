import React from 'react'
import FanioContext from '../FanioContext'
import Installment from '../Installment/Installment'

export default class FandomView extends React.Component{

    static contextType = FanioContext 
    getTitle = () => {
     const fandom = this.context.fandomList.find(fandom => Number(this.props.match.params.fandomId) === fandom.Id)
     return fandom === undefined ? "" : fandom.title
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
      <h3>{this.getTitle()}</h3>
      {this.getInstallments()}
      </React.Fragment>
      )
    }
}