import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import useContent from './useContent';
import { getContent } from '../services/api';

jest.mock('../services/api', () => ({ getContent: jest.fn() }));
function Probe({ endpoint }) {
  const state = useContent(endpoint);
  return <><p>{state.loading ? 'loading' : state.error ? 'error' : state.data?.titulo}</p><button onClick={state.retry}>retry</button></>;
}
afterEach(() => jest.resetAllMocks());

test('exibe falha e recupera o conteúdo ao tentar novamente', async () => {
  getContent.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ data: { titulo: 'Recuperado' } });
  render(<Probe endpoint="/noticias/1" />);
  expect(await screen.findByText('error')).toBeInTheDocument();
  fireEvent.click(screen.getByText('retry'));
  expect(await screen.findByText('Recuperado')).toBeInTheDocument();
});

test('resposta atrasada de outra rota não substitui o conteúdo atual', async () => {
  let resolveOld;
  getContent.mockImplementationOnce(() => new Promise(resolve => { resolveOld = resolve; }))
    .mockResolvedValueOnce({ data: { titulo: 'Atual' } });
  const { rerender } = render(<Probe endpoint="/noticias/1" />);
  const oldSignal = getContent.mock.calls[0][1];
  rerender(<Probe endpoint="/noticias/2" />);
  expect(await screen.findByText('Atual')).toBeInTheDocument();
  await act(async () => { resolveOld({ data: { titulo: 'Antigo' } }); });
  expect(oldSignal.aborted).toBe(true);
  expect(screen.getByText('Atual')).toBeInTheDocument();
  expect(screen.queryByText('Antigo')).not.toBeInTheDocument();
});
