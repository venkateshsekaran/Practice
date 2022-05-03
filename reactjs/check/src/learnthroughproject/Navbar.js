import React from "react";
import { Link } from "react-router-dom";
class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="./home" className="navbar-brand">
            Login
          </Link>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-list">
                <Link to="./login" className="nav-link">
                  Login
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
