import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageGenerator from '../components/ImageGenerator'
import CreativeLoader from '../components/CreativeLoader'
import logoPath from '/logo.svg'

const defaultSettings = {
  negativePrompt: "ugly, blurry, low quality, distorted",
  steps: 30,
  guidance: 7.5,
  size: "512x512",
  seed: -1
}

const StudioPage = () => {
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [settings] = useState(defaultSettings)
  const [isLoading, setIsLoading] = useState(false)

  // Magic particles effect
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 2 + 1
  }))

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-indigo-950 via-purple-900/10 to-black overflow-hidden">
      {/* Floating orbs background effect */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full opacity-30"
            animate={{
              x: ['0%', '100%', '0%'],
              y: ['0%', '100%', '0%'],
              scale: [particle.scale, particle.scale * 1.5, particle.scale],
            }}
            transition={{
              duration: particle.duration * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 relative"
        >
          {/* Logo Section */}
          <motion.div 
            className="mb-8 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-32 h-32 mx-auto">
              {/* Glowing background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-full blur-2xl"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Logo with hover effect */}
              <motion.div
                className="relative z-10 w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-fuchsia-600/10 rounded-full backdrop-blur-sm" />
                <img
                  src={logoPath}
                  alt="Sam_AI LucidDreams"
                  className="w-full h-full relative z-10"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 text-transparent bg-clip-text tracking-wider mb-4">
              Sam_AI LucidDreams
            </h1>
            <p className="font-heading text-gray-300 text-lg max-w-2xl mx-auto font-light">
              Transform your imagination into stunning artwork. Describe your vision, and watch as AI brings it to life with extraordinary detail.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(79, 70, 229, 0.4)",
                "0 0 0 10px rgba(79, 70, 229, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-fuchsia-500/5 rounded-2xl -m-2"
          />
          <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8">
            <div className="relative z-10">
              {isLoading && <CreativeLoader message="Creating Your Vision" />}
              <ImageGenerator 
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
                settings={settings}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default StudioPage
