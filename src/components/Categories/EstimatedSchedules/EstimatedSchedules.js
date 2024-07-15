import React, { useState, useEffect } from "react";
import "./style.css";

const EstimatedSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const response = await fetch(`https://aniwatch-api-puce-eight.vercel.app/anime/schedule?date=${formattedDate}`);
        const data = await response.json();
        const { scheduledAnimes } = data;
        setSchedules(scheduledAnimes);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="schedules-container">
      <h3 className="today-anime">Today's Anime Shows</h3>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            <span>Anime Name:</span> {schedule.name} - <span>Time:</span> {schedule.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstimatedSchedules;
