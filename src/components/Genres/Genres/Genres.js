import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Genres = ({ genres }) => {
  return (
    <div className="genres-background">
      <div className="genres-container">
        <h1>Genre</h1>
        <div className="button-row">
          {genres.map((genre, index) => (
            <button key={index} className="button-33">
              <Link to={`/genre/${encodeURIComponent(genre)}`} style={{ color: "inherit", textDecoration: "none" }}>
                {genre}
              </Link>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;
