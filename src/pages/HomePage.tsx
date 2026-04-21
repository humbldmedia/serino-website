import HeroSection from '../components/sections/HeroSection'
import SequenceSection from '../components/sections/SequenceSection'
import ProcessSection from '../components/sections/ProcessSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import AboutSection from '../components/sections/AboutSection'
import CTASection from '../components/sections/CTASection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SequenceSection />
      <ProcessSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
    </main>
  )
}
