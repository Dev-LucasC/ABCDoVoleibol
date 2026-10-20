import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import SiteLayout from './components/SiteLayout';
import { Contas } from './routes/Contas';
import Erro from './routes/ErrorPage';
import { Noticias } from './routes/Noticias';
import { Calendario } from './routes/Calendario/Calendario';
import NoticiaCompleta from './routes/NoticasCompletas/NoticiaCompleta';
import Equipes from './routes/Equipes/Equipes';
import Associacao from './routes/Associacao/Associacao';
import Jogo from './routes/Jogo ao Vivo/Jogo';
import Associados from './routes/Associados/Associado';
import ContatoForm from './components/Contato/Contato';

const router = createBrowserRouter([{
  element: <SiteLayout />,
  errorElement: <Erro />,
  children: [
    { path: '/', element: <App /> },
    { path: '/contas', element: <Contas /> },
    { path: '/jogoaovivo', element: <Jogo /> },
    { path: '/associacao', element: <Associacao /> },
    { path: '/equipes', element: <Equipes /> },
    { path: '/noticias', element: <Noticias /> },
    { path: '/calendario', element: <Calendario /> },
    { path: '/noticias/:id', element: <NoticiaCompleta /> },
    { path: '/associados', element: <Associados /> },
    { path: '/seletiva', element: <ContatoForm seletiva /> },
    { path: '*', element: <Erro /> },
  ],
}]);
ReactDOM.render(<React.StrictMode><RouterProvider router={router} /></React.StrictMode>, document.getElementById('root'));
