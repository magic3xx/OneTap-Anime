import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import Hls from "hls.js";
import "./style.css";
// import LoadingBar from "react-top-loading-bar"; 

const DubEpisodePlayer = ({ episodeId, animeDetails, selectedEpisodeIndex, setSelectedEpisodeIndex }) => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isLoadingEpisode, setIsLoadingEpisode] = useState(false);
  const [nextEpisode, setNextEpisode] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [playingEpisodeName, setPlayingEpisodeName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const videoRef = useRef(null);
  // const loadingBarRef = useRef(null); 

  const fetchEpisodeData = useCallback(
    async (index) => {
      try {
        setIsLoadingEpisode(true);
        // loadingBarRef.current?.continuousStart();
        const response = await axios.get(`https://aniwatch-api-puce-eight.vercel.app/anime/episode-srcs?id=${animeDetails.episodes[index].episodeId}&server=vidstreaming&category=dub`);
        const episodeData = response.data;

        if (!episodeData.sources || episodeData.sources.length === 0) {
          throw new Error("Episode not available in dub");
        }

        setSelectedEpisodeIndex(index);
        setSelectedEpisode(episodeData);
        setPlayingEpisodeName(`Episode ${animeDetails.episodes[index].number}: ${animeDetails.episodes[index].title}`);

        if (episodeData.thumbnailsFile) {
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
        // loadingBarRef.current?.complete(); 
      } catch (error) {
        console.error("Error fetching episode data:", error);
        setPopupMessage("This episode is currently unavailable in the dubbed version. However, you can watch it in the subbed version.");
        setShowPopup(true);
        setIsLoadingEpisode(false);
        // loadingBarRef.current?.complete(); 
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
    if (selectedEpisode && selectedEpisode.sources && selectedEpisode.sources.length > 0) {
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
    const video = videoRef.current;
    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, [handleVideoEnded]);

  return (
    <div className="playback-section">
      {/* <LoadingBar height={3} color="blue" ref={loadingBarRef} />  */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
      {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" />}
      <h4>{selectedEpisode?.episodeId}</h4>
      <h2>{playingEpisodeName}</h2>
      {isLoadingEpisode && <p className="episode-loading">Loading...</p>}
      <video className="video-player" id="video-player" ref={videoRef} controls onEnded={handleVideoEnded} crossOrigin="anonymous">
        {selectedEpisode?.sources && selectedEpisode.sources.length > 0 && <source src={selectedEpisode.sources[0].url} type="video/mp4" />}
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

export default DubEpisodePlayer;
