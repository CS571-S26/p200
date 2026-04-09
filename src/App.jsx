import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './Pages/HomePage'
import DormsPage from './Pages/DormsPage'
import './App.css'

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dorms" element={<DormsPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
