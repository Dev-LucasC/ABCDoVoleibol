import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './App.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios'

SwiperCore.use([Autoplay]);

export const Slider = ({ slides }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Obter dados da API de notícias
    axios.get("https://shark-app-6myi8.ondigitalocean.app/api/noticias?populate=*")
      .then((response) => {
        const { data } = response.data;
        // Ordenar as notícias pela data de criação e pegar as últimas 3
        data.sort((a, b) => {
          const dateA = new Date(a.attributes.createdAt);
          const dateB = new Date(b.attributes.createdAt);
          return dateB - dateA;
        });
        setPosts(data.slice(0, 3)); // Alterado aqui para pegar apenas as últimas 3 notícias
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="ajuste_container">
      <div>
        {/* Título da seção de notícias */}
        <h1> Noticias </h1>
        <hr size="6" width="100%" align="left" color="black"></hr>
      </div>
      <div className="swiper">
        <Swiper
          modules={[Navigation,  A11y, EffectCube]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 5000 }} // Adicionado aqui para rolar automaticamente a cada 5 segundos
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="swiper-centered"
        >
          {/* Mapear e renderizar cada notícia no slider */}
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className='container_noticias'>
                {/* Imagem da notícia */}
                <div className='portofolio__item-img'>
                  <img src={post?.attributes.imagem.data.attributes.url} alt={post?.attributes?.titulo} loading="lazy" />
                </div>
                {/* Título e texto da notícia */}
                <h2>{post?.attributes?.titulo}</h2>
                <p className='portofolio__item-text'>{post?.attributes?.texto}</p>
                {/* Link para ver a notícia completa */}
                <div className='portofolio__item-cta'>
                  <Link to={`/noticias/${post?.id}`} className='btn'>Ver noticia</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
