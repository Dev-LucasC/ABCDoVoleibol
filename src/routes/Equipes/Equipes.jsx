import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHeader from '../../components/NavHeader/NavHeader';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import './equipes.css'

export const Equipes = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    axios.get("https://king-prawn-app-bnxyc.ondigitalocean.app/api/calendarios?populate=*")
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
      <NavHeader />
      <Header />
      {posts.map((post, index) => {

        console.log("teste", post)
        return (
          <section>
            <h1> PROXIMOS JOGOS </h1>
            <div className='container_confronto'>
              <div className='confronto'>
                <img src={"https://king-prawn-app-bnxyc.ondigitalocean.app" + post?.attributes.time1.data[0].attributes.formats.thumbnail.url} alt="" />
                <h1>X</h1>
                <img src={"https://king-prawn-app-bnxyc.ondigitalocean.app" + post?.attributes.time2.data[0].attributes.formats.thumbnail.url} alt="" />
              </div>
              <h2>Local: {post?.attributes?.local}</h2>
              <p>Data: {post?.attributes?.data}</p>
              <div className='portofolio__item-cta'>
              </div>
            </div>
          </section>
        );
      })}

      <Footer />

    </>
  );

};
