import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';

import './calendario.css';

export const Confrontos = () => {
  const [confrontosOrganizados, setConfrontosOrganizados] = useState([]);

  useEffect(() => {
    axios
      .get("https://shark-app-6myi8.ondigitalocean.app/api/calendarios?populate=*")
      .then((response) => {
        const { data } = response.data;
        const confrontosFuturos = data.filter((confronto) => moment(confronto.attributes.data).isAfter(moment()));
        confrontosFuturos.sort((a, b) => moment(a.attributes.data).diff(moment(b.attributes.data)));
        setConfrontosOrganizados(confrontosFuturos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {confrontosOrganizados.slice(0, 6).map((confronto, index) => {
        return (
          <div key={index} className='container_calendario'>
            <div className='container_confronto'>
              <h2>{confronto?.attributes?.categoria}</h2>
              <div className='confronto'>
                <img src={confronto?.attributes.time2.data[0].attributes.url} loading="lazy" alt="Time 2" />
                <h1>X</h1>
                <img src={confronto?.attributes.time1.data.attributes.url} loading="lazy" alt="Time 1" />
              </div>
              <h2>Local: {confronto?.attributes?.local}</h2>
              <p>Data: {moment(confronto?.attributes?.data).format("DD/MM/YYYY")}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
