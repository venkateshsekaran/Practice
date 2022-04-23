import React from "react";
import { Link } from "react-router-dom";
class Navbarreact extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="./home" className="navbar-brand">
            React Todo
          </Link>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-list">
                <Link to="./todo" className="nav-link">
                  Todo
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
