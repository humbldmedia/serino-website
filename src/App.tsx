import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import SequenceSection from './components/sections/SequenceSection'
import ProcessSection from './components/sections/ProcessSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import AboutSection from './components/sections/AboutSection'
import CTASection from './components/sections/CTASection'

function App() {
  return (
    <div className="min-h-screen bg-serino-black">
      <Nav />
      <main>
        <HeroSection />
        <SequenceSection />
        <ProcessSection />
        <TestimonialsSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
