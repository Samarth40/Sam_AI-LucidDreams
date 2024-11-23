import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiImage, FiCpu } from 'react-icons/fi';

const CreativeLoader = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md">
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderLeftColor: '#c084fc',
            borderRightColor: '#e879f9',
            width: '120px',
            height: '120px',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Middle pulsing circle */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-purple-500/20 rounded-full"
          style={{
            width: '120px',
            height: '120px',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Center content */}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center">
          {/* Floating icons */}
          <motion.div
            className="absolute"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FiZap className="w-6 h-6 text-purple-400 absolute -top-8 left-1/2 transform -translate-x-1/2" />
            <FiImage className="w-6 h-6 text-fuchsia-400 absolute top-8 -left-8" />
            <FiCpu className="w-6 h-6 text-indigo-400 absolute top-8 -right-8" />
          </motion.div>

          {/* Central AI text */}
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 text-transparent bg-clip-text"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            AI
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-max"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="font-heading text-gray-300 text-sm">
            {props.message || "Initializing Sam_AI"}
          </span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-1"
          >
            ...
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default CreativeLoader;
