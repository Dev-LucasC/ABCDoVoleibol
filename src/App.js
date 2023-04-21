


import './App.css';
import Header from './components/Header'
import Teste from './components/NavHeader/NavHeader';
import { Slider } from './components/Inicio/slider';

import Footer from './components/footer/Footer';

import { Confrontos } from './routes/Calendario/Confrontos';
import { Outlet  } from 'react-router-dom';


function App() {
  return (
    <>
    


    <Teste />
    <Header />
    <Slider />
    <Outlet />
    <Footer />
    </>  
  );
}

export default App;
