import React, { useState, useEffect } from "react";
import "./style.css";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-us">
      {loading && (
        <div className="loading-bar">
          <div className="progress"></div>
        </div>
      )}

      {!loading && (
        <>
          <h2>About Us</h2>
          <p>We are passionate about delivering the best services and solutions to our clients. Our team is dedicated to ensuring that we exceed expectations and provide innovative solutions that drive success.</p>
          <div className="team">

          </div>
        </>
      )}
    </div>
  );
};

export default About;
