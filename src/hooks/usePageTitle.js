import { useEffect } from 'react';

const usePageTitle = (
  title = 'Alucard Shop',
  description = 'Modern online shopping experience.'
) => {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = description;
  }, [title, description]);
};

export default usePageTitle;