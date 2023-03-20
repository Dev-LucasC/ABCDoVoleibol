import React from 'react'
import Footer from '../components/footer/Footer';
import Header from '../components/Header'
import Teste from '../components/NavHeader/NavHeader';
import PrestacaoPdf from './Contas/PrestacaoPdf';


export const Contas = () => {
    return (
        <>
            <Teste />
            <Header />
            <PrestacaoPdf />
            <Footer />
        </>
    )
}
