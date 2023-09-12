import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHeader from '../../components/NavHeader/NavHeader';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './calendario.css'

export const Calendario = () => {
  const [confrontosOrganizados, setConfrontosOrganizados] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [paginaAtual, setPaginaAtual] = useState(0); // Adicione esta linha

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

  const filtrarConfrontos = (filtro) => {
    if (filtro === 'todos') {
      return confrontosOrganizados;
    }
    return confrontosOrganizados.filter(confronto => confronto.attributes.categoria.includes(filtro));
  }

  // Adicione esta função
  const mudarPagina = (incremento) => {
    setPaginaAtual(paginaAtual + incremento);
  }

  return (
    <>
      <NavHeader />
      <Header />
      <div className='centralizador-botao'>
        <button className="calendario-button" onClick={() => setFiltro('FEM')}>Feminino</button>
        <button className="calendario-button" onClick={() => setFiltro('MASC')}>Masculino</button>
        <button className="calendario-button" onClick={() => setFiltro('todos')}>Todos</button>
      </div>
      <div className='calendario-container_posts'>
        {filtrarConfrontos(filtro).length === 0 ? (
          <div className='calendario-no-games-message'>
            <p>Não temos nenhum jogo agendado para os próximos dias.</p>
          </div>
        ) : (
          filtrarConfrontos(filtro).slice(paginaAtual * 10, paginaAtual * 10 + 10).map((confronto, index) => { // Modifique esta linha
            return (
              <div key={index} className='calendario-container_calendario'>
                <div className='calendario-container_confronto'>
                  <div className='calendario-confronto'>
                    <h2>Categoria: {confronto?.attributes?.categoria}</h2>
                    <h3>Local: {confronto?.attributes?.local}</h3>
                    <p>Data: {moment(confronto?.attributes?.data).format("DD/MM/YYYY")}</p>
                    {/* Adicione este div */}

                    <div className='calendario-container'>
                      <img src={confronto?.attributes.time2.data[0].attributes.url} loading="lazy" alt="Time 2" />
                      <div className='calendario-placar'>
                        <h2>{confronto?.attributes?.placar}</h2> {/* Adicione esta linha */}
                        <h2>X</h2>
                        <h2>{confronto?.attributes?.placar}</h2> {/* Adicione esta linha */}
                      </div>
                      <img src={confronto?.attributes.time1.data.attributes.url} loading="lazy" alt="Time 1" />
                    </div>
                    <div className='calendario_btn'>
                      <Link to={`/jogoaovivo`} className='calendario'>Ver Jogo</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        {/* Adicione estes botões */}
        <button onClick={() => mudarPagina(-1)}>Anterior</button>
        <button onClick={() => mudarPagina(1)}>Próximo</button>
      </div>
      <Footer />
    </>
  );
};
