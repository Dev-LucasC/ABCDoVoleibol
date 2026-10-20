import React from 'react';

export default function ContentStatus({ loading, error, retry, empty, children }) {
  if (loading) return <p role="status">Carregando...</p>;
  if (error) return <div role="alert"><p>Não foi possível carregar o conteúdo.</p><button type="button" onClick={retry}>Tentar novamente</button></div>;
  if (empty) return <p>{children || 'Nenhum conteúdo disponível.'}</p>;
  return null;
}
