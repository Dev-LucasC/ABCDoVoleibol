import React from 'react'
import Logo from './logo.png'
import './navheader.css'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'



const Teste = () => {
  return (
    <header>
      <div className="container-header">
        <img src={Logo} alt="" />
        <div className="header-sociais">
          <a href="https://www.facebook.com/abcdovoleibol?mibextid=ZbWKwL" target='_blank'><FaFacebookSquare /> </a>
          <a href="https://instagram.com/abcdovoleibol?igshid=ZDdkNTZiNTM=" target='_blank'><FaInstagram /> </a>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/"> Inicio </Link>
          </li>
          <li>
            <Link to="/contas">  Prestação de Contas</Link>
          </li>
          <li>
            <Link to="/noticias"> Noticias </Link>
          </li>
          <li>
            <Link to="/equipes"> Equipes</Link>
          </li>
          <li>
            <Link to="/calendario"> Calendario</Link>
          </li>
          <li>
            <Link to="/associacao"> A associação</Link>
          </li>
        </ul>
      </nav>

    </header>
  )
}

export default Teste