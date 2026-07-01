import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import ThankYouPage from './pages/ThankYouPage'
import AcquisitionPage from './pages/AcquisitionPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-serino-black">
        <Routes>
          {/* Main site — global nav + footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Standalone acquisition landing page — no global nav/footer */}
          <Route path="/acquisition" element={<AcquisitionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
