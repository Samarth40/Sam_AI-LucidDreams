import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiImage, FiDownload, FiRefreshCw } from 'react-icons/fi'

const ImageGenerator = ({ selectedStyle, setSelectedStyle, settings }) => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [progress, setProgress] = useState(0)

  const generateImage = async () => {
    if (!prompt) {
      setError('Please enter a prompt')
      return
    }

    setLoading(true)
    setError(null)
    setProgress(0)
    setGeneratedImage(null)

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 2, 95))
      }, 100)

      const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt + (selectedStyle ? ` ${selectedStyle}` : ''),
          negative_prompt: settings.negativePrompt,
          num_inference_steps: settings.steps,
          guidance_scale: settings.guidance,
          width: parseInt(settings.size.split('x')[0]),
          height: parseInt(settings.size.split('x')[1]),
          seed: settings.seed === -1 ? Math.floor(Math.random() * 1000000) : settings.seed
        }),
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      setGeneratedImage(imageUrl)
    } catch (err) {
      setError('Failed to generate image. Please try again.')
      console.error('Error generating image:', err)
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = `ai-generated-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const styleOptions = [
    { id: 'cinematic', label: 'Cinematic', style: 'cinematic, dramatic lighting, professional cinematography' },
    { id: 'anime', label: 'Anime', style: 'anime style, manga-inspired, cel shaded' },
    { id: 'digital-art', label: 'Digital Art', style: 'digital painting, concept art, highly detailed' },
    { id: 'photorealistic', label: 'Photorealistic', style: 'hyperrealistic, photographic, ultra detailed' },
    { id: 'oil-painting', label: 'Oil Painting', style: 'traditional oil painting, textured, artistic' },
    { id: 'fantasy', label: 'Fantasy', style: 'magical, ethereal, mystical atmosphere' },
  ]

  return (
    <div className="space-y-6">
      {/* Style Pills */}
      <motion.div 
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {styleOptions.map((style, index) => (
          <motion.button
            key={style.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedStyle(style.style)}
            className={`px-4 py-1.5 rounded-full text-sm font-heading transition-all duration-200 ${
              selectedStyle === style.style
                ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {style.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Prompt Input */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-heading text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
          />
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Generate Button */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={generateImage}
            disabled={loading}
            className={`flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg font-heading text-white shadow-lg transition-all duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FiRefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FiImage className="w-5 h-5" />
                Generate Image
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {generatedImage && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={downloadImage}
                className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiDownload className="w-5 h-5 text-white" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-1 bg-white/5 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Image */}
      <AnimatePresence mode="wait">
        {generatedImage && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative rounded-lg overflow-hidden bg-white/5 max-w-md mx-auto"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={generatedImage}
              alt="AI Generated"
              className="w-full h-auto relative z-10"
              initial={{ filter: "blur(10px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ImageGenerator
