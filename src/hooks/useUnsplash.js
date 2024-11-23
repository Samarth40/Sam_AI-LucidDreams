import { useState } from 'react';

const UNSPLASH_ACCESS_KEY = '_INfFpxfzKQe-iWs9riWtwUDeQPtYCubxD38usAlkdY'; // Replace with your Unsplash API key

export const useUnsplash = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const searchImages = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      
      const formattedImages = data.results.map(img => ({
        id: img.id,
        url: img.urls.regular,
        prompt: img.description || img.alt_description || 'Beautiful image from Unsplash',
        style: img.tags?.[0]?.title || 'Photography',
        model: 'Unsplash',
        photographer: img.user.name,
        downloadUrl: img.links.download
      }));

      setImages(formattedImages);
    } catch (err) {
      setError(err.message);
      console.error('Unsplash API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    images,
    loading,
    error,
    searchImages
  };
};
