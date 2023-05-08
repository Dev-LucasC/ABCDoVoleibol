import React from 'react'
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header'
import Teste from '../../components/NavHeader/NavHeader';
import DropDownEquipes from './Album';


const Equipes = () => {
    return (
        <>
            <Teste />
            <Header />
            <DropDownEquipes />
            <Footer />
        </>
    )
}

export default Equipes;