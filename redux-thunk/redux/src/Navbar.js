import React from "react";
import { Link } from "react-router-dom";
let Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg text-white">
      <Link to="/home" className="navbar-brand">
        Redux-Thunk
      </Link>
      <div className="navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-list">
            <Link className="nav-link" to="/user">
              User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
