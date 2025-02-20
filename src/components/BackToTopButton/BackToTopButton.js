import React, { useState, useEffect } from 'react';
import "./style.css";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
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
      href="#" // Added valid href attribute
      id="button"
      className={isVisible ? 'show' : ''}
      onClick={scrollToTop}
    >
      ↑ Back to Top
    </a>
  );
};

export default BackToTopButton;
