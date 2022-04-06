import React from "react";
import Lifecycle from "../componentlifecycle/Lifecycle";
import Lifecycle1 from "../componentlifecycle/Lifecycle1";
import Formhandling from "../formhandling/Formhandling";
class Nav extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <a href="#" className="navbar-brand">
            React Component
          </a>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Contacts
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  services
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Lifecycle />
        <Lifecycle1 />
        <Formhandling />
      </div>
    );
  }
}
export default Nav;
