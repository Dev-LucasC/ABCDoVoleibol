import axios from 'axios';

export const API_URL = (process.env.REACT_APP_API_URL || 'https://shark-app-6myi8.ondigitalocean.app/api').replace(/\/$/, '');
const MEDIA_ORIGIN = new URL(API_URL).origin;

export const api = axios.create({ baseURL: API_URL, timeout: 15000 });

export async function getContent(endpoint, signal, allPages = false) {
  const params = new URLSearchParams(endpoint.split('?')[1] || '');
  const path = endpoint.split('?')[0];
  if (allPages) {
    params.set('pagination[page]', '1');
    params.set('pagination[pageSize]', '100');
  }
  const response = await api.get(`${path}?${params}`, { signal });
  const payload = response.data;
  if (!payload || !Object.prototype.hasOwnProperty.call(payload, 'data')) {
    throw new Error('Resposta inválida do servidor.');
  }
  const singleItem = /^\/[^/]+\/[^/]+$/.test(path);
  if (!singleItem && !Array.isArray(payload.data)) throw new Error('Coleção inválida.');
  if (singleItem && payload.data !== null && (typeof payload.data !== 'object' || Array.isArray(payload.data))) {
    throw new Error('Conteúdo inválido.');
  }
  if (!allPages) return payload;
  if (!Array.isArray(payload.data)) throw new Error('Coleção inválida.');
  const data = [...payload.data];
  const pages = payload.meta?.pagination?.pageCount || 1;
  for (let page = 2; page <= pages; page += 1) {
    params.set('pagination[page]', String(page));
    const next = await api.get(`${path}?${params}`, { signal });
    if (!Array.isArray(next.data?.data)) throw new Error('Coleção inválida.');
    data.push(...next.data.data);
  }
  return { ...payload, data };
}

export function mediaUrl(media) {
  const data = media?.data ?? media;
  const item = Array.isArray(data) ? data[0] : data;
  const url = item?.attributes?.url;
  if (!url) return '';
  try {
    const resolved = new URL(url, MEDIA_ORIGIN);
    return ['http:', 'https:'].includes(resolved.protocol) ? resolved.href : '';
  } catch {
    return '';
  }
}

export function newestFirst(a, b) {
  return (Date.parse(b?.attributes?.createdAt) || 0) - (Date.parse(a?.attributes?.createdAt) || 0) || Number(b.id) - Number(a.id);
}

export function albumYears(posts) {
  return Object.keys(posts).sort((a, b) => Number(b) - Number(a));
}
