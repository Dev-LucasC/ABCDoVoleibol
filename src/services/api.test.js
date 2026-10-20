import { api, getContent, mediaUrl, newestFirst } from './api';

afterEach(() => jest.restoreAllMocks());

test('carrega todas as páginas de uma coleção', async () => {
  const get = jest.spyOn(api, 'get')
    .mockResolvedValueOnce({ data: { data: [{ id: 1 }], meta: { pagination: { pageCount: 2 } } } })
    .mockResolvedValueOnce({ data: { data: [{ id: 2 }] } });
  const response = await getContent('/albums?populate=*', undefined, true);
  expect(response.data.map(item => item.id)).toEqual([1, 2]);
  expect(new URLSearchParams(get.mock.calls[1][0].split('?')[1]).get('pagination[page]')).toBe('2');
});

test('não aceita respostas inválidas como coleções vazias', async () => {
  jest.spyOn(api, 'get').mockResolvedValue({ data: { error: 'Falha' } });
  await expect(getContent('/noticias')).rejects.toThrow('Resposta inválida');
});

test('mídias ausentes e URLs relativas são tratadas', () => {
  expect(mediaUrl({ data: null })).toBe('');
  expect(mediaUrl({ data: [] })).toBe('');
  expect(mediaUrl({ data: [{ attributes: { url: '/uploads/arquivo.pdf' } }] })).toMatch(/^https:\/\/.*\/uploads\/arquivo.pdf$/);
  expect(mediaUrl({ data: { attributes: { url: 'javascript:alert(1)' } } })).toBe('');
});

test('ordena datas dentro de attributes', () => {
  const items = [{ id: 2, attributes: { createdAt: '2023-01-01' } }, { id: 1, attributes: { createdAt: '2025-01-01' } }];
  expect(items.sort(newestFirst)[0].id).toBe(1);
});
