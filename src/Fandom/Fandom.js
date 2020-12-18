import React from "react";
import Installment from '../Installment/Installment'
import './Fandom.css'
import {Link} from 'react-router-dom'


export default class Fandom extends React.Component {

  

  render() {
    return (
      <Link to={`/users/1/fandom-view/${this.props.id}`} className="fandom-view">
        <h3>{this.props.title}</h3>
      </Link>
    );
  }
}
