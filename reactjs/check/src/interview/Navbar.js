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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
