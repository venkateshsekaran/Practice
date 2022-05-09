import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/index" className="navbar-brand">
          {" "}
          React - Redux and Thunk
        </Link>
        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/user" className="nav-link">
                User Data from Redux Store
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign-up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup1" className="nav-link">
                Sign-up1
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
