import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Img from "../../LazyLoading/Img/Img";
import Spinner from "../../Spinner/Spinner";
import "./style.css";

const CategoryData = ({ type }) => {
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://aniwatch-api-puce-eight.vercel.app/anime/${type}?page=${currentPage}`);
        const data = response.data;
        if (data && data.animes) {
          setAnimeList((prevAnime) => [...prevAnime, ...data.animes]);
          setTotalPages(data.totalPages);
        } else {
          console.error("Invalid response structure:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime:", error);
        setLoading(false);
      }
    };

    fetchAnime();
  }, [type, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="anime-category-container">
      {loading && (
        <div className="spinner">
          <Spinner loading={loading} />
        </div>
      )}
      {!loading && (
        <>
          <div className="category-container">
            {animeList.map((anime) => (
              <Link key={anime.id} to={`/data/${anime.id}`} className="anime-card-link">
                <div className="category-card-container">
                  <div className="category-card">
                    <Img src={anime.poster} alt={anime.name} />
                    <h3>{anime.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {!loading && animeList.length === 0 && <p className="no-anime-message">No Anime available.</p>}
          <div className="button-container">
            {currentPage < totalPages && (
              <button className="load-button" id="load-more-button" onClick={handleLoadMore}>
                <span> Load More </span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryData;
