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

  const scrollToTop = () => {
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
      onClick={(e) => {
        e.preventDefault(); // Prevents jumping to the top instantly
        scrollToTop();
      }}
      role="button"
      aria-label="Back to Top"
    >
      ⬆️ {/* You can replace this with an icon */}
    </a>
  );
};

export default BackToTopButton;
