import { useEffect } from 'react';

const usePageTitle = (
  title = 'Alucard Shop',
  description = 'A fast and modern eCommerce shopping experience.'
) => {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    meta.content = description;
  }, [title, description]);
};

export default usePageTitle;