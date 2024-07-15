import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const BackgroundPoster = ({ spotlightAnimes, children }) => {
  const [poster, setPoster] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (spotlightAnimes.length > 0) {
      const randomIndex = Math.floor(Math.random() * spotlightAnimes.length);
      const posterUrl = spotlightAnimes[randomIndex].poster;
      setPoster(posterUrl);
    }
  }, [spotlightAnimes]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchValue}`);
  };

  return (
    <div className="background-poster" style={{ backgroundImage: poster ? `url(${poster})` : "none" }}>
      <div className="poster-content">
        <p className="text">Millions of Animes and Movies. Explore now</p>
        <div className="search-box">
          <form onSubmit={handleSubmit}>
            <input type="text" name="search" id="srch" placeholder="Find your favorite anime by name" value={searchValue} onChange={handleSearchChange} required />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="trendinganime-wrapper">{children}</div>
    </div>
  );
};

export default BackgroundPoster;
