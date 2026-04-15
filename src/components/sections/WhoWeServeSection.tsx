import { useScrollReveal } from '../../hooks/useScrollReveal'

const fits = [
  "You know something is off, but you cannot name it.",
  "You want your brand to reflect what you actually believe.",
  "You are building for the long term and will not compromise on clarity.",
]

export default function WhoWeServeSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="who"
      className="py-28 md:py-36"
      style={{ backgroundColor: '#F4F0EA' }}
    >
      <div className="container-main" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label fade-up-visible">Who We Serve</span>

          <p className="font-body text-xl text-serino-black/70 mb-16 leading-relaxed fade-up-visible" style={{ transitionDelay: '80ms' }}>
            We work with founders and business owners across industries. Startups finding their footing.
            Family businesses navigating growth. Established companies rebuilding direction.
          </p>

          {/* Fit descriptors */}
          <div className="space-y-10 mb-16">
            {fits.map((item, i) => (
              <p
                key={i}
                className="font-display text-2xl md:text-3xl text-serino-black leading-snug fade-up-visible"
                style={{ transitionDelay: `${(i + 2) * 80}ms` }}
              >
                {item}
              </p>
            ))}
          </div>

          {/* Divider */}
          <hr className="gold-rule mb-12 fade-up-visible" style={{ transitionDelay: '560ms' }} />

          {/* Not a fit */}
          <p
            className="font-body italic text-base text-serino-black/50 max-w-xl mx-auto leading-relaxed fade-up-visible"
            style={{ transitionDelay: '640ms' }}
          >
            If you are looking for content volume, execution management, or quick-turn campaigns, we are probably not the right fit. We govern direction. We do not run departments.
          </p>
        </div>
      </div>
    </section>
  )
}
