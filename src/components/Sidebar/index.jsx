import React from 'react';
import { Container, Content } from './styles';
import {
  FaTimes,
  FaHome,
  FaEnvelope,
  FaRegSun,
  FaUserAlt,
  FaIdCardAlt,
  FaRegFileAlt,
  FaRegCalendarAlt,
  FaChartBar,
  FaFilePdf,
  FaFileInvoiceDollar,
  FaNewspaper,
  FaMedal,
  FaRegPlayCircle
} from 'react-icons/fa';

import { HiClipboardDocumentList } from 'react-icons/hi';

import SidebarItem from '../SidebarItem';
import { Link } from 'react-router-dom';

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false);
  }

  return (
    <Container sidebar={active}>
      {/* Botão para fechar a barra lateral */}
      <FaTimes onClick={closeSidebar} />
      <Content>
        {/* Links para diferentes seções */}
        <Link to="/"> <SidebarItem Icon={FaHome} Text="Inicio" /></Link>
        <Link to="/noticias"> <SidebarItem Icon={FaNewspaper} Text="Noticias" /></Link>
        <Link to="/contas"> <SidebarItem Icon={FaFileInvoiceDollar} Text="Prestação de contas" /></Link>
        <Link to="/equipes"><SidebarItem Icon={FaMedal} Text="Equipes" /> </Link>
        <Link to="/calendario"><SidebarItem Icon={FaRegCalendarAlt} Text="Calendario" /></Link>
        <Link to="/associacao"><SidebarItem Icon={FaRegFileAlt} Text="A Associação" /></Link>
        <Link to="/jogoaovivo"><SidebarItem Icon={FaRegPlayCircle} Text="Jogo ao Vivo" /></Link>
      </Content>
    </Container>
  );
}

export default Sidebar;
