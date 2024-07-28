import React from "react";
import "./style.css";

const EpisodesList = ({ animeDetails, onEpisodeClick }) => {
  return (
    <div className="episodes-list">
      <h2>Episode List</h2>
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
  );
};

export default EpisodesList;