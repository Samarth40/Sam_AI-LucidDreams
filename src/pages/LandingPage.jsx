import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiZap, FiImage, FiCpu, FiCode, FiFeather, FiStar, FiInfo } from 'react-icons/fi';
import { useFloating, autoUpdate, offset, flip, shift, arrow, useHover, useInteractions, FloatingArrow } from '@floating-ui/react';

const FloatingElement = ({ icon: Icon, delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0.8],
      scale: [0, 1, 0.9],
      y: [y, y - 20, y],
      x: [x, x + 10, x],
    }}
    transition={{
      delay,
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
    }}
    className="absolute text-purple-400/30"
  >
    <Icon className="w-8 h-8" />
  </motion.div>
);

const CreativeTooltip = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = React.useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(15),
      flip(),
      shift(),
      arrow({ element: arrowRef })
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl"
          >
            <div className="relative z-10">
              {typeof content === 'string' ? (
                <p className="text-sm text-white/90 whitespace-nowrap">{content}</p>
              ) : content}
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 animate-pulse" />
            <FloatingArrow ref={arrowRef} context={context} className="fill-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const LandingPage = () => {
  const floatingElements = [
    { icon: FiZap, delay: 0.5, x: '10%', y: '20%' },
    { icon: FiImage, delay: 1.0, x: '80%', y: '15%' },
    { icon: FiCpu, delay: 1.5, x: '15%', y: '70%' },
    { icon: FiCode, delay: 2.0, x: '75%', y: '75%' },
    { icon: FiFeather, delay: 2.5, x: '85%', y: '45%' },
    { icon: FiStar, delay: 3.0, x: '20%', y: '40%' },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Glossy Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Soft gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
        
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
        
        {/* Animated light beam */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />

        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-[1px]" />
      </motion.div>

      {/* Floating Elements */}
      {floatingElements.map((el, index) => (
        <FloatingElement key={index} {...el} />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <CreativeTooltip 
          content={
            <div className="flex flex-col items-center gap-2 p-1">
              <span className="font-semibold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
                AI-Powered Magic
              </span>
              <span className="text-xs text-white/70">Transform your ideas into stunning artworks</span>
            </div>
          }
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="relative w-24 h-24 mx-auto mb-8 cursor-help"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl blur-xl opacity-50" />
            <div className="relative bg-black border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <FiZap className="w-full h-full text-white" />
              </motion.div>
            </div>
          </motion.div>
        </CreativeTooltip>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-6xl font-display font-bold mb-6"
        >
          <CreativeTooltip content="Your Personal AI Art Studio">
            <span className="bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent cursor-help">
              Sam_AI
            </span>
          </CreativeTooltip>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 font-heading mb-12 max-w-2xl mx-auto"
        >
          Transform your imagination into stunning artwork with the power of AI
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <CreativeTooltip content="Click to start your creative journey">
            <Link
              to="/create"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-heading text-lg transition-all duration-300"
            >
              {/* Button Background with Gradient Border */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-purple-500/50 transition-colors duration-300" />
              
              {/* Gradient Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 blur-xl" />
              </div>

              {/* Button Content */}
              <div className="relative flex items-center gap-3">
                <FiZap className="w-5 h-5 text-purple-400 group-hover:text-fuchsia-400 transition-colors duration-300" />
                <span className="bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent font-semibold">
                  Start Creating
                </span>
                <motion.span
                  className="text-purple-400 group-hover:text-fuchsia-400 transition-colors duration-300"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  →
                </motion.span>
              </div>

              {/* Hover Animation Background */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </Link>
          </CreativeTooltip>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
