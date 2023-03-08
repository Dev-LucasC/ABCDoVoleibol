import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Contas } from "./routes/Contas"
import  Erro  from "./routes/ErrorPage"
import { Noticias } from "./routes/Noticias"
import { Calendario } from "./routes/Calendario"

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
    path: "/noticias",
    element: <Noticias />
  },
  {
    path: "/calendario",
    element: <Calendario />
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




