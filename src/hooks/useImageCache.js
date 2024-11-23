import { useState, useCallback } from 'react';

const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export const useImageCache = () => {
  const [loading, setLoading] = useState(false);

  const generateCacheKey = (prompt, settings) => {
    return JSON.stringify({ prompt, ...settings });
  };

  const clearOldCache = useCallback(() => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
      if (now - value.timestamp > CACHE_DURATION) {
        URL.revokeObjectURL(value.url);
        cache.delete(key);
      }
    }
  }, []);

  const getCachedImage = useCallback((key) => {
    clearOldCache();
    const cached = cache.get(key);
    if (cached) {
      return cached.url;
    }
    return null;
  }, [clearOldCache]);

  const cacheImage = useCallback((key, blob) => {
    clearOldCache();
    const url = URL.createObjectURL(blob);
    cache.set(key, {
      url,
      timestamp: Date.now(),
    });
    return url;
  }, [clearOldCache]);

  const generateImage = useCallback(async (prompt, settings, apiKey) => {
    setLoading(true);
    const cacheKey = generateCacheKey(prompt, settings);
    
    try {
      // Check cache first
      const cachedUrl = getCachedImage(cacheKey);
      if (cachedUrl) {
        return { url: cachedUrl, fromCache: true };
      }

      // Make API request if not cached
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: settings,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = cacheImage(cacheKey, blob);
      
      return { url, fromCache: false };
    } finally {
      setLoading(false);
    }
  }, [getCachedImage, cacheImage]);

  return {
    generateImage,
    loading,
    clearCache: clearOldCache,
  };
};
