import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
//import styles from './Header.module.css'

function Header(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-${props.background}`} style={
      {
        position: "sticky",
        top: "0vh"
      }
    }>
      <div className="container-fluid">
        <Link className="navbar-brand active" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="auth" className="nav-link" aria-current="page">Sign</Link>
            </li>
            <li className="nav-item">
              <Link to="contact" className="nav-link">About us</Link>
            </li>
          </ul>
          {props.searchBar ? <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form> : null}
        </div>
      </div>
    </nav>
  );
}
Header.defaultProps = {
  title: "Enter Your Title",
  background: "primary",
  searchBar: true
}
Header.prototype = {
  title: PropTypes.string,
  background: PropTypes.string,
  searchBar: PropTypes.bool
}
export default Header;