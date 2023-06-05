import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import Teste from '../../components/NavHeader/NavHeader';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./jogo.css"
const Jogo = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://shark-app-6myi8.ondigitalocean.app/api/lives?populate=*&sort=createdAt:asc")
      .then((response) => {
        const { data } = response.data;
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Teste />
      <Header />
      <div className="iframe-container">
        {posts.map((post, index) => (
          <iframe
            key={index}
            className={`responsive-iframe ${index === posts.length - 1 ? 'main-video' : 'finished'}`}
            src={post?.attributes.link}
            allowFullScreen
            title="Live Stream"
          ></iframe>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Jogo;
