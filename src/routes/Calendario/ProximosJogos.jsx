import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Link } from 'react-router-dom';
import useContent from '../../hooks/useContent';
import ContentStatus from '../../components/ContentStatus';
import MediaImage from '../../components/MediaImage';
import './proximosjogos.css';

export const ProximosJogos = () => {
  const params = new URLSearchParams({ populate: '*', sort: 'data:asc', 'pagination[pageSize]': 6, 'filters[data][$gte]': moment().format('YYYY-MM-DD') });
  const result = useContent('/calendarios?' + params);
  const jogos = Array.isArray(result.data) ? result.data : [];
  return <div className="container_posts">
    <ContentStatus {...result} empty={!jogos.length}>Não temos nenhum jogo agendado para os próximos dias.</ContentStatus>
    {!result.loading && !result.error && jogos.map(jogo => <div key={jogo.id} className="container_calendario"><div className="container_confronto">
      <h2>Categoria: {jogo.attributes?.categoria}</h2>
      <div className="confronto"><MediaImage media={jogo.attributes?.time2} alt="Time 2" /><h1>X</h1><MediaImage media={jogo.attributes?.time1} alt="Time 1" /></div>
      <h2>Local: {jogo.attributes?.local || 'A definir'}</h2>
      <p>Data: {jogo.attributes?.data ? moment(jogo.attributes.data).format('DD/MM/YYYY') : 'A definir'}</p>
      <div className="btn-container"><Link to="/jogoaovivo" className="btn">Ver transmissões</Link></div>
    </div></div>)}
  </div>;
};
