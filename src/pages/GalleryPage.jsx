import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiImage, FiDownload, FiHeart, FiShare2, FiSearch, FiLoader, FiX, FiExternalLink } from 'react-icons/fi';
import { useUnsplash } from '../hooks/useUnsplash';
import CreativeLoader from '../components/CreativeLoader';
import toast from 'react-hot-toast';

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  const handleDownload = () => {
    window.open(image.downloadUrl, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(image.url);
    toast.success('Image URL copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-w-5xl w-full bg-black/40 rounded-xl overflow-hidden border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <a
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/40 rounded-lg text-white/80 hover:text-white transition-colors"
          >
            <FiExternalLink className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 bg-black/40 rounded-lg text-white/80 hover:text-white transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-[4/3] md:aspect-[16/9]">
          <img
            src={image.url}
            alt={image.prompt}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6">
          <h3 className="font-heading text-xl font-medium text-white mb-2">
            {image.prompt}
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="font-heading text-sm text-white/60">
                Photo by {image.photographer} on Unsplash
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.success('Added to favorites!')}
                className="p-2 bg-white/5 rounded-lg text-white/80 hover:text-white transition-colors"
              >
                <FiHeart className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 bg-white/5 rounded-lg text-white/80 hover:text-white transition-colors"
              >
                <FiShare2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 bg-white/5 rounded-lg text-white/80 hover:text-white transition-colors"
              >
                <FiDownload className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ImageSkeleton = () => (
  <div className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm animate-pulse">
    <div className="aspect-square bg-white/10" />
  </div>
);

const GalleryCard = ({ image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-purple-900/20">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-heading text-sm text-white/90 line-clamp-2">{image.prompt}</p>
            <p className="font-heading text-xs text-white/60 mt-1">by {image.photographer}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      {/* Search Bar Container */}
      <div className="relative">
        {/* Background Blur Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 rounded-2xl blur-xl"></div>
        
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-stretch gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-2">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for amazing images..."
                className="w-full h-full bg-white/5 rounded-lg pl-12 pr-4 font-heading text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="px-6 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg font-heading text-white font-medium tracking-wide hover:opacity-90 transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center group disabled:opacity-70"
            >
              {loading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Searching</span>
                </>
              ) : (
                <>
                  <FiSearch className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const { images, loading, error, searchImages } = useUnsplash();
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight) {
      setPage(prev => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg blur-lg opacity-75"></div>
              <div className="relative w-14 h-14 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                <FiImage className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 text-transparent bg-clip-text tracking-wider translate-y-1">
              Dream Gallery
            </h1>
          </div>
          <p className="font-heading text-gray-300 text-lg max-w-2xl mx-auto font-light">
            Explore a collection of AI-generated masterpieces. Each image represents a unique journey from imagination to reality.
          </p>
        </motion.div>

        <SearchBar onSearch={searchImages} loading={loading} />

        {loading && <CreativeLoader message="Generating Magic" />}

        {error && (
          <div className="text-red-400 text-center mb-8">
            {error}
          </div>
        )}

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {images.map((image) => (
              <div key={image.id} onClick={() => setSelectedImage(image)}>
                <GalleryCard image={image} />
              </div>
            ))}
            {loading && Array(4).fill(0).map((_, i) => (
              <ImageSkeleton key={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {images.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mt-12 px-4"
          >
            <div className="max-w-2xl mx-auto">
              {/* Animated Illustration */}
              <motion.div 
                className="relative w-48 h-48 mx-auto mb-8"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-fuchsia-500/20 to-indigo-500/20 rounded-full blur-2xl" />
                <div className="relative flex items-center justify-center">
                  <FiSearch className="w-24 h-24 text-purple-400/50" />
                  <motion.div
                    className="absolute"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FiImage className="w-16 h-16 text-fuchsia-400/30" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 text-transparent bg-clip-text mb-4">
                  Discover Amazing Images
                </h2>
                <p className="text-gray-400 text-lg mb-6 font-heading">
                  Enter a search term above to explore our curated collection of stunning visuals.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500 font-heading">
                  <div className="flex items-center gap-2">
                    <FiSearch className="w-4 h-4" />
                    <span>Type anything</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiImage className="w-4 h-4" />
                    <span>Find inspiration</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <ImageModal
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryPage;
