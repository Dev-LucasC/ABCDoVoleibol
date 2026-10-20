import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './slider.css';
import { Link } from 'react-router-dom';
import React from 'react';
import useContent from '../../hooks/useContent';
import ContentStatus from '../ContentStatus';
import MediaImage from '../MediaImage';

export const Slider = () => {
  const result = useContent('/noticias?populate=*&sort=createdAt:desc&pagination[pageSize]=3');
  const posts = Array.isArray(result.data) ? result.data : [];
  return <div className="ajuste_container">
    <div><h1>Notícias</h1><hr /></div>
    <ContentStatus {...result} empty={!posts.length}>Nenhuma notícia disponível.</ContentStatus>
    {!!posts.length && <div className="swiper"><Swiper modules={[Navigation, A11y, Autoplay]} spaceBetween={20} slidesPerView={1} navigation autoplay={{ delay: 5000 }} className="swiper-centered">
      {posts.map(post => <SwiperSlide key={post.id}><div className="container_noticias">
        <div className="portofolio__item-img"><MediaImage media={post.attributes?.imagem} alt={post.attributes?.titulo || 'Notícia'} /></div>
        <h2>{post.attributes?.titulo}</h2><p className="portofolio__item-text">{post.attributes?.texto}</p>
        <div className="portofolio__item-cta"><Link to={'/noticias/' + post.id} className="btn">Ver notícia</Link></div>
      </div></SwiperSlide>)}
    </Swiper></div>}
  </div>;
};
