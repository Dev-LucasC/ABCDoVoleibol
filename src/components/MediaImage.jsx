import React, { useState } from 'react';
import { mediaUrl } from '../services/api';

export default function MediaImage({ media, alt, ...props }) {
  const src = mediaUrl(media);
  const [failed, setFailed] = useState('');
  if (!src || failed === src) return <span className="media-placeholder" role="img" aria-label={alt}>{alt || 'Imagem indisponível'}</span>;
  return <img {...props} src={src} alt={alt} loading="lazy" onError={() => setFailed(src)} />;
}
