import { useEffect } from 'react';

export default function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <img src={src} alt={alt} className="lightbox-image" onClick={(e) => e.stopPropagation()} />
      <button type="button" className="lightbox-close" aria-label="Cerrar" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}
