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
          <span className="section-label fade-up-visible">Ready to Talk?</span>

          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl text-roma-cream mb-8 leading-tight fade-up-visible"
            style={{ transitionDelay: '80ms' }}
          >
            Let's find out<br />what's real.
          </h2>

          <p
            className="font-body text-xl text-roma-cream/60 mb-12 leading-relaxed fade-up-visible"
            style={{ transitionDelay: '160ms' }}
          >
            Tell us what you are working on. We respond personally to every inquiry.
          </p>

          <div className="fade-up-visible" style={{ transitionDelay: '240ms' }}>
            <a
              href="mailto:hello@serinoconsulting.com"
              className="inline-block font-heading text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200"
              style={{ backgroundColor: '#7a3825', color: '#F4F0EA' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#964830')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7a3825')}
            >
              Start the Conversation →
            </a>

            <p className="mt-6 font-body text-sm text-roma-cream/30">
              or email us at{' '}
              <a
                href="mailto:hello@serinoconsulting.com"
                className="text-roma-cream/50 hover:text-gold transition-colors underline underline-offset-2"
              >
                hello@serinoconsulting.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
