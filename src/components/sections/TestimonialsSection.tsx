import { useScrollReveal } from '../../hooks/useScrollReveal'

// mix-blend-mode: screen on all logos makes black areas transparent against the dark site bg.
// Logos with white backgrounds: grayscale → invert (white→black) → screen → bg disappears.
// Logos with dark backgrounds (client-2): no invert needed, screen already removes black.
// Logos with colored backgrounds (client-3): no invert, screen softens the bg.
const F  = (op = 0.62) => `grayscale(1) invert(1) sepia(0.55) saturate(0.7) hue-rotate(5deg) brightness(0.95) opacity(${op})`
const FH = (op = 0.88) => `grayscale(1) invert(1) sepia(0.4)  saturate(0.9) hue-rotate(5deg) brightness(1.1)  opacity(${op})`
// No-invert variant: for logos already on dark bg or colored bg
const FN  = (op = 0.62) => `grayscale(1) sepia(0.55) saturate(0.7) hue-rotate(5deg) brightness(0.95) opacity(${op})`
const FNH = (op = 0.88) => `grayscale(1) sepia(0.4)  saturate(0.9) hue-rotate(5deg) brightness(1.1)  opacity(${op})`

const clientLogos: {
  src: string; alt: string
  filter?: string; filterHover?: string
  cover?: boolean  // use objectFit:cover to crop unwanted white letterbox bands
}[] = [
  { src: '/logos/client-1.svg',  alt: 'Client' },
  { src: '/logos/client-7.png',  alt: 'Propago PDX' },
  { src: '/logos/client-8.png',  alt: 'The Haven' },
  { src: '/logos/client-4.png',  alt: 'Bloom Agency' },
  // White-on-blue bg — no invert so white text stays white under screen blend
  { src: '/logos/client-3.png',  alt: 'DirectStay',  filter: FN(), filterHover: FNH() },
  { src: '/logos/client-5.png',  alt: 'iModels NW' },
  { src: '/logos/client-12.png', alt: 'Client' },
  // White-on-black bg — already dark bg, no invert; cover crops white letterbox bands
  { src: '/logos/client-2.png',  alt: 'Dolgo', filter: FN(), filterHover: FNH(), cover: true },
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
            style={{ gap: '2rem 3rem' }}
          >
            {clientLogos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: logo.cover ? '58px' : '120px',
                  width: logo.cover ? '200px' : 'auto',
                  maxWidth: '200px',
                  objectFit: logo.cover ? 'cover' : 'contain',
                  objectPosition: 'center',
                  filter: logo.filter ?? F(),
                  mixBlendMode: 'screen',
                  transition: 'filter 300ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = logo.filterHover ?? FH())}
                onMouseLeave={e => (e.currentTarget.style.filter = logo.filter ?? F())}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
