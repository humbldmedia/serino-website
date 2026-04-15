import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function AboutSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="about"
      className="py-28 md:py-36"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="container-main" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left — image placeholder */}
          <div className="fade-up-visible order-2 md:order-1">
            <div
              className="relative aspect-[4/5] w-full max-w-sm mx-auto md:mx-0"
              style={{ border: '1px solid #C2A878' }}
            >
              {/* Placeholder portrait — cinematic dark tones */}
              <div
                className="absolute inset-0 flex items-end justify-center"
                style={{
                  background: 'linear-gradient(160deg, #1a1510 0%, #0a0805 100%)',
                }}
              >
                {/* Vignette overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                  }}
                />
                <p className="relative z-10 font-heading text-xs tracking-widest uppercase text-gold/40 pb-6">
                  Founder Photo
                </p>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="fade-up-visible order-1 md:order-2" style={{ transitionDelay: '80ms' }}>
            <span className="section-label">The Team</span>

            <h2 className="font-display text-4xl md:text-5xl text-roma-cream mb-8 leading-tight">
              Built for depth,<br />
              not scale.
            </h2>

            <div className="font-body text-lg text-roma-cream/70 leading-relaxed space-y-6 mb-10">
              <p>
                Serino Consulting is a small team of strategists and storytellers. We have worked with founders across industries, from early-stage startups to established family businesses.
              </p>
              <p>
                The work is the same regardless of size: name what is true, identify what is broken, and build something worth building.
              </p>
            </div>

            <p className="font-body italic text-base text-roma-cream/50 leading-relaxed">
              Founded by Philip Serino, a creative entrepreneur with a background in video, music, and brand strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
