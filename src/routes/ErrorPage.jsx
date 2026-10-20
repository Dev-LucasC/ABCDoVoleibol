import React from 'react';
import { Link } from 'react-router-dom';
export default function ErrorPage() {
  return <section><h1>Página indisponível</h1><p>Não foi possível abrir esta página.</p><Link to="/">Voltar ao início</Link></section>;
}
