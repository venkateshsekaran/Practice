import React from "react";
const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <a href="./home" className="navbar brand">
        Employee
      </a>
      <div className=" ml-auto">
        <ul className="navbar-nav">
          <li className="nav-list">
            <a href="./employee" className="nav-link">
              Employee
            </a>
          </li>
          <li className="nav-list">
            <a href="./list" className="nav-link">
              List
            </a>
          </li>
          <li className="nav-list">
            <a href="./curconvert" className="nav-link">
              Currency converter
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
