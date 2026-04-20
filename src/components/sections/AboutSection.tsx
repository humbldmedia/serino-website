import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function AboutSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="team"
      className="py-28 md:py-36"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="container-main" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left — image placeholder */}
          <div className="fade-up-visible order-2 md:order-1">
            <div
              className="relative aspect-[4/3] w-full max-w-lg mx-auto md:mx-0 overflow-hidden"
              style={{ border: '1px solid rgba(194,168,120,0.4)' }}
            >
              <img
                src="/assets/pictures/team-portrait.jpg"
                alt="Philip Serino — Founder"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Subtle vignette */}
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)' }}
              />
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
