import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Img from "../../LazyLoading/Img/Img";
import Spinner from "../../Spinner/Spinner";
import LoadingBar from "react-top-loading-bar"; 
import "./style.css";

const CategoryData = ({ type }) => {
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const loadingBarRef = useRef(null); 

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        loadingBarRef.current?.continuousStart();
        const response = await axios.get(`https://aniwatch-api-puce-eight.vercel.app/anime/${type}?page=${currentPage}`);
        const data = response.data;

        if (data && data.animes) {
          setAnimeList((prevAnime) => [...prevAnime, ...data.animes]);
          setTotalPages(data.totalPages);
        } else {
          console.error("Invalid response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false); 
        loadingBarRef.current?.complete();
      }
    };

    fetchAnime();
  }, [type, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="anime-category-container">
      <LoadingBar height={3} color="blue" ref={loadingBarRef} /> 
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
