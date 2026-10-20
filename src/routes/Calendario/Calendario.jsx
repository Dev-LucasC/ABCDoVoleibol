import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import useContent from '../../hooks/useContent';
import ContentStatus from '../../components/ContentStatus';
import MediaImage from '../../components/MediaImage';
import './calendario.css';

export const Calendario = () => {
  const [categoria, setCategoria] = useState('');
  const [genero, setGenero] = useState('');
  const [pagina, setPagina] = useState(1);
  const params = new URLSearchParams({ populate: '*', sort: 'data:desc', 'pagination[page]': pagina, 'pagination[pageSize]': 10 });
  if (categoria) params.set('filters[$and][0][categoria][$containsi]', categoria);
  if (genero) params.set('filters[$and][1][categoria][$containsi]', genero);
  const result = useContent('/calendarios?' + params);
  const jogos = Array.isArray(result.data) ? result.data : [];
  const totalPaginas = Math.max(1, result.meta?.pagination?.pageCount || 1);
  function escolherCategoria(value) { setCategoria(value); setGenero(''); setPagina(1); }
  function escolherGenero(value) { setGenero(value); setPagina(1); }
  return <>
    <div className="centralizador-botao">
      {['', 'SUB 14', 'SUB 17', 'SUB 19'].map(value => <button key={value} className="calendario-button" aria-pressed={categoria === value} onClick={() => escolherCategoria(value)}>{value || 'Todas as categorias'}</button>)}
    </div>
    <div className="centralizador-botao">
      {[['', 'Todos'], ['FEM', 'Feminino'], ['MASC', 'Masculino']].map(([value, label]) => <button key={label} className="calendario-button" aria-pressed={genero === value} onClick={() => escolherGenero(value)}>{label}</button>)}
    </div>
    <div className="calendario-container_posts">
      <ContentStatus {...result} empty={!jogos.length}>Nenhum jogo encontrado para os filtros selecionados.</ContentStatus>
      {!result.loading && !result.error && jogos.map(jogo => <div key={jogo.id} className="calendario-container_calendario">
        <div className="calendario-container_confronto"><div className="calendario-confronto">
          <h2>Categoria: {jogo.attributes?.categoria}</h2><h3>Local: {jogo.attributes?.local || 'A definir'}</h3>
          <p>Data: {jogo.attributes?.data ? moment(jogo.attributes.data).format('DD/MM/YYYY') : 'A definir'}</p>
          <div className="calendario-container">
            <MediaImage media={jogo.attributes?.time2} alt="Time 2" />
            <div className="calendario-placar"><h2>{jogo.attributes?.placar2 ?? '–'}</h2><h2>X</h2><h2>{jogo.attributes?.placar ?? '–'}</h2></div>
            <MediaImage media={jogo.attributes?.time1} alt="Time 1" />
          </div>
          <div className="calendario_btn"><Link to="/jogoaovivo" className="calendario">Ver transmissões</Link></div>
        </div></div>
      </div>)}
      <div className="btn-page">
        <button onClick={() => setPagina(value => value - 1)} disabled={result.loading || result.error || pagina <= 1}>Anterior</button>
        <span aria-live="polite">Página {pagina} de {totalPaginas}</span>
        <button onClick={() => setPagina(value => value + 1)} disabled={result.loading || result.error || pagina >= totalPaginas}>Próximo</button>
      </div>
    </div>
  </>;
};
