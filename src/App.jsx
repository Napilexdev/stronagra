import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Stage from './pages/Stage.jsx'
import NotFound from './pages/NotFound.jsx'
import './pages/Stage.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/zadanie/:id" element={<Stage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
