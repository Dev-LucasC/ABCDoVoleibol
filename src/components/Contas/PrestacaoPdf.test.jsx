import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import useContent from '../../hooks/useContent';
import PrestacaoPdf from './PrestacaoPdf';

jest.mock('../../hooks/useContent');
const record = (id, provedor, data, url = '/documento.pdf', extra = {}) => ({ id, attributes: { provedor, data, pdf: { data: { attributes: { url, ...extra } } } } });
const ready = data => useContent.mockReturnValue({ data, loading: false, error: false });

test('organiza todas as datas, busca sem acentos e restaura documentos ao limpar filtros', () => {
  ready([record(1, 'Convênio anterior', '2023-01-01'), record(2, 'Associação', '2025-04-10'), record(3, 'Sem data')]);
  render(<PrestacaoPdf />);
  expect(useContent).toHaveBeenCalledWith('/prestacaos?populate=*&sort=data:desc', true);
  expect(screen.getAllByRole('heading', { level: 2 }).map(node => node.textContent)).toEqual(['2025', '2023', 'Sem data informada']);
  expect(screen.getByText('Mais recente pela data cadastrada').parentElement).toHaveTextContent('Associação');
  expect(screen.getByText('10/04/2025')).toHaveAttribute('dateTime', '2025-04-10');
  fireEvent.change(screen.getByLabelText('Buscar por provedor ou data'), { target: { value: 'convenio' } });
  expect(screen.getAllByRole('link')).toHaveLength(1);
  fireEvent.change(screen.getByLabelText('Ano da data cadastrada'), { target: { value: '2025' } });
  expect(screen.getByText(/Nenhum documento encontrado/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Limpar filtros' }));
  expect(screen.getAllByRole('link')).toHaveLength(3);
});

test('mantém registros sem arquivo, recusa protocolos executáveis e tipos incompatíveis', () => {
  ready([record(1, 'Ausente', null, null), record(2, 'Inseguro', '2025-02-30', 'javascript:alert(1)'), record(3, 'Outro formato', '', '/arquivo.html', { mime: 'text/html' })]);
  render(<PrestacaoPdf />);
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
  expect(screen.getAllByText('Documento indisponível.')).toHaveLength(3);
  expect(screen.queryByText('Mais recente pela data cadastrada')).not.toBeInTheDocument();
});

test('links preservam fonte original e avisam sobre a nova aba', () => {
  ready([record(1, 'Associação', '2025-01-01', 'https://fonte.example/contas.pdf')]);
  render(<PrestacaoPdf />);
  const link = screen.getByRole('link', { name: /Visualizar PDF: Associação.*abre em outra aba/ });
  expect(link).toHaveAttribute('href', 'https://fonte.example/contas.pdf');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('distingue carregamento, erro com nova tentativa e coleção vazia', () => {
  useContent.mockReturnValue({ loading: true });
  const { rerender } = render(<PrestacaoPdf />);
  expect(screen.getByRole('status')).toHaveTextContent('Carregando');
  const retry = jest.fn();
  useContent.mockReturnValue({ error: true, retry });
  rerender(<PrestacaoPdf />);
  fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }));
  expect(retry).toHaveBeenCalledTimes(1);
  ready([]);
  rerender(<PrestacaoPdf />);
  expect(screen.getByText('Nenhum documento disponível no momento.')).toBeInTheDocument();
  expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
});
