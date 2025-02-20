import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  return (
    <>
      <header>
        <input type="checkbox" name="" id="chk1" />
        <div className="logo">
          <div className="name-container">
            <div className="anime">Anime</div>
            <div className="name">Hobaz</div>
          </div>
        </div>
        <div className="search-box"></div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/subbed-anime">Sub Anime</Link>
          </li>
          <li>
            <Link to="/dubbed-anime">Dub Anime</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/ova">OVA</Link>
          </li>
        </ul>
        <div className="menu">
          <label htmlFor="chk1">
            <i className="fa fa-bars"></i>
          </label>
        </div>
      </header>
    </>
  );
};

export default NavBar;
