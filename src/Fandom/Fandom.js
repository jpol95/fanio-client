import React from "react";
import './Fandom.css'
import {Link} from 'react-router-dom'
import FetchService from "../FetchService";
import FanioContext from "../FanioContext";



export default class Fandom extends React.Component {

  static contextType = FanioContext

  handleDeleteFandom = (e) => {
    e.preventDefault()
    FetchService.deleteFandom(this.props.id)
    .then(() => {
      this.context.handleDeleteFandom(this.props.id)
    })
  }

  render() {
    const userId = Number(this.props.match.params.userId)
    const isLoggedInUser = this.context.loggedInUser === userId
    return (
      <Link to={`/users/${userId}/fandom-view/${this.props.id}`} className="fandom-view">
        <h3>{this.props.title}</h3>
        {isLoggedInUser &&
        <>
        <button onClick={(e) => {e.preventDefault(); window.open(`/users/${userId}/fandoms/${this.props.id}/edit-fandom`, "_self")}}>Edit</button>
        <button onClick={this.handleDeleteFandom}>Delete</button>
        </>
  }
      </Link>
    );
  }
}
