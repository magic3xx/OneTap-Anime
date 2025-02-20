import React, { useState, useEffect } from 'react';
import "./style.css";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = (e) => {
    e.preventDefault(); // Prevents default anchor behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <a
      href="#"
      id="button"
      className={isVisible ? 'show' : ''}
      onClick={scrollToTop}
      role="button"
      aria-label="Back to Top"
    >
      ⬆️ {/* Replace with an icon if needed */}
    </a>
  );
};

export default BackToTopButton;
