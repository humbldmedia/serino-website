import { useScrollReveal } from '../../hooks/useScrollReveal'

const services = [
  'Brand Diagnosis & Narrative Architecture',
  'Messaging Framework Development',
  'Creative Direction & Governance',
  'Founder Voice Positioning',
  'Content Strategy (oversight, not execution)',
  'Strategic Production Planning',
]

export default function WhatWeDoSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="services"
      className="py-28 md:py-36"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="container-main" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — narrative */}
          <div className="fade-up-visible">
            <span className="section-label">What We Do</span>
            <div className="font-body text-lg text-roma-cream/80 leading-relaxed space-y-6">
              <p>
                Most brand confusion is not a messaging problem. It is an interpretation problem.
              </p>
              <p>
                Before we prescribe anything, we diagnose. We identify what is actually broken,
                name it clearly, and build the strategy around that truth.
              </p>
              <p>
                Then we stay in the room. We govern the decisions that follow so the clarity
                we build together does not erode under pressure.
              </p>
            </div>
          </div>

          {/* Right — services list */}
          <div className="fade-up-visible" style={{ transitionDelay: '80ms' }}>
            <span className="section-label opacity-0 select-none">placeholder</span>
            <ul className="space-y-5">
              {services.map((service) => (
                <li key={service} className="flex items-start gap-4">
                  <img
                    src="/assets/logos/gold_quill.png"
                    alt=""
                    className="w-4 h-4 mt-1.5 flex-shrink-0 opacity-90"
                  />
                  <span className="font-body text-lg text-roma-cream/80">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pull quote */}
        <div className="mt-20 fade-up-visible" style={{ transitionDelay: '160ms' }}>
          <hr className="gold-rule mb-10" />
          <blockquote className="font-body italic text-xl md:text-2xl text-roma-cream/70 max-w-2xl">
            "We help you see the real issue. Then we help you solve it."
          </blockquote>
        </div>
      </div>
    </section>
  )
}
