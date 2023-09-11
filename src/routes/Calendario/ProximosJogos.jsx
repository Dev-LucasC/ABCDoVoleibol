import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Link } from 'react-router-dom';
import './proximosjogos.css';

export const ProximosJogos = () => {
  const [confrontosOrganizados, setConfrontosOrganizados] = useState([]);

  useEffect(() => {
    axios
      .get("https://shark-app-6myi8.ondigitalocean.app/api/calendarios?populate=*")
      .then((response) => {
        const { data } = response.data;
        const confrontosFuturos = data.filter((confronto) => true);
        confrontosFuturos.sort((a, b) => moment(a.attributes.data).diff(moment(b.attributes.data), 'days'));
        setConfrontosOrganizados(confrontosFuturos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='container_posts'>
      {confrontosOrganizados.length === 0 ? (
        <div className='no-games-message'>
          <p>Não temos nenhum jogo agendado para os próximos dias.</p>
        </div>
      ) : (
        confrontosOrganizados.slice(0, 6).map((confronto, index) => {
          return (
            <div key={index} className='container_calendario'>
              <div className='container_confronto'>
                <h2>Categoria: {confronto?.attributes?.categoria}</h2>
                <div className='confronto'>
                  <img src={confronto?.attributes.time2.data[0].attributes.url} loading="lazy" alt="Time 2" />
                  <h1>X</h1>
                  <img src={confronto?.attributes.time1.data.attributes.url} loading="lazy" alt="Time 1" />
                </div>
                <h2>Local: {confronto?.attributes?.local}</h2>
                <p>Data: {moment(confronto?.attributes?.data).format("DD/MM/YYYY")}</p>
                <div className='btn-container'>
                  <Link to={`/jogoaovivo`} className='btn'>Ver Jogo</Link>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
