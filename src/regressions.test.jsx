import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import useContent from './hooks/useContent';
import { Calendario } from './routes/Calendario/Calendario';
import { ProximosJogos } from './routes/Calendario/ProximosJogos';
import Album from './routes/Equipes/Album';
import Jogo from './routes/Jogo ao Vivo/Jogo';
import NoticiaCompleta from './routes/NoticasCompletas/NoticiaCompleta';
import PrestacaoPdf from './components/Contas/PrestacaoPdf';
import ContatoForm from './components/Contato/Contato';

jest.mock('./hooks/useContent');
const result = (data = []) => ({ data, loading: false, error: false, retry: jest.fn(), meta: { pagination: { pageCount: 3 } } });
const show = component => render(<MemoryRouter>{component}</MemoryRouter>);
afterEach(() => { cleanup(); jest.resetAllMocks(); });

test('trocar categoria ou gênero volta à página 1 e envia ambos os filtros à API', () => {
  useContent.mockReturnValue(result());
  show(<Calendario />);
  fireEvent.click(screen.getByText('Próximo'));
  expect(new URLSearchParams(useContent.mock.calls.at(-1)[0].split('?')[1]).get('pagination[page]')).toBe('2');
  fireEvent.click(screen.getByText('SUB 17'));
  fireEvent.click(screen.getByText('Feminino'));
  const params = new URLSearchParams(useContent.mock.calls.at(-1)[0].split('?')[1]);
  expect(params.get('pagination[page]')).toBe('1');
  expect(params.get('filters[$and][0][categoria][$containsi]')).toBe('SUB 17');
  expect(params.get('filters[$and][1][categoria][$containsi]')).toBe('FEM');
});

test('agenda vazia não permite avançar', () => {
  useContent.mockReturnValue({ ...result(), meta: { pagination: { pageCount: 0 } } });
  show(<Calendario />);
  expect(screen.getByText('Próximo')).toBeDisabled();
  expect(screen.getByText('Anterior')).toBeDisabled();
});

test('próximos jogos são filtrados e ordenados na API, incluindo o dia atual', () => {
  useContent.mockReturnValue(result());
  show(<ProximosJogos />);
  const params = new URLSearchParams(useContent.mock.calls[0][0].split('?')[1]);
  const today = new Date();
  const date = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
  expect(params.get('filters[data][$gte]')).toBe(date);
  expect(params.get('sort')).toBe('data:asc');
  expect(params.get('pagination[pageSize]')).toBe('6');
});

test('álbum escolhe o ano mais recente quando o atual não tem fotos', () => {
  const year = new Date().getFullYear();
  useContent.mockReturnValue(result([year - 3, year - 1].map((Ano, id) => ({ id, attributes: { Ano, fotos: { data: [{ id, attributes: { url: '/foto-' + Ano + '.jpg' } }] } } }))));
  show(<Album />);
  expect(screen.getByRole('button', { name: String(year - 1) })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('foto-' + (year - 1)));
});

test('vídeo principal não se repete e avançar/voltar conserva os grupos', () => {
  useContent.mockReturnValue(result(Array.from({ length: 13 }, (_, id) => ({ id, attributes: { link: 'https://www.youtube.com/embed/video' + id } }))));
  show(<Jogo />);
  expect(screen.getByTitle('Transmissão mais recente')).toHaveAttribute('src', expect.stringContaining('video0'));
  expect(screen.queryByTitle('Jogo anterior 0')).not.toBeInTheDocument();
  expect(screen.getByLabelText('Vídeos anteriores')).toBeDisabled();
  fireEvent.click(screen.getByLabelText('Próximos vídeos'));
  expect(screen.getByTitle('Jogo anterior 6')).toBeInTheDocument();
  expect(screen.queryByTitle('Jogo anterior 5')).not.toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Vídeos anteriores'));
  expect(screen.getByTitle('Jogo anterior 1')).toBeInTheDocument();
  expect(screen.getByLabelText('Vídeos anteriores')).toBeDisabled();
  fireEvent.click(screen.getByLabelText('Próximos vídeos'));
  fireEvent.click(screen.getByLabelText('Próximos vídeos'));
  expect(screen.getAllByTitle(/Jogo anterior/)).toHaveLength(2);
  expect(screen.getByLabelText('Próximos vídeos')).toBeDisabled();
});

test('PDF ausente não quebra prestação de contas', () => {
  useContent.mockReturnValue(result([{ id: 1, attributes: { provedor: 'Associação', pdf: { data: null } } }]));
  show(<PrestacaoPdf />);
  expect(screen.getByText('Documento indisponível.')).toBeInTheDocument();
  expect(screen.queryByText('Download PDF')).not.toBeInTheDocument();
});

test('falha na notícia mostra erro e permite tentar novamente', () => {
  const retry = jest.fn();
  useContent.mockReturnValue({ ...result(), data: null, error: true, retry });
  show(<NoticiaCompleta />);
  expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
  fireEvent.click(screen.getAllByText('Tentar novamente')[0]);
  expect(retry).toHaveBeenCalledTimes(1);
});

test('formulário de seletiva preserva os dados e informa erro sem enviar mensagens reais', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false });
  show(<ContatoForm seletiva />);
  fireEvent.change(screen.getByLabelText('Nome do atleta:'), { target: { value: 'Atleta de teste' } });
  fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'teste@example.com' } });
  fireEvent.change(screen.getByLabelText('Telefone:'), { target: { value: '47999999999' } });
  fireEvent.change(screen.getByLabelText(/Informe a idade/), { target: { value: '17 anos' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Enviar' }).closest('form'));
  expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível enviar');
  expect(screen.getByLabelText('Nome do atleta:')).toHaveValue('Atleta de teste');
  expect(JSON.parse(global.fetch.mock.calls[0][1].body).assunto).toBe('Inscrição para seletiva');
});
