import { useEffect } from 'react'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { SITE } from './config'
import Footer from './components/Footer'
import Header from './components/Header'
import { btnPrimary } from './components/ui'
import About from './pages/About'
import Agents from './pages/Agents'
import FindHostel from './pages/FindHostel'
import Home from './pages/Home'
import HostelDetailsPage from './pages/HostelDetailsPage'
import ListHostel from './pages/ListHostel'
import Privacy from './pages/Privacy'
import Register from './pages/Register'
import Safety from './pages/Safety'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-brand-900">Page not found</h1>
      <Link to="/" className={`${btnPrimary} mt-6`}>
        Go to the homepage
      </Link>
    </div>
  )
}

// HashRouter keeps every link working on any static host (GitHub Pages, Netlify, school server)
// without special server configuration.
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }} className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
        Skip to content
      </a>
      <Header />
      <p className="bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-950 sm:text-sm">
        {SITE.disclaimer}
      </p>
      <main id="main" tabIndex={-1} className="min-h-[60vh] outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hostels" element={<FindHostel />} />
          <Route path="/hostels/:id" element={<HostelDetailsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list-your-hostel" element={<ListHostel />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/about" element={<About />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
