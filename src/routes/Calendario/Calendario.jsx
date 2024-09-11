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
  const [paginaAtual, setPaginaAtual] = useState(1); // Inicia a partir da página 1
  const [totalPaginas, setTotalPaginas] = useState(1); // Total de páginas
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const ITEMS_POR_PAGINA = 10; // Defina quantos itens por página deseja exibir

  // Função para buscar os confrontos da API
  const fetchConfrontos = (pagina = 1, filtro = 'todos') => {
    setIsLoading(true);
    let filtroCategoria = filtro !== 'todos' ? `&filters[categoria][$contains]=${filtro}` : '';

    axios
      .get(`https://shark-app-6myi8.ondigitalocean.app/api/calendarios?populate=*&sort=data:desc&pagination[page]=${pagina}&pagination[pageSize]=${ITEMS_POR_PAGINA}${filtroCategoria}`)
      .then((response) => {
        const { data, meta } = response.data;
        setConfrontosOrganizados(data);
        setTotalPaginas(meta.pagination.pageCount); // Define o total de páginas a partir da resposta da API
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Carregar os confrontos quando o componente for montado ou quando a página/filtro mudar
  useEffect(() => {
    fetchConfrontos(paginaAtual, filtro);
  }, [paginaAtual, filtro]);

  // Função para mudar de página
  const mudarPagina = (incremento) => {
    const novaPagina = paginaAtual + incremento;

    if (novaPagina > 0 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
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
        {isLoading ? (
          <div className='calendario-loading-message'>
            <p>Carregando jogos...</p>
          </div>
        ) : (
          confrontosOrganizados.length === 0 ? (
            <div className='calendario-no-games-message'>
              <p>Não temos nenhum jogo agendado para os próximos dias.</p>
            </div>
          ) : (
            confrontosOrganizados.map((confronto, index) => {
              return (
                <div key={index} className='calendario-container_calendario'>
                  <div className='calendario-container_confronto'>
                    <div className='calendario-confronto'>
                      <h2>Categoria: {confronto?.attributes?.categoria}</h2>
                      <h3>Local: {confronto?.attributes?.local}</h3>
                      <p>Data: {moment(confronto?.attributes?.data).format("DD/MM/YYYY")}</p>

                      <div className='calendario-container'>
                        <img src={confronto?.attributes.time2.data[0].attributes.url} loading="lazy" alt="Time 2" />
                        <div className='calendario-placar'>
                          <h2>{confronto?.attributes?.placar2}</h2>
                          <h2>X</h2>
                          <h2>{confronto?.attributes?.placar}</h2>
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
          )
        )}
        <div className='btn-page'>
          <button onClick={() => mudarPagina(-1)} className='btn-after' disabled={paginaAtual === 1}>Anterior</button>
          <button onClick={() => mudarPagina(1)} className='btn-next' disabled={paginaAtual === totalPaginas}>Próximo</button>
        </div>
      </div>
      <Footer />
    </>
  );
};
