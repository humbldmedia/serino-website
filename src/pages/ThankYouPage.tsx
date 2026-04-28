import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ThankYouPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center grain-overlay"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      {/* Full-bleed background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/pictures/thank-you.jpg)' }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.5) 60%, rgba(13,13,13,0.3) 100%)' }}
      />

      {/* Thin vertical gold line on far left */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-px"
        style={{ backgroundColor: '#C2A878', opacity: 0.6 }}
      />

      <div className="container-main relative z-10 text-center max-w-2xl mx-auto px-6">
        <p
          className="font-heading text-xs tracking-widest uppercase mb-6"
          style={{
            color: '#C2A878',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '80ms',
          }}
        >
          Message Received
        </p>

        <h1
          className="font-display text-4xl md:text-5xl lg:text-6xl text-roma-cream leading-tight mb-6"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '160ms',
          }}
        >
          We're glad you reached out.
        </h1>

        <p
          className="font-body text-lg text-roma-cream/70 leading-relaxed mb-12"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '240ms',
          }}
        >
          Expect a personal response within 48 hours. In the meantime, feel free to look around.
        </p>

        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '320ms',
          }}
        >
          <Link
            to="/"
            className="inline-block font-heading text-sm tracking-widest uppercase border border-gold text-gold px-8 py-4 hover:bg-gold hover:text-serino-black transition-all duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
