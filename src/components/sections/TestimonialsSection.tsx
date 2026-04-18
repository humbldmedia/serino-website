import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

// Default: faded dark grayscale. Hover: original colors (no filter).
const F   = () => `grayscale(1) brightness(0.35) opacity(0.55)`
const FN  = () => `grayscale(1) invert(1) brightness(0.35) opacity(0.55)`

const clientLogos: { src: string; alt: string; blurb: string; noInvert?: boolean }[] = [
  { src: '/logos/client-1.svg',  alt: 'Beloved Health',  blurb: 'Delivered brand strategy & content that elevated their social presence, engagement, and network' },
  { src: '/logos/client-7.png',  alt: 'Propago PDX',     blurb: 'Delivered branded content that elevated their social presence, engagement and network' },
  { src: '/logos/client-8.svg',  alt: 'The Haven PDX',   blurb: 'Directed a kickstarter campaign that reached their $30k goal within 30 days' },
  { src: '/logos/client-4.png',  alt: 'Bloom Agency',    blurb: 'Delivered branded content that elevated their social presence, engagement and network' },
  { src: '/logos/client-3.svg',  alt: 'DirectStay',      blurb: 'Delivered the essential startup package that accelerated their new business' },
  { src: '/logos/client-6.png',  alt: 'iModels NW',      blurb: 'Delivered branded content that elevated their social presence, engagement and network' },
  { src: '/logos/client-12.png', alt: 'PowerPay',        blurb: 'Delivered brand materials that activated their new business' },
  { src: '/logos/client-2.svg',  alt: 'Dolgo',           blurb: 'Delivered a branded explainer video for a successful investor pitch', noInvert: true },
]

const testimonials = [
  {
    quote: "you captured the essence and heart of what we're doing and i literally had chills. i could not have done it better myself. that's why i hired you ❤️ Its spectacular",
    attribution: "Jennefer Payne, CEA of DirectStay",
  },
  {
    quote: "Excellent job today Phil. Appreciate the purpose driven fire!",
    attribution: "Breck Rubin, Founder/CEO of DirectStay",
  },
  {
    quote: "Yes yes yesss PHIL I couldn't stop smiling !! Also I got a chance to see what was all going on backstage as well. I appreciate you and your commitment",
    attribution: "Abibat Durosimi, Founder/CEO of Bloom Agency",
  },
]

function LogoStrip() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div
      className="fade-up-visible mt-10 pt-8"
      style={{
        transitionDelay: '200ms',
        borderTop: '1px solid rgba(194,168,120,0.15)',
      }}
    >
      <div
        className="flex flex-wrap items-center justify-center"
        style={{ gap: '1rem 2.5rem' }}
      >
        {clientLogos.map((logo, i) => {
          const isActive = activeIdx === i
          return (
            <div
              key={logo.src}
              className="relative flex items-center justify-center"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              onTouchStart={() => setActiveIdx(i === activeIdx ? null : i)}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: '38px',
                  width: 'auto',
                  maxWidth: '140px',
                  objectFit: 'contain',
                  filter: isActive ? 'none' : (logo.noInvert ? FN() : F()),
                  mixBlendMode: isActive ? 'normal' : 'multiply',
                  transition: 'filter 300ms',
                }}
              />
              {/* Tooltip */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 12px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '200px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(194,168,120,0.35)',
                  padding: '12px 14px',
                  pointerEvents: 'none',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 200ms',
                  zIndex: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#C2A878',
                    marginBottom: '6px',
                  }}
                >
                  {logo.alt}
                </p>
                <p
                  style={{
                    fontFamily: 'EB Garamond, serif',
                    fontSize: '13px',
                    fontStyle: 'italic',
                    color: 'rgba(245,240,230,0.8)',
                    lineHeight: 1.5,
                  }}
                >
                  {logo.blurb}
                </p>
                {/* Arrow */}
                <div style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#1a1a1a',
                  borderRight: '1px solid rgba(194,168,120,0.35)',
                  borderBottom: '1px solid rgba(194,168,120,0.35)',
                }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="testimonials"
      className="py-28 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: '#F4F0EA' }}
    >
      <div className="container-main relative z-10" ref={ref}>
        <span className="section-label fade-up-visible" style={{ color: '#7C6122' }}>
          In Their Own Words
        </span>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="fade-up-visible relative"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Decorative quote mark */}
              <div
                className="font-display text-8xl leading-none mb-4 select-none"
                style={{ color: '#7C6122', opacity: 0.55, lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote
                className="font-display italic text-2xl md:text-3xl text-serino-black leading-snug mb-8"
                style={{ marginTop: '-1.5rem' }}
              >
                {t.quote}
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="h-px w-8 flex-shrink-0"
                  style={{ backgroundColor: '#7C6122' }}
                />
                <cite className="font-heading text-xs tracking-widest uppercase not-italic" style={{ color: '#7C6122' }}>
                  {t.attribution}
                </cite>
              </div>
            </div>
          ))}
        </div>

        {/* Client logo strip */}
        <LogoStrip />
      </div>
    </section>
  )
}
