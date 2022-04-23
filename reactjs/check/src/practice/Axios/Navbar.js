import React from "react";

import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="./home" className="navbar-brand">
            React Component
          </Link>
          <div className="ml-auto">
            <ul className="navbar nav">
              <li className="nav-item">
                <Link to="./axios1" className="nav-link">
                  Axi
                </Link>
              </li>
              <li className="nav-item">
                <Link to="./home" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
