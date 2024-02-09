import React from 'react';
import Logo from './logo.png';
import './navheader.css';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavHeader = () => {
  return (
    <header>
      <div className="container-header">
        {/* Logo */}
        <img src={Logo} alt="ABC do Voleibol" />
        <Link to="https://docs.google.com/forms/d/e/1FAIpQLSfykJpgvSQIYf_rs2HYyrEVDlIOQkH4g7zoVdJYjB7ATyM-ZA/viewform?usp=sf_link" className='btn-associado' target='_blank'>Inscrição 1°Copa COC</Link>
        {/* Ícones de redes sociais */}
        <div className="header-sociais">
          <a href="https://www.facebook.com/abcdovoleibol?mibextid=ZbWKwL" target='_blank' rel="noopener noreferrer"><FaFacebookSquare /></a>
          <a href="https://instagram.com/abcdovoleibol?igshid=ZDdkNTZiNTM=" target='_blank' rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
      {/* Navegação */}
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/contas">Prestação de Contas</Link>
          </li>
          <li>
            <Link to="/noticias">Noticias</Link>
          </li>
          <li>
            <Link to="/equipes">Equipes</Link>
          </li>
          <li>
            <Link to="/calendario">Calendario</Link>
          </li>
          <li>
            <Link to="/associacao">A associação</Link>
          </li>
          <li>
            <Link to="/jogoaovivo">Jogo ao Vivo</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavHeader;
