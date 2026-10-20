import React, { useState } from 'react'
import { Container } from './styles'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'

const Header = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSiderbar = () => setSidebar(!sidebar)

  return (
    <Container>

        <FaBars role="button" tabIndex={0} aria-label="Abrir menu" aria-expanded={sidebar} aria-controls="sidebar-menu" onClick={showSiderbar} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showSiderbar(); } }} />
        {sidebar && <Sidebar active={setSidebar} />}
       <div className='teste' />
    </Container>
  )
}

export default Header
