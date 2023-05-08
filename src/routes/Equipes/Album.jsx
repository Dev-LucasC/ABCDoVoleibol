import React, { useState } from 'react';
import axios from 'axios';

const Album = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [photos, setPhotos] = useState([]);

  const anos = [2016, 2017, 2018]; // Exemplo de anos disponíveis

  const handleYearSelect = async (year) => {
    setSelectedYear(year);
    try {
      const response = await axios.get(`/api/photos/${year}`); // Rota da API para obter as fotos do ano
      setPhotos(response.data); // Atualiza o estado com as fotos recebidas
    } catch (error) {
      console.log('Erro ao buscar as fotos:', error);
    }
  };

  return (
    <div className="album">
      <div className="year-dropdown">
        <span>Selecione um ano:</span>
        <select value={selectedYear} onChange={(e) => handleYearSelect(e.target.value)}>
          <option value="">Selecione...</option>
          {anos.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      </div>

      <div className="photos">
        {photos.map((photo) => (
          <div key={photo.id} className="photo">
            <img src={photo.url} alt={photo.title} />
            <div className="caption">{photo.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
