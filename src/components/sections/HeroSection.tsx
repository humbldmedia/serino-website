import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center grain-overlay"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      {/* Thin vertical gold line on far left */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-px"
        style={{ backgroundColor: '#C2A878', opacity: 0.6 }}
      />

      <div className="container-main relative z-10 py-32 md:py-0">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span
            className="section-label"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '0ms',
            }}
          >
            Strategic Clarity for Founders
          </span>

          {/* Headline */}
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl text-roma-cream leading-tight mb-8"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '80ms',
            }}
          >
            Lead with integrity.
          </h1>

          {/* Subheadline */}
          <p
            className="font-body italic text-xl text-roma-cream/60 mb-12 leading-relaxed max-w-xl"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '160ms',
            }}
          >
            We name the real problem in your brand. Then we build the clarity to resolve it.
          </p>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-block font-heading text-sm tracking-widest uppercase border border-gold text-gold px-8 py-4 hover:bg-gold hover:text-serino-black transition-all duration-200"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '240ms',
            }}
          >
            Start the Conversation →
          </a>
        </div>
      </div>
    </section>
  )
}
