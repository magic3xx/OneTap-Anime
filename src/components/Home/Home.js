import React, { useState, useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import Top10Anime from "../Categories/Top10Anime/Top10Anime";
import "./style.css";
import BackgroundPoster from "../BackgroundPoster/BackgroundPoster";
import Genres from "../Genres/Genres/Genres";

const Home = () => {
  const [spotlightAnimes, setSpotlightAnimes] = useState([]);
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [topUpcomingAnimes, setTopUpcomingAnimes] = useState([]);
  const [topAiringAnimes, setTopAiringAnimes] = useState([]);
  const [latestEpisodeAnimes, setLatestEpisodeAnimes] = useState([]);
  const [top10Animes, setTop10Animes] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://aniwatch-api-puce-eight.vercel.app/anime/home");
        const data = await response.json();

        setSpotlightAnimes(data.spotlightAnimes || []);
        setTrendingAnimes(data.trendingAnimes || []);
        setTopUpcomingAnimes(data.topUpcomingAnimes || []);
        setTopAiringAnimes(data.topAiringAnimes || []);
        setLatestEpisodeAnimes(data.latestEpisodeAnimes || []);
        if (data.top10Animes && data.top10Animes.today) {
          setTop10Animes(data.top10Animes.today);
        } else {
          console.error("Invalid data structure:", data);
          setTop10Animes([]);
        }

        // Assuming genres data comes from the API, otherwise use a static list
        setGenres(data.genres || ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Historical", "Horror", "Isekai", "Josei", "Kids", "Magic", "Martial Arts", "Mecha", "Military", "Music", "Mystery", "Parody", "Police", "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life", "Space", "Sports", "Super Power", "Supernatural", "Thriller", "Vampire"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BackgroundPoster spotlightAnimes={spotlightAnimes}>
        <div className="trendinganime-container">
          <h1>Trending Animes</h1>
          <Carousel animeData={trendingAnimes} />
        </div>
      </BackgroundPoster>

      <div className="home-container">
        <div className="spotlightanime-container">
          <h1>Spotlight Anime</h1>
          <Carousel animeData={spotlightAnimes} />
        </div>

        <Top10Anime top10Animes={top10Animes} />

        <div className="topairinganime-container">
          <h1>Top Airing Animes</h1>
          <Carousel animeData={topAiringAnimes} />
        </div>

        <div className="topupcominganime-container">
          <h1>Top Upcoming Animes</h1>
          <Carousel animeData={topUpcomingAnimes} />
        </div>

        <div className="latestepisode-container">
          <h1>Latest Episodes</h1>
          <Carousel animeData={latestEpisodeAnimes} />
        </div>

        <Genres genres={genres} />
      </div>
    </>
  );
};

export default Home;
