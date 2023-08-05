import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './noticiacompleta.css'
import Header from '../../components/Header/index'
import NavHeader from '../../components/NavHeader/NavHeader';
import Footer from "../../components/footer/Footer"

const NoticiaCompleta = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const newsRef = useRef(null); // Referência para a div da notícia

  useEffect(() => {
    axios.get(`https://shark-app-6myi8.ondigitalocean.app/api/noticias/${id}?populate=*`)
      .then((response) => {
        const { data } = response.data;
        setPost(data);
        scrollToNews(); // Chama a função para rolar a página quando o post for carregado
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

  const scrollToNews = () => {
    if (newsRef.current) {
      newsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (!post) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <NavHeader />
      <Header />
      <div className="news-container">
        <div ref={newsRef} className="news-details">
          <div className="news-image">
            <img src={post?.attributes.imagem.data.attributes.url} alt={post?.attributes?.titulo} loading="lazy" />
          </div>
          <h2>{post?.attributes?.titulo}</h2>
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
          <Footer />
    </>
  );
};

export default NoticiaCompleta;
