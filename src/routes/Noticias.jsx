import React from 'react'
import NavHeader from '../components/NavHeader/NavHeader';
import Header from '../components/Header'
import {PainelNoticias} from '../components/Noticias/PainelNoticias'
import Footer from '../components/footer/Footer';


export const Noticias = () => {
  return (
    <>
      <NavHeader />
      <Header />
      <PainelNoticias />
      <Footer />
    </>
  )
}
