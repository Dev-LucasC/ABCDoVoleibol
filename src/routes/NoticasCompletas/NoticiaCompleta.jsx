import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './noticiacompleta.css'
import Header from '../../components/Header/index'
import NavHeader from '../../components/NavHeader/NavHeader';

const NoticiaCompleta = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://shark-app-6myi8.ondigitalocean.app/api/noticias/${id}?populate=*`)
      .then((response) => {
        const { data } = response.data;
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("https://shark-app-6myi8.ondigitalocean.app/api/noticias?populate=*")
      .then((response) => {
        const { data } = response.data;
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const filteredData = sortedData.slice(0, 9);
        setPosts(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!post) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <NavHeader />
      <Header />
      <div className="news-container">
        <div className="news-details">
          <h2>{post?.attributes?.titulo}</h2>
          <div className="news-image">
            <img src={post?.attributes.imagem.data.attributes.url} alt={post?.attributes?.titulo} loading="lazy" />
          </div>

          <p>{post?.attributes?.texto}</p>
          <div className="news-link-container">
            <Link to={`/noticias`} className="news-link">
              Voltar
            </Link>
          </div>
        </div>
        <div className="other-news">
          {posts.map((item) => (
            <div key={item.id} className="news-item">
              <div className="news-item-image">
                <img src={item?.attributes.imagem.data.attributes.url} alt={item?.attributes?.titulo} loading="lazy" />
              </div>
              <div className="news-item-details">
                <h3 className="news-item-title">{item?.attributes?.titulo}</h3>
                <p className="news-item-text">{item?.attributes?.texto}</p>
                <div className="news-item-link-container">
                  <Link to={`/noticias/${item?.id}`} className="news-item-link">
                    Ver notícia completa
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NoticiaCompleta;
