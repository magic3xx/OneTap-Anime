import React, { useState, useEffect } from "react";
import "./style.css";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="contact-us">
      {loading && (
        <div className="loading-bar">
          <div className="progress"></div>
        </div>
      )}

      {!loading && (
        <>
          <h2>Contact Us</h2>
          <p>Follow us on social media to stay updated!</p>
          <div className="social-links">
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="social-card telegram">
              <div className="icon">
                <i className="fab fa-telegram-plane"></i>
              </div>
              <span className="telegram-icon">Telegram</span>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="social-card youtube">
              <div className="icon">
                <i className="fab fa-youtube"></i>
              </div>
              <span className="youtube-icon">YouTube</span>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-card instagram">
              <div className="icon">
                <i className="fab fa-instagram"></i>
              </div>
              <span className="instagram-icon">Instagram</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactUs;
