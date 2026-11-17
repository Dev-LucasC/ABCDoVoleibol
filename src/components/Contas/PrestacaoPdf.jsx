import React, { useState } from 'react';
import useContent from '../../hooks/useContent';
import { mediaUrl } from '../../services/api';
import ContentStatus from '../ContentStatus';
import './contas.css';

const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function documentDate(value) {
  // Date-only values must not shift to the previous day in Brazilian timezones.
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(value || '');
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(`${year}-${month}-${day}T12:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== `${year}-${month}-${day}`) return null;
  return { iso: `${year}-${month}-${day}`, label: `${day}/${month}/${year}`, year };
}

function documentLink(pdf) {
  const data = pdf?.data ?? pdf;
  const file = (Array.isArray(data) ? data[0] : data)?.attributes;
  const url = mediaUrl(pdf);
  if (!url || (file?.mime && file.mime !== 'application/pdf') || (file?.ext && file.ext.toLowerCase() !== '.pdf')) return '';
  return url;
}

export default function PrestacaoPdf() {
  const result = useContent('/prestacaos?populate=*&sort=data:desc', true);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const posts = (Array.isArray(result.data) ? result.data : []).map(post => ({
    ...post, date: documentDate(post.attributes?.data),
  })).sort((a, b) => (b.date?.iso || '').localeCompare(a.date?.iso || ''));
  const years = [...new Set(posts.map(post => post.date?.year).filter(Boolean))];
  const visible = posts.filter(post => (!year || (year === 'unknown' ? !post.date : post.date?.year === year)) &&
    normalize(`${post.attributes?.provedor || ''} ${post.date?.label || ''} ${post.date?.year || ''}`).includes(normalize(search.trim())));
  const ready = !result.loading && !result.error;
  const latest = posts.find(post => post.date && documentLink(post.attributes?.pdf));
  const groups = [...new Set(visible.map(post => post.date?.year || 'Sem data informada'))];

  return <section><main className="contas" aria-labelledby="contas-title">
    <h1 id="contas-title">Prestação de Contas</h1><hr />
    <p className="contas-intro">Consulte os documentos disponibilizados pela ABC do Voleibol. Busque pelo provedor ou pela data e abra o PDF original para conhecer seu conteúdo.</p>
    <details className="contas-help"><summary>Como consultar estas informações?</summary>
      <p>Prestação de contas é a apresentação de documentos sobre o uso de recursos. Provedor é a identificação que acompanha cada registro na fonte da associação.</p>
      <p>A data exibida é a data cadastrada no registro; ela não indica necessariamente o período financeiro ou a data de publicação. Os grupos por ano usam essa mesma data.</p>
      <p>Os PDFs abrem em outra aba. Para salvar uma cópia, use a opção de download do leitor de PDF.</p>
    </details>
    <ContentStatus {...result} empty={!posts.length}>Nenhum documento disponível no momento.</ContentStatus>
    {ready && posts.length > 0 && <>
      <div className="contas-filters">
        <label htmlFor="contas-search">Buscar por provedor ou data
          <input id="contas-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Digite um nome ou ano" />
        </label>
        {years.length > 0 && <label htmlFor="contas-year">Ano da data cadastrada
          <select id="contas-year" value={year} onChange={event => setYear(event.target.value)}>
            <option value="">Todos os anos</option>
            {years.map(value => <option key={value} value={value}>{value}</option>)}
            {posts.some(post => !post.date) && <option value="unknown">Sem data informada</option>}
          </select>
        </label>}
        {(search || year) && <button type="button" onClick={() => { setSearch(''); setYear(''); }}>Limpar filtros</button>}
      </div>
      <p role="status" className="contas-count">{visible.length} de {posts.length} {posts.length === 1 ? 'registro' : 'registros'}</p>
      {!visible.length && <p className="contas-empty">Nenhum documento encontrado. Tente outro nome, data ou limpe os filtros.</p>}
      {groups.map(group => <div className="contas-group" key={group}>
        <h2>{group}</h2>
        <ul className="contas-list">{visible.filter(post => (post.date?.year || 'Sem data informada') === group).map(post => {
          const pdf = documentLink(post.attributes?.pdf);
          const title = post.attributes?.provedor || 'Provedor não informado';
          return <li className="provedor" key={post.id}>
            <div className="contas-document">
              {latest?.id === post.id && <span className="contas-latest">Mais recente pela data cadastrada</span>}
              <h3>{title}</h3>
              <p>Data cadastrada: {post.date ? <time dateTime={post.date.iso}>{post.date.label}</time> : 'Não informada'}</p>
            </div>
            {pdf ? <a href={pdf} target="_blank" rel="noopener noreferrer" aria-label={`Visualizar PDF: ${title}${post.date ? ', ' + post.date.label : ''} (abre em outra aba)`}>Visualizar PDF <span aria-hidden="true">↗</span></a> : <p className="contas-unavailable">Documento indisponível.</p>}
          </li>;
        })}</ul>
      </div>)}
    </>}
  </main></section>;
}
