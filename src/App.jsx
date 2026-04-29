import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './Pages/HomePage'
import DormsPage from './Pages/DormsPage'
import DormDetailPage from './Pages/DormDetailPage'
import FavoritesPage from './Pages/FavoritesPage'
import ComparePage from './Pages/ComparePage'
import MapPage from './Pages/MapPage'
import AboutPage from './Pages/AboutPage'
import MatchQuizPage from './Pages/MatchQuizPage'
import './App.css'

function App() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('rmd-reviews')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('rmd-favorites')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  const [compareList, setCompareList] = useState([])

  const addReview = (review) => {
    setReviews((prev) => {
      const updated = [...prev, review]
      localStorage.setItem('rmd-reviews', JSON.stringify(updated))
      return updated
    })
  }

  const toggleFavorite = (dormId) => {
    setFavorites((prev) => {
      const updated = prev.includes(dormId)
        ? prev.filter((id) => id !== dormId)
        : [...prev, dormId]
      localStorage.setItem('rmd-favorites', JSON.stringify(updated))
      return updated
    })
  }

  const toggleCompare = (dormId) => {
    setCompareList((prev) => {
      if (prev.includes(dormId)) return prev.filter((id) => id !== dormId)
      if (prev.length >= 2) return [prev[1], dormId]
      return [...prev, dormId]
    })
  }

  return (
    <HashRouter>
      <NavBar compareCount={compareList.length} favCount={favorites.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dorms" element={
          <DormsPage
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
            reviews={reviews}
          />}
        />
        <Route path="/dorms/:id" element={
          <DormDetailPage
            reviews={reviews}
            addReview={addReview}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
          />}
        />
        <Route path="/favorites" element={
          <FavoritesPage
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
            reviews={reviews}
          />}
        />
        <Route path="/match" element={<MatchQuizPage />} />
        <Route path="/compare" element={
          <ComparePage compareList={compareList} reviews={reviews} toggleCompare={toggleCompare} />}
        />
        <Route path="/map" element={<MapPage reviews={reviews} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App