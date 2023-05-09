import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './noticiacompleta.css'
import Header from '../../components/Header/index'
import NavHeader from '../../components/NavHeader/NavHeader';

const NoticiaCompleta = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`https://shark-app-6myi8.ondigitalocean.app/api/noticias/${id}?populate=*`)
      .then((response) => {
        const { data } = response.data;
        setPost(data);
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
      <div className='container-noticias_completa'>
        <div className='container-noticiascompleta_img'>
         <img src={post?.attributes.imagem.data.attributes.url} alt={post?.attributes?.titulo} loading="lazy" />
        </div>
        <h2>{post?.attributes?.titulo}</h2>
        <p>{post?.attributes?.texto}</p>
        <div className='portofolio__item-cta-completa'>
          <Link to={`/noticias`} className='btn'>Voltar</Link>
        </div>
      </div>
    </>
  );
};

export default NoticiaCompleta;
