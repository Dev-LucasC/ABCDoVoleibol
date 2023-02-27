import React from 'react'
import Logo from './logo.png'
import './teste.css'
import {FaLinkedin} from 'react-icons/fa'
import {FaFacebookSquare} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
const Teste = () => {
  return (
   <header>
    
    <div className="header-sociais">
        <a href="" color="#343746"><FaLinkedin /> </a>
        <a href="#"><FaFacebookSquare/> </a>
        <a href="#"><FaInstagram/> </a>
        
    </div>
    
    
    <img src={Logo} alt="" />
    <h1>''</h1>
   </header>
  )
}

export default Teste