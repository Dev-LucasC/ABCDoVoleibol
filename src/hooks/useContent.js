import { useEffect, useState } from 'react';
import { getContent } from '../services/api';

export default function useContent(endpoint, allPages = false) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ data: null, meta: null, loading: true, error: false });
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, meta: null, loading: true, error: false });
    getContent(endpoint, controller.signal, allPages)
      .then(({ data, meta }) => {
        if (!controller.signal.aborted) setState({ data, meta, loading: false, error: false });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ data: null, meta: null, loading: false, error: true });
      });
    return () => controller.abort();
  }, [endpoint, allPages, attempt]);
  return { ...state, retry: () => setAttempt(value => value + 1) };
}
