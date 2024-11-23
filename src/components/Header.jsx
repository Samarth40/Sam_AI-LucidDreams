import { motion } from 'framer-motion'
import { FaBrain, FaMagic } from 'react-icons/fa'

const Header = () => {
  return (
    <motion.header 
      className="text-center relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full filter blur-[100px] opacity-30 -z-10" />
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="inline-block mb-4"
      >
        <div className="flex items-center justify-center gap-4 text-4xl text-purple-500">
          <FaBrain className="animate-pulse" />
          <FaMagic className="animate-bounce" />
        </div>
      </motion.div>

      <motion.h1 
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        AI Image Generator
      </motion.h1>

      <motion.p 
        className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Transform your imagination into stunning visuals with the power of AI. 
        Just describe what you want to see, and watch the magic happen! ✨
      </motion.p>
    </motion.header>
  )
}

export default Header
