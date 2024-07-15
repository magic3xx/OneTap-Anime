import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EpisodesList from "../EpisodesList/EpisodesList";
import EpisodePlayer from "./DubEpisodePlayer/DubEpisodePlayer";
import "./style.css";
import Spinner from "../Spinner/Spinner";

const WatchOnlineDub = () => {
  const { animeId } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://aniwatch-api-puce-eight.vercel.app/anime/episodes/${animeId}`);
        const data = response.data;
        setAnimeDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime details:", error);
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [animeId]);

  const handleEpisodeClick = (index) => {
    setSelectedEpisodeIndex(index);
  };

  if (loading) {
    return (
      <div className="wos-spinner">
        <Spinner loading={loading} />
      </div>
    );
  }

  return (
    <div className="watch-online-dub-container">
      <h2 className="anime-title">{animeId && animeId.slice(0, animeId.lastIndexOf("-"))}</h2>
      <div className="watch-online-container">
        <EpisodePlayer episodeId={animeId} animeDetails={animeDetails} selectedEpisodeIndex={selectedEpisodeIndex} setSelectedEpisodeIndex={setSelectedEpisodeIndex} />
        <EpisodesList animeDetails={animeDetails} onEpisodeClick={handleEpisodeClick} />
      </div>
    </div>
  );
};

export default WatchOnlineDub;
