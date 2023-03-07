


import './App.css';
import Header from './components/Header'
import Teste from './components/Tela teste/Teste';
import Galeria from './components/galeria/Galeria';
import { Slider } from './components/noticias/slider';
import slides from './components/noticias/mock.json';
import Footer from './components/footer/Footer';



function App() {
  return (
    <>
    


    <Teste />
    <Header />
    <Slider slides={slides}/>
    <Galeria />
    <Footer />
    </>  
  );
}

export default App;
