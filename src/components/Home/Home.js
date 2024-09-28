import React, { useState, useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import Carousel from "../Carousel/Carousel";
import Top10Anime from "../Categories/Top10Anime/Top10Anime";
import Top10AnimeWeek from "../Categories/Top10AnimeWeek/Top10AnimeWeek";
import Top10AnimeMonth from "../Categories/Top10AnimeMonth/Top10AnimeMonth";
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
  const [top10AnimesWeek, setTop10AnimesWeek] = useState([]);
  const [top10AnimesMonth, setTop10AnimesMonth] = useState([]);
  const [genres, setGenres] = useState([]);

  const loadingBarRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      loadingBarRef.current.staticStart();
      try {
        const response = await fetch("https://aniwatch-api-puce-eight.vercel.app/anime/home");
        loadingBarRef.current.continuousStart();
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

        if (data.top10Animes && data.top10Animes.week) {
          setTop10AnimesWeek(data.top10Animes.week);
        } else {
          console.error("Invalid data structure:", data);
          setTop10AnimesWeek([]);
        }

        if (data.top10Animes && data.top10Animes.month) {
          setTop10AnimesMonth(data.top10Animes.month);
        } else {
          console.error("Invalid data structure:", data);
          setTop10AnimesMonth([]);
        }

        // Assuming genres data comes from the API, otherwise use a static list
        setGenres(data.genres || ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Historical", "Horror", "Isekai", "Josei", "Kids", "Magic", "Martial Arts", "Mecha", "Military", "Music", "Mystery", "Parody", "Police", "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life", "Space", "Sports", "Super Power", "Supernatural", "Thriller", "Vampire"]);
        loadingBarRef.current.complete();
      } catch (error) {
        console.error("Error fetching data:", error);
        loadingBarRef.current.complete();
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <LoadingBar height={3} color="blue" ref={loadingBarRef} />
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

        <Top10AnimeWeek top10AnimesWeek={top10AnimesWeek} />

        <div className="topupcominganime-container">
          <h1>Top Upcoming Animes</h1>
          <Carousel animeData={topUpcomingAnimes} />
        </div>

        <Top10AnimeMonth top10AnimesMonth={top10AnimesMonth} />

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
