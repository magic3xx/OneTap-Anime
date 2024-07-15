import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import Hls from "hls.js";
import "./style.css";

const SubEpisodePlayer = ({ episodeId, animeDetails, selectedEpisodeIndex, setSelectedEpisodeIndex }) => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isLoadingEpisode, setIsLoadingEpisode] = useState(false);
  const [nextEpisode, setNextEpisode] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [playingEpisodeName, setPlayingEpisodeName] = useState("");
  const videoRef = useRef(null);

  const fetchEpisodeData = useCallback(
    async (index) => {
      try {
        setIsLoadingEpisode(true);
        const response = await axios.get(`https://aniwatch-api-puce-eight.vercel.app/anime/episode-srcs?id=${animeDetails.episodes[index].episodeId}&server=vidstreaming&category=sub`);
        const episodeData = response.data;
        setSelectedEpisodeIndex(index);
        setSelectedEpisode(episodeData);
        setPlayingEpisodeName(`Episode ${animeDetails.episodes[index].number}: ${animeDetails.episodes[index].title}`);

        if (episodeData && episodeData.thumbnailsFile) {
          const thumbnailResponse = await axios.get(episodeData.thumbnailsFile);
          setThumbnailUrl(thumbnailResponse.data);
        } else {
          setThumbnailUrl(null);
        }

        if (index + 1 < animeDetails.episodes.length) {
          setNextEpisode({
            index: index + 1,
            number: animeDetails.episodes[index + 1].number,
            title: animeDetails.episodes[index + 1].title,
          });
        } else {
          setNextEpisode(null);
        }
        setIsLoadingEpisode(false);
      } catch (error) {
        console.error("Error fetching episode data:", error);
        setIsLoadingEpisode(false);
      }
    },
    [animeDetails, setSelectedEpisodeIndex]
  );

  useEffect(() => {
    if (animeDetails && animeDetails.episodes.length > 0) {
      fetchEpisodeData(selectedEpisodeIndex);
    }
  }, [animeDetails, fetchEpisodeData, selectedEpisodeIndex]);

  useEffect(() => {
    if (selectedEpisode) {
      const video = videoRef.current;
      if (video) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(selectedEpisode.sources[0].url);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = selectedEpisode.sources[0].url;
        }
      }
    }
  }, [selectedEpisode]);

  const handleNextEpisodeClick = useCallback(() => {
    if (nextEpisode !== null) {
      setSelectedEpisodeIndex(nextEpisode.index);
      fetchEpisodeData(nextEpisode.index);
    }
  }, [nextEpisode, fetchEpisodeData, setSelectedEpisodeIndex]);

  const handleVideoEnded = useCallback(() => {
    setIsLoadingEpisode(true);
    handleNextEpisodeClick();
  }, [handleNextEpisodeClick]);

  useEffect(() => {
    const addSubtitlesTracks = async () => {
      const video = videoRef.current;
      if (video && selectedEpisode && selectedEpisode.tracks) {
        while (video.firstChild) {
          video.removeChild(video.firstChild);
        }

        let englishSubtitleAdded = false;

        selectedEpisode.tracks.forEach((track) => {
          const trackElement = document.createElement("track");
          trackElement.kind = track.kind;
          trackElement.src = track.file;
          trackElement.srclang = track.language;
          trackElement.label = track.label;

          if (track.language === "en") {
            if (!englishSubtitleAdded && track.default) {
              trackElement.default = true;
              video.appendChild(trackElement);
              englishSubtitleAdded = true;
            }
          } else {
            video.appendChild(trackElement);
          }
        });
      }
    };

    addSubtitlesTracks();
  }, [selectedEpisode]);

  return (
    <div className="playback-section">
      {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" />}
      <h4>{selectedEpisode?.episodeId}</h4>
      <h2>{playingEpisodeName}</h2>
      {isLoadingEpisode && <p className="episode-loading">Loading...</p>}
      <video className="video-player" id="video-player" ref={videoRef} controls onEnded={handleVideoEnded} crossOrigin="anonymous">
        <source src={selectedEpisode?.sources[0]?.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {nextEpisode && (
        <div className="next-episode">
          <h4>
            Next Episode: <span onClick={handleNextEpisodeClick}>{`Episode ${nextEpisode.number} - ${nextEpisode.title}`}</span>
          </h4>
        </div>
      )}
    </div>
  );
};

export default SubEpisodePlayer;
