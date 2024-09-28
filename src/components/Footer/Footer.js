import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <footer>
      <div className="top">
        <div className="pages">
          <ul>
            <h3>OneTap</h3>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/subbed-anime">Subbed Anime</Link>
            </li>
            <li>
              <Link to="/dubbed-anime">Dubbed Anime</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/ova">OVA</Link>
            </li>
          </ul>

          <ul>
            <h3>categories 1</h3>
            <li>
              <Link to="/most-favorite">Most Favorite</Link>
            </li>
            <li>
              <Link to="/most-popular">Most Popular</Link>
            </li>
            <li>
              <Link to="/recently-added">Recently Added</Link>
            </li>
            <li>
              <Link to="/recently-updated">Recently Updated</Link>
            </li>
          </ul>

          <ul>
            <h3>categories 2</h3>
            <li>
              <Link to="/completed">Completed</Link>
            </li>

            <li>
              <Link to="/ona">ONA</Link>
            </li>

            <li>
              <Link to="/special">Special</Link>
            </li>

            <li>
              <Link to="/tv">TV</Link>
            </li>
          </ul>

          <ul>
            <h3>Who We Are</h3>
            <li>
              <Link to="">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="newsletter">
          <h3>Coming Soon...</h3>
          <button className="glowing-btn">
            <span className="glowing-txt">
              L<span className="faulty-letter">O</span>GIN!
            </span>
          </button>
        </div>
      </div>
      <div className="social">
        <i className="fab fa-telegram"></i>
        <i className="fab fa-youtube"></i>
        <i className="fab fa-instagram"></i>
      </div>
      <div className="info">
        <div className="copyright"> &copy; 2024 OneTap</div>
      </div>
    </footer>
  </>
);

export default Footer;
