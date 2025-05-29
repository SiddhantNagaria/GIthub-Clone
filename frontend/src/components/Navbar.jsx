import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 border-bottom border-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
            className="rounded-circle"
            style={{ height: "40px" }}
          />
          <h3 className="ms-2 mb-0 text-white">GitHub</h3>
        </Link>
        <div className="d-flex">
          <Link to="/create" className="nav-link text-white fw-bold me-4">
            Create a Repository
          </Link>
          <Link to="/profile" className="nav-link text-white fw-bold">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
