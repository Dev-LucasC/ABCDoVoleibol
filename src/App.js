import './App.css';
import Header from './components/Header'
import Teste from './components/Tela teste/Teste';
import Galeria from './components/galeria/Galeria';
import { Slider } from './components/noticias/slider';
import slides from './components/noticias/mock.json';


function App() {
  return (
    <>
    <Teste />
    <Header />
    <Slider slides={slides}/>
    <Galeria />
    </>
  );
}

export default App;
