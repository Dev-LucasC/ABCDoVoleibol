import "./App.css";
import { Slider } from "./components/Inicio/slider";


import { ProximosJogos } from "./routes/Calendario/ProximosJogos";
import ContatoForm from "./components/Contato/Contato";

function App() {
  return (
    <>
      <div className="ajuste">
        <Slider />
        <div className="ajuste_container_app"> 
                    <h1>Proximos Jogos</h1>
                    <hr size="6" width="100%" align="left" color="black"></hr>
                </div>
       <ProximosJogos />
      </div>
      <div className="ajuste_container_app"> 
                    <h1>Contato e Localização</h1>
                    <hr size="6" width="100%" align="left" color="black"></hr>
                </div>
      <ContatoForm />
    </>
  );
}

export default App;
