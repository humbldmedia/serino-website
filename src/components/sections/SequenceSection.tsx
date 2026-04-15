import { useScrollReveal } from '../../hooks/useScrollReveal'

const steps = [
  {
    number: '01',
    title: 'Diagnose First',
    body: 'Before strategy, we identify what is actually broken. Not what looks broken. What is broken.',
  },
  {
    number: '02',
    title: 'Name It Clearly',
    body: 'We put language to the real problem. When you can name it correctly, you change how you solve it.',
  },
  {
    number: '03',
    title: 'Hold the Direction',
    body: 'We stay in the room. We govern the decisions that follow so the clarity we build does not erode.',
  },
]

export default function SequenceSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="process-intro"
      className="py-28 md:py-36"
      style={{ backgroundColor: '#F4F0EA' }}
    >
      <div className="container-main" ref={ref}>
        <span className="section-label fade-up-visible" style={{ color: '#C2A878' }}>
          How We Work
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mt-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="fade-up-visible relative"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Ghost number */}
              <div
                className="font-display text-8xl font-normal leading-none mb-4 select-none"
                style={{ color: '#C2A878', opacity: 0.18 }}
              >
                {step.number}
              </div>
              <h3 className="font-heading text-2xl font-medium uppercase tracking-wide text-serino-black mb-4" style={{ marginTop: '-2rem' }}>
                {step.title}
              </h3>
              <p className="font-body text-lg text-serino-black/70 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
