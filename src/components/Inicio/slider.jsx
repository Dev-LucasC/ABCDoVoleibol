import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './App.css'
import { Link } from 'react-router-dom';


import React, { useState, useEffect } from "react";
import axios from 'axios'

export const Slider = ({ slides }) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://shark-app-6myi8.ondigitalocean.app/api/noticias?populate=*")
      .then((response) => {
        const { data } = response.data;
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  posts.sort((a, b) => {
    const dateA = new Date(a.attributes.createdAt);
    const dateB = new Date(b.attributes.createdAt);
    return dateB - dateA;
  });
 

  return (
    <div className="ajuste_container">
      <div>
        <h1> Noticias </h1>
        <hr size="6" width="100%" align="left" color="black"></hr>
      </div>
      <div className="swiper">
        <Swiper
          modules={[Navigation,  A11y, EffectCube]}
          spaceBetween={20}
          slidesPerView={1}
          navigation

          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="swiper-centered"
        >
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className='container_noticias'>
                <div className='portofolio__item-img'>
                  <img src={post?.attributes.imagem.data.attributes.url} alt={post?.attributes?.titulo} loading="lazy" />
                </div>
                <h2>{post?.attributes?.titulo}</h2>
                <p className='portofolio__item-text'>{post?.attributes?.texto}</p>
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