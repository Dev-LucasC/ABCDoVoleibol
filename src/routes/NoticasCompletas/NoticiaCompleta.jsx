import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useContent from '../../hooks/useContent';
import ContentStatus from '../../components/ContentStatus';
import MediaImage from '../../components/MediaImage';
import './noticiacompleta.css';

export default function NoticiaCompleta() {
  const { id } = useParams();
  const result = useContent('/noticias/' + encodeURIComponent(id) + '?populate=*');
  const related = useContent('/noticias?populate=*&sort=createdAt:desc&pagination[pageSize]=9&filters[id][$ne]=' + encodeURIComponent(id));
  const post = result.data;
  const posts = Array.isArray(related.data) ? related.data : [];
  return <div className="news-container">
    <ContentStatus {...result} empty={!post}>Notícia não encontrada.</ContentStatus>
    {post && <div className="news-details">
      <div className="news-image"><MediaImage media={post.attributes?.imagem} alt={post.attributes?.titulo || 'Notícia'} /></div>
      <h2>{post.attributes?.titulo}</h2><p>{post.attributes?.texto}</p>
    </div>}
    <div className="news-link-container"><Link to="/noticias" className="news-link">Voltar às notícias</Link></div>
    <div className="other-news">
      <ContentStatus {...related} empty={!posts.length}>Nenhuma outra notícia disponível.</ContentStatus>
      {posts.map(item => <div key={item.id} className="news-item">
        <div className="news-item-image"><MediaImage media={item.attributes?.imagem} alt={item.attributes?.titulo || 'Notícia'} /></div>
        <div className="news-item-details"><h3 className="news-item-title">{item.attributes?.titulo}</h3><p className="news-item-text">{item.attributes?.texto}</p>
          <div className="news-item-link-container"><Link to={'/noticias/' + item.id} className="news-item-link">Ver notícia completa</Link></div>
        </div>
      </div>)}
    </div>
  </div>;
}
