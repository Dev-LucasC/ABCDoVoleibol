import "./App.css";
import Header from "./components/Header";
import Teste from "./components/NavHeader/NavHeader";
import { Slider } from "./components/Inicio/slider";

import Footer from "./components/footer/Footer";

import { ProximosJogos } from "./routes/Calendario/ProximosJogos";
import { Outlet } from "react-router-dom";
import ContatoForm from "./components/Contato/Contato";

function App() {
  return (
    <>
      <Teste />
      <Header />
      <div className="ajuste">
        <Slider />
        <div className="ajuste_container_app"> 
                    <h1>Proximos Jogos</h1>
                    <hr size="6" width="100%" align="left" color="black"></hr>
                </div>
       <ProximosJogos />
      </div>
      <Outlet />
      <div className="ajuste_container_app"> 
                    <h1>Contato e Localização</h1>
                    <hr size="6" width="100%" align="left" color="black"></hr>
                </div>
      <ContatoForm />
      <Footer />
    </>
  );
}

export default App;
