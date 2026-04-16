import { useScrollReveal } from '../../hooks/useScrollReveal'

const clientLogos = [
  { src: '/logos/client-7.png',  alt: 'Propago PDX' },
  { src: '/logos/client-8.png',  alt: 'The Haven' },
  { src: '/logos/client-4.png',  alt: 'Bloom Agency' },
  { src: '/logos/client-3.png',  alt: 'DirectStay' },
  { src: '/logos/client-5.png',  alt: 'iModels NW' },
  { src: '/logos/client-12.png', alt: 'Client' },
  { src: '/logos/client-2.png',  alt: 'Client' },
]

const testimonials = [
  {
    quote: "They helped me identify the real issue at hand which allowed our company to go to the next level.",
    attribution: "Founder, Professional Services",
  },
]

export default function TestimonialsSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="testimonials"
      className="py-28 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      {/* Subtle gold top rule */}
      <hr className="gold-rule" />

      <div className="container-main relative z-10 pt-20" ref={ref}>
        <span className="section-label fade-up-visible" style={{ color: '#C2A878' }}>
          What Clients Say
        </span>

        <div className={`mt-12 ${testimonials.length === 1 ? 'max-w-3xl mx-auto' : 'grid grid-cols-1 md:grid-cols-' + Math.min(testimonials.length, 3) + ' gap-12'}`}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="fade-up-visible relative"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Decorative quote mark */}
              <div
                className="font-display text-8xl leading-none mb-4 select-none"
                style={{ color: '#C2A878', opacity: 0.25, lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote
                className="font-display italic text-2xl md:text-3xl text-roma-cream leading-snug mb-8"
                style={{ marginTop: '-1.5rem' }}
              >
                {t.quote}
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="h-px w-8 flex-shrink-0"
                  style={{ backgroundColor: '#C2A878' }}
                />
                <cite className="font-heading text-xs tracking-widest uppercase not-italic" style={{ color: '#C2A878' }}>
                  {t.attribution}
                </cite>
              </div>
            </div>
          ))}
        </div>

        {/* Client logo strip */}
        <div
          className="fade-up-visible mt-20 pt-12"
          style={{
            transitionDelay: '200ms',
            borderTop: '1px solid rgba(194,168,120,0.15)',
          }}
        >
          <div
            className="flex flex-wrap items-center justify-center"
            style={{ gap: '2.5rem 4rem' }}
          >
            {clientLogos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: '64px',
                  width: 'auto',
                  maxWidth: '180px',
                  objectFit: 'contain',
                  filter: 'grayscale(1) invert(1) opacity(0.38)',
                  transition: 'filter 300ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(1) invert(1) opacity(0.7)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1) invert(1) opacity(0.38)')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
