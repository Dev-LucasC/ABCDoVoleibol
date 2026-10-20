import React, { useState } from 'react';
import useContent from '../../hooks/useContent';
import { albumYears, newestFirst } from '../../services/api';
import ContentStatus from '../../components/ContentStatus';
import MediaImage from '../../components/MediaImage';
import './dropdownequipes.css';

export default function Album() {
  const result = useContent('/albums?populate=*&sort=createdAt:desc', true);
  const [selectedYear, setSelectedYear] = useState(null);
  const photosByYear = {};
  (Array.isArray(result.data) ? [...result.data] : []).sort(newestFirst).forEach(post => {
    const year = post.attributes?.Ano;
    const photos = post.attributes?.fotos?.data;
    if (year == null || !Array.isArray(photos) || !photos.length) return;
    photosByYear[year] = [...(photosByYear[year] || []), ...photos];
  });
  const years = albumYears(photosByYear);
  const currentYear = String(new Date().getFullYear());
  const year = years.includes(selectedYear) ? selectedYear : years.includes(currentYear) ? currentYear : years[0];
  return <div className="album-container">
    <h1>Álbum</h1><hr />
    <ContentStatus {...result} empty={!years.length}>Nenhuma foto disponível.</ContentStatus>
    <div className="year-list">{years.map(value => <button key={value} className={'year-button ' + (year === value ? 'selected' : '')} aria-pressed={year === value} onClick={() => setSelectedYear(value)}>{value}</button>)}</div>
    <div className="photo-grid">{(photosByYear[year] || []).map((photo, index) => <div key={String(photo.id) + '-' + index} className="photo-item"><MediaImage media={photo} alt={'Equipe ABC do Voleibol — ' + year} /></div>)}</div>
  </div>;
}
