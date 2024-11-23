import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import StudioPage from './pages/StudioPage'
import GalleryPage from './pages/GalleryPage'
import CreativeLoader from './components/CreativeLoader'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loader for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <CreativeLoader />
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Toaster position="bottom-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<StudioPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
