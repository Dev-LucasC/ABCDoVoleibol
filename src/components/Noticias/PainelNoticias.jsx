import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './painelnoticias.css'
import { Link } from 'react-router-dom';

import React, { useState, useEffect } from "react";
import axios from 'axios'

export const PainelNoticias = ({ slides }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("https://king-prawn-app-bnxyc.ondigitalocean.app/api/noticias?populate=*")
            .then((response) => {
                const { data } = response.data;
                setPosts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (

        <div className="news-container">
          
                <div>
                    <h1>Noticias</h1>
                    <hr size="6" width="100%" align="left" color="black"></hr>
                </div>
            
            <div className="news-grid">
                {posts.map((post, index) => (
                    <div key={post.id} className="news-item">
                        <div className="news-img-container">
                            <img src={"https://king-prawn-app-bnxyc.ondigitalocean.app" + post?.attributes.imagem.data[0].attributes.url} alt={post?.attributes?.titulo} />
                        </div>
                        <div className="news-text-container">
                            <h3 className="news-text-title">{post?.attributes?.titulo}</h3>
                            <p className="news-text-content">{post?.attributes?.texto}</p>
                            <div className="news-link-container">
                                <Link to={`/noticias/${post?.id}`} className="news-link">Ver notícia completa</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}
