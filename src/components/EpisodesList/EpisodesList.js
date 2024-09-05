import React from "react";
import "./style.css";

const EpisodesList = ({ animeDetails, onEpisodeClick }) => {
  return (
    <div class="episodes-list-container">
      <h2>Episode List</h2>
      <div className="episodes-list">
        {!animeDetails || !animeDetails.episodes ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {animeDetails.episodes.map((episode, index) => (
              <li key={episode.episodeId}>
                <span onClick={() => onEpisodeClick(index)}>{`Episode ${episode.number}: ${episode.title}`}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EpisodesList;