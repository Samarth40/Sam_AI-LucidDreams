import React, { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCopy, FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ActionButton = memo(({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 bg-black/50 rounded-lg text-sm hover:bg-black/70 transition-colors duration-200"
  >
    {icon}
    <span>{text}</span>
  </button>
));

ActionButton.displayName = 'ActionButton';

const ImageCard = memo(({ img, index }) => {
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = img;
    link.download = `dream-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded successfully!');
  }, [img]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(img);
    toast.success('Image URL copied!');
  }, [img]);

  return (
    <div className="relative group rounded-2xl overflow-hidden">
      <img
        src={img}
        alt={`Generated ${index + 1}`}
        className="w-full h-auto rounded-2xl shadow-2xl shadow-indigo-500/10"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-end justify-center p-8">
        <div className="flex gap-4">
          <ActionButton icon={<FiDownload />} text="Download" onClick={handleDownload} />
          <ActionButton icon={<FiCopy />} text="Copy" onClick={handleCopy} />
          <ActionButton icon={<FiHeart />} text="Like" onClick={() => toast.success('Liked!')} />
        </div>
      </div>
    </div>
  );
});

ImageCard.displayName = 'ImageCard';

const ImageGallery = memo(({ images }) => {
  return (
    <AnimatePresence>
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {images.map((img, index) => (
            <ImageCard key={img + index} img={img} index={index} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
