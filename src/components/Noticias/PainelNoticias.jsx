import React from 'react';
import { Link } from 'react-router-dom';
import useContent from '../../hooks/useContent';
import ContentStatus from '../ContentStatus';
import MediaImage from '../MediaImage';
import './painelnoticias.css';

export const PainelNoticias = () => {
  const result = useContent('/noticias?populate=*&sort=createdAt:desc&pagination[pageSize]=16');
  const posts = Array.isArray(result.data) ? result.data : [];
  return <div className="news-container">
    <div><h1>Notícias</h1><hr /></div>
    <ContentStatus {...result} empty={!posts.length}>Nenhuma notícia disponível.</ContentStatus>
    <div className="news-grid">{posts.map(post => <div key={post.id} className="news-item">
      <div className="news-img-container"><MediaImage media={post.attributes?.imagem} alt={post.attributes?.titulo || 'Notícia'} /></div>
      <div className="news-text-container"><h3 className="news-text-title">{post.attributes?.titulo}</h3><p className="news-text-content">{post.attributes?.texto}</p>
        <div className="news-link-container"><Link to={'/noticias/' + post.id} className="news-link">Ver notícia completa</Link></div>
      </div>
    </div>)}</div>
  </div>;
};
