import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom'
import PhotoListPage from './pages/PhotoListPage'
import PhotoDetailPage from './pages/PhotoDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/photos" className="text-lg font-semibold text-slate-800">Picsum Gallery</Link>
          <nav className="text-sm text-slate-600">
            <Link to="/photos" className="hover:text-slate-900">Home</Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/photos" element={<PhotoListPage />} />
        <Route path="/photo/:id" element={<PhotoDetailPage />} />
        <Route path="/" element={<Navigate to="/photos" replace />} />
        <Route path="*" element={<Navigate to="/photos" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
