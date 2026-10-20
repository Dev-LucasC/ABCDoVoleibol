import React from 'react';
import useContent from '../../hooks/useContent';
import { mediaUrl } from '../../services/api';
import ContentStatus from '../ContentStatus';
import './contas.css';

export default function PrestacaoPdf() {
  const result = useContent('/prestacaos?populate=*&sort=data:desc', true);
  const posts = Array.isArray(result.data) ? result.data : [];
  return <section><main className="contas">
    <h1>Prestação de Contas</h1><hr />
    <ContentStatus {...result} empty={!posts.length}>Nenhum documento disponível.</ContentStatus>
    {posts.map(post => {
      const pdf = mediaUrl(post.attributes?.pdf);
      return <div className="provedor" key={post.id}>
        <h4>Provedor: {post.attributes?.provedor}</h4><h5>Data: {post.attributes?.data || 'Não informada'}</h5>
        {pdf ? <a href={pdf} target="_blank" rel="noopener noreferrer" download>Download PDF</a> : <p>Documento indisponível.</p>}
      </div>;
    })}
  </main></section>;
}
