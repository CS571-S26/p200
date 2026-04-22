import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './Pages/HomePage'
import DormsPage from './Pages/DormsPage'
import DormDetailPage from './Pages/DormDetailPage'
import AboutPage from './Pages/AboutPage'
import './App.css'

function App() {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('rmd-reviews')
    return saved ? JSON.parse(saved) : []
  })

  const addReview = (review) => {
    setReviews((prev) => {
      const updated = [...prev, review]
      localStorage.setItem('rmd-reviews', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dorms" element={<DormsPage />} />
        <Route path="/dorms/:id" element={<DormDetailPage reviews={reviews} addReview={addReview} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App