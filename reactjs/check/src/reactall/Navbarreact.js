import React from "react";
import { Link } from "react-router-dom";
class Navbarreact extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="./home" className="navbar-brand">
            React All
          </Link>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-list">
                <Link to="./classreact" className="nav-link">
                  Class
                </Link>
              </li>
              <li className="nav-list">
                <Link to="./studentDetails" className="nav-link">
                  Props
                </Link>
              </li>
              <li className="nav-list">
                <Link to="./eventhandler" className="nav-link">
                  Event
                </Link>
              </li>
              <li className="nav-list">
                <Link to="./form" className="nav-link">
                  Form
                </Link>
              </li>
              <li className="nav-list">
                <Link to="./contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbarreact;
