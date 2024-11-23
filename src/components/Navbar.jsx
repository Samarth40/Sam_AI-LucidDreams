import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiZap, FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-2 bg-black/80 backdrop-blur-lg shadow-lg shadow-purple-500/5' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FiZap className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="font-display text-xl font-bold tracking-wider bg-gradient-to-r from-purple-400 to-fuchsia-400 text-transparent bg-clip-text">
              Sam_AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/gallery', label: 'Gallery' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-4 py-2 font-heading text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive(path)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                  {isActive(path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
            <Link
              to="/create"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative px-6 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg font-heading text-sm text-white font-medium tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                <FiZap className="w-4 h-4" />
                Start Creating
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-2 bg-white/10 rounded-lg transition-colors duration-200">
              {isOpen ? (
                <FiX className="w-6 h-6 text-white" />
              ) : (
                <FiMenu className="w-6 h-6 text-white" />
              )}
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10 mt-2"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              {[
                { path: '/', label: 'Home' },
                { path: '/gallery', label: 'Gallery' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`block px-4 py-2 font-heading text-base transition-colors duration-200 rounded-lg ${
                    isActive(path)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/create"
                className="block px-4 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg font-heading text-white text-center hover:opacity-90 transition-opacity duration-200"
                onClick={() => setIsOpen(false)}
              >
                Start Creating
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
