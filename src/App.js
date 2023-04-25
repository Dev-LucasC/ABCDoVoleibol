import "./App.css";
import Header from "./components/Header";
import Teste from "./components/NavHeader/NavHeader";
import { Slider } from "./components/Inicio/slider";

import Footer from "./components/footer/Footer";

import { Confrontos } from "./routes/Calendario/Confrontos";
import { Outlet } from "react-router-dom";

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
        <Confrontos />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
