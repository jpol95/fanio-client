import React from "react";
import "./Footer.css";
import {Link} from 'react-router-dom'

export default class Footer extends React.Component {
  render() {
    return <footer>
      <div className="footer-label">FANIO</div>
      <div className="owner">Copyright © Jesse Pollack 2020</div>
      <Link to="/landing" className="landing-link">About</Link>
    </footer>;
  }
}
