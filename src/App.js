


import './App.css';
import Header from './components/Header'
import Teste from './components/Tela teste/Teste';
import Galeria from './components/galeria/Galeria';
import { Slider } from './components/noticias/slider';

import Footer from './components/footer/Footer';


import { Outlet  } from 'react-router-dom';


function App() {
  return (
    <>
    


    <Teste />
    <Header />
    <Slider />
    <Outlet />
    <Galeria />
    <Footer />
    </>  
  );
}

export default App;
