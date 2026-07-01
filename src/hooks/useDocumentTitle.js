import { useEffect } from 'react';

// Sets the browser tab title per page for readability and basic SEO/sharing,
// restoring the previous title on unmount so navigating away doesn't leak it.
export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | Hunterpedia` : 'Hunterpedia';
    return () => {
      document.title = previous;
    };
  }, [title]);
}
