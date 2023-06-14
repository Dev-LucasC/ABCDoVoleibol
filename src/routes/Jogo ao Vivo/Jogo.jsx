import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import Teste from '../../components/NavHeader/NavHeader';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

import "./jogo.css"

const Jogo = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleVideos, setVisibleVideos] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://shark-app-6myi8.ondigitalocean.app/api/lives?populate=*&sort=createdAt:asc")
      .then((response) => {
        const { data } = response.data;
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const endIndex = currentIndex + 3;
    const videos = posts.slice(currentIndex, endIndex);
    setVisibleVideos(videos);
  }, [currentIndex, posts]);

  const mainVideo = posts[posts.length - 1];

  const goToPreviousSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex < posts.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <Teste />
      <Header />
      <div className="live-container">
        {mainVideo && (
          <iframe
            className="responsive-iframe main-video"
            src={mainVideo?.attributes.link}
            allowFullScreen
            title="Live Stream"
          ></iframe>
        )}
        <div className="separator"></div>
        <h1>Jogos passados</h1>
        <div className="carousel-container">
          <div className="finished-container" ref={sliderRef}>
            {visibleVideos.map((post, index) => (
              <iframe
                key={index}
                className="responsive-iframe finished"
                src={post?.attributes.link}
                allowFullScreen
                title="Live Stream"
              ></iframe>
            ))}
          </div>
          {currentIndex > 0 && (
            <button className="carousel-arrow previous" onClick={goToPreviousSlide}>
              &lt;
            </button>
          )}
          {currentIndex < posts.length - 4 && (
            <button className="carousel-arrow next" onClick={goToNextSlide}>
              &gt;
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jogo;
