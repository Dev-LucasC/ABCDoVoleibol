import React, { useState } from 'react';
import useContent from '../../hooks/useContent';
import ContentStatus from '../../components/ContentStatus';
import './jogo.css';

const PAGE_SIZE = 5;
function videoUrl(link) {
  try { const url = new URL(link); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
}

export default function Jogo() {
  const result = useContent('/lives?populate=*&sort=createdAt:desc', true);
  const [page, setPage] = useState(0);
  const posts = (Array.isArray(result.data) ? result.data : []).filter(post => videoUrl(post.attributes?.link));
  const [mainVideo, ...pastVideos] = posts;
  const lastPage = Math.max(0, Math.ceil(pastVideos.length / PAGE_SIZE) - 1);
  const currentPage = Math.min(page, lastPage);
  return <div className="live-container">
    <ContentStatus {...result} empty={!posts.length}>Nenhuma transmissão disponível.</ContentStatus>
    <div className="main-video-container">{mainVideo && <iframe className="responsive-iframe main-video" src={videoUrl(mainVideo.attributes.link)} allowFullScreen title="Transmissão mais recente" />}</div>
    {!!pastVideos.length && <div className="related-videos-container">
      <h1>Jogos anteriores</h1>
      <div className="carousel-container"><div className="finished-container">
        {pastVideos.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE).map(post => <iframe key={post.id} className="responsive-iframe finished" src={videoUrl(post.attributes.link)} allowFullScreen loading="lazy" title={'Jogo anterior ' + post.id} />)}
      </div><div className="ajuste-buton">
        <button className="carousel-arrow previous" aria-label="Vídeos anteriores" disabled={currentPage === 0} onClick={() => setPage(Math.max(0, currentPage - 1))}>&lt;</button>
        <button className="carousel-arrow next" aria-label="Próximos vídeos" disabled={currentPage >= lastPage} onClick={() => setPage(Math.min(lastPage, currentPage + 1))}>&gt;</button>
      </div></div>
    </div>}
  </div>;
}
