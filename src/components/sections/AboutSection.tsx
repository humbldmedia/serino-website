import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function AboutSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="team"
      className="pt-28 md:pt-36 pb-12 md:pb-16"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="container-main" ref={ref}>

        {/* Header */}
        <div className="fade-up-visible mb-16 md:mb-20">
          <span className="section-label">Our Team</span>
          <h2 className="font-display text-4xl md:text-5xl text-roma-cream mb-8 leading-tight">
            The ride or die type.
          </h2>
          <div className="font-body text-lg text-roma-cream/70 leading-relaxed space-y-6 max-w-2xl">
            <p>
              Serino Consulting is your not-so-average team of strategists and storytellers. Having worked with founders and brands across industries from early-stage startups to established family businesses, <span style={{ color: '#C2A878' }}>what makes us different is our ability to discern, interpret, name, and govern</span> based on principles such as integrity, authenticity, humility, and compassion.
            </p>
            <p>
              We challenge you to make aligned decisions, helping you say no to what dilutes and yes to what deepens.
            </p>
          </div>
        </div>

        {/* Portraits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-2xl mx-auto">

          {/* Phil */}
          <div className="fade-up-visible max-w-xs mx-auto w-full">
            <div style={{ borderBottom: '1px solid rgba(194,168,120,0.2)', paddingBottom: '20px', marginBottom: '24px' }}>
              <p className="font-heading text-xs tracking-widest uppercase mb-1" style={{ color: '#C2A878' }}>
                Founder &amp; Brand Consultant
              </p>
              <h3 className="font-display text-2xl text-roma-cream mb-4">Phil Serino</h3>
              <p className="font-body text-roma-cream/60 text-sm leading-relaxed">
                Background in customer relations, brand architecture, and storytelling through creative writing, music and film.
              </p>
            </div>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '3/4', border: '1px solid rgba(194,168,120,0.3)' }}
            >
              <img
                src="/assets/pictures/phil.png"
                alt="Phil Serino — Founder & Brand Consultant"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)' }}
              />
            </div>
          </div>

          {/* Alexandria */}
          <div className="fade-up-visible max-w-xs mx-auto w-full" style={{ transitionDelay: '100ms' }}>
            <div style={{ borderBottom: '1px solid rgba(194,168,120,0.2)', paddingBottom: '20px', marginBottom: '24px' }}>
              <p className="font-heading text-xs tracking-widest uppercase mb-1" style={{ color: '#C2A878' }}>
                Business Consultant
              </p>
              <h3 className="font-display text-2xl text-roma-cream mb-4">Alexandria Russell</h3>
              <p className="font-body text-roma-cream/60 text-sm leading-relaxed">
                Background in project development, business architecture, building operations and management.
              </p>
            </div>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '3/4', border: '1px solid rgba(194,168,120,0.3)' }}
            >
              <img
                src="/assets/pictures/lexi.png"
                alt="Alexandria Russell — Business Consultant"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)' }}
              />
            </div>
          </div>

        </div>

        {/* CTA button */}
        <div className="flex justify-center mt-20">
          <a
            href="#contact"
            className="font-heading text-xs tracking-widest uppercase border px-8 py-4 transition-all duration-200"
            style={{ borderColor: '#C2A878', color: '#C2A878' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#C2A878'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#0D0D0D'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#C2A878'
            }}
          >
            I'm Ready ↓
          </a>
        </div>

      </div>
    </section>
  )
}
