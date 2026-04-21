import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function CTASection() {
  const ref = useScrollReveal()

  return (
    <section
      id="contact"
      className="py-28 md:py-36"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      {/* Gold rule above */}
      <hr className="gold-rule" />

      <div className="container-main" ref={ref}>
        <div className="max-w-2xl mx-auto text-center pt-20">
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl text-roma-cream mb-8 leading-tight fade-up-visible"
          >
            Let's connect!
          </h2>

          <p
            className="font-body text-xl text-roma-cream/60 mb-12 leading-relaxed fade-up-visible"
            style={{ transitionDelay: '80ms' }}
          >
            Book a call with us. We're excited to hear what you're working on.
          </p>

          <div className="fade-up-visible" style={{ transitionDelay: '240ms' }}>
            <a
              href="https://calendly.com/serinoconsulting/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-heading text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200"
              style={{ backgroundColor: '#7a3825', color: '#F4F0EA' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#964830')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7a3825')}
            >
              Book a Call →
            </a>

            <p className="mt-6 font-body text-sm text-roma-cream/30">
              Not ready to talk?{' '}
              <a
                href="/contact"
                className="text-roma-cream/50 hover:text-gold transition-colors underline underline-offset-2"
              >
                Send us a message
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
