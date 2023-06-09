import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import Teste from '../../components/NavHeader/NavHeader';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./jogo.css"

const Jogo = () => {
  const [posts, setPosts] = useState([]);

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

  const mainVideo = posts[posts.length - 1];
  const finishedVideos = posts.slice(-3); // Mostrar apenas os 3 vídeos mais recentes

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
        <div className="finished-container">
          {finishedVideos.map((post, index) => (
            <iframe
              key={index}
              className="responsive-iframe finished"
              src={post?.attributes.link}
              allowFullScreen
              title="Live Stream"
            ></iframe>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jogo;
