import React from "react";
import Installment from '../Installment/Installment'
import './Fandom.css'
import {Link} from 'react-router-dom'
import FetchService from "../FetchService";
import FanioContext from "../FanioContext";



export default class Fandom extends React.Component {

  static contextType = FanioContext

  userId = Number(this.props.match.params.userId)

  handleDeleteFandom = (e) => {
    e.preventDefault()
    FetchService.deleteFandom(this.userId, this.props.id)
    .then(() => {
      this.context.handleDeleteFandom(this.props.id)
    })
  }

  render() {
    return (
      <Link to={`/users/1/fandom-view/${this.props.id}`} className="fandom-view">
        <h3>{this.props.title}</h3>
        <button>Edit</button>
        <button onClick={this.handleDeleteFandom}>Delete</button>
      </Link>
    );
  }
}
