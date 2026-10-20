import React from 'react';
import { Container, Content } from './styles';
import { FaTimes, FaHome, FaRegFileAlt, FaRegCalendarAlt, FaFileInvoiceDollar, FaNewspaper, FaMedal, FaRegPlayCircle, FaUserAlt } from 'react-icons/fa';


import SidebarItem from '../SidebarItem';
import { Link } from 'react-router-dom';

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false);
  }

  return (
    <Container id="sidebar-menu" role="navigation" aria-label="Menu principal" onKeyDown={event => { if (event.key === 'Escape') closeSidebar(); }}>
      {/* Botão para fechar a barra lateral */}
      <FaTimes role="button" tabIndex={0} aria-label="Fechar menu" onClick={closeSidebar} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); closeSidebar(); } }} />
      <Content onClick={closeSidebar}>
        {/* Links para diferentes seções */}
        <Link to="/"> <SidebarItem Icon={FaHome} Text="Inicio" /></Link>
        <Link to="/noticias"> <SidebarItem Icon={FaNewspaper} Text="Noticias" /></Link>
        <Link to="/contas"> <SidebarItem Icon={FaFileInvoiceDollar} Text="Prestação de contas" /></Link>
        <Link to="/equipes"><SidebarItem Icon={FaMedal} Text="Equipes" /> </Link>
        <Link to="/calendario"><SidebarItem Icon={FaRegCalendarAlt} Text="Calendario" /></Link>
        <Link to="/associacao"><SidebarItem Icon={FaRegFileAlt} Text="A Associação" /></Link>
        <Link to="/jogoaovivo"><SidebarItem Icon={FaRegPlayCircle} Text="Jogo ao Vivo" /></Link>
        <Link to="/associados"><SidebarItem Icon={FaUserAlt} Text="Seja associado" /></Link>
        <Link to="/seletiva"><SidebarItem Icon={FaMedal} Text="Inscrição para seletiva" /></Link>
      </Content>
    </Container>
  );
}

export default Sidebar;
