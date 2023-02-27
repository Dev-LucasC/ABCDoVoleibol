import React, { useState } from 'react'
import { Container } from './styles'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'

const Header = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSiderbar = () => setSidebar(!sidebar)

  return (
    <Container>

        <FaBars onClick={showSiderbar} />
        {sidebar && <Sidebar active={setSidebar} />}
       <main className='teste'> <br /> <br /> </main>
    </Container>
  )
}

export default Header