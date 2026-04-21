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
      className="relative min-h-screen flex items-end grain-overlay"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      {/* Full-bleed background image */}
      <style>{`
        .hero-bg {
          background-image: url(/assets/pictures/hero-bg.png);
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        @media (max-width: 767px) {
          .hero-bg {
            background-size: cover;
            background-position: center center;
          }
        }
      `}</style>
      <div className="hero-bg absolute inset-0" />
      {/* Left gradient so text stays legible */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.2) 50%, rgba(13,13,13,0) 100%)' }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: 'linear-gradient(to top, rgba(13,13,13,1) 0%, transparent 100%)' }}
      />

      {/* Thin vertical gold line on far left */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-px"
        style={{ backgroundColor: '#C2A878', opacity: 0.6 }}
      />

      <div className="container-main relative z-10 pb-32 md:pb-40">
        <div className="max-w-2xl">
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
            Lead with inte<span style={{ color: '#DBBFA8' }}>grit</span>y.
          </h1>

          {/* Subheadline */}
          <p
            className="font-body italic text-xl text-roma-cream/60 mb-12 leading-relaxed max-w-lg"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '160ms',
            }}
          >
            Helping founders do business better.
          </p>

          {/* CTA */}
          <div className="flex justify-center">
          <a
            href="#process-intro"
            className="inline-block font-heading text-sm tracking-widest uppercase border border-gold text-gold px-8 py-4 hover:bg-gold hover:text-serino-black transition-all duration-200"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '240ms',
            }}
          >
            Do Business Better ↓
          </a>
          </div>
        </div>
      </div>
    </section>
  )
}
