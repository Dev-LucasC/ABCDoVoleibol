import React from 'react'
import { Container, Content } from './styles'
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
  FaMedal
} from 'react-icons/fa'

import {HiClipboardDocumentList} from 'react-icons/hi'

import SidebarItem from '../SidebarItem'

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaHome} Text="Inicio" />
        <SidebarItem Icon={FaNewspaper} Text="Noticias" />
        <Link to="/contas"> <SidebarItem Icon={FaFileInvoiceDollar} Text="Prestação de contas" /></Link>
        <SidebarItem Icon={FaMedal} Text="Equipes" />
        <SidebarItem Icon={FaRegCalendarAlt} Text="Calendario" />
      </Content>
    </Container>
  )
}

export default Sidebar