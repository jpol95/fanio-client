import React from 'react'
import {Link} from 'react-router-dom'

export default class Installment extends React.Component{

  static contextType = FanioContext

  fandomId = this.props.params.match.fandomId
  installmentId = this.props.installmentId
  

    getType = () => {
        return this.context.typeList.find(type => type.id === this.props.typeId)
    }

    render() {
        return (
          <Link to={`/users/1/fandom/${fandomId}/installment/${installmentId}/${this}`} className="fandom-view">
            <h4>{this.props.title}</h4>
          </Link>
        );
      }
}