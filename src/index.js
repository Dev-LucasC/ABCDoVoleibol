import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Contas } from "./routes/Contas"
import  Erro  from "./routes/ErrorPage"
import { Noticias } from "./routes/Noticias"
import { Calendario }  from "./routes/Calendario/Calendario"
import NoticiaCompleta from "./routes/NoticasCompletas/NoticiaCompleta";
import  Equipes  from "./routes/Equipes/Equipes"
import Associacao from "./routes/Associacao/Associacao"
import Jogo from "./routes/Jogo ao Vivo/Jogo"
import Associados from "./routes/Associados/Associado"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Erro />
    
  },
  {
    path: "/contas",
    element: <Contas />
  },
  {
    path: "/jogoaovivo",
    element: <Jogo />
  },
  {
    path: "/associacao",
    element: <Associacao />
  },
  {
    path: "/equipes",
    element: <Equipes />
  },
  {
    path: "/noticias",
    element: <Noticias />
  },
  {
    path: "/calendario",
    element: <Calendario />
  },
  {
    path: "/noticias/:id",
    element: <NoticiaCompleta />
  },
 
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




