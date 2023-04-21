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
     <Confrontos />
      <Footer />
    </>
  );
  
};
