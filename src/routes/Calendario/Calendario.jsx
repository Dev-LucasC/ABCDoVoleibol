import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHeader from '../../components/NavHeader/NavHeader';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import { Confrontos } from './Confrontos';
import './calendario.css'

export const Calendario = () => {

  return (
    <>

      <NavHeader />
      <Header />
      <div className='container'>
        <div>
          <h1> Próximos jogos </h1>
          <hr size="6" width="100%" align="left" color="black"></hr>
        </div>
      </div >
      <Confrontos />
      <Footer />

    </>

  );

};
