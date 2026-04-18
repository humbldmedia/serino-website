import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const steps = [
  {
    number: '01',
    title: 'Remember Why You Started',
    body: 'Before strategy, we go back to the beginning. We help you remember why you started and strip away the roadblocks: the assumptions, the noise, the nonsense. The things you said yes to when you should have said no. We listen intently and use careful discernment.',
  },
  {
    number: '02',
    title: 'Name the Thing',
    body: 'When you can name it clearly, something shifts. The real problem gets real language. Attachments fall away. Roadblocks stop looking like walls and start looking like decisions. That clarity does more than just free up blockage. It inspires action, momentum, and reignites the fire that made you build this in the first place.',
  },
  {
    number: '03',
    title: 'Hold the Fire',
    body: 'Now you know where you are going, and why it matters. This is where story becomes strategy. We stay in the room, shape the direction, and make sure every decision that follows carries the same energy from that first moment of clarity.',
  },
]

export default function SequenceSection() {
  const ref = useScrollReveal()
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = quoteRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="process-intro"
      className="py-28 md:py-36"
      style={{ backgroundColor: '#F4F0EA' }}
    >
      <div className="container-main" ref={ref}>
        <span className="section-label fade-up-visible" style={{ color: '#7C6122' }}>
          Do Business Better
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
                style={{ color: '#7C6122', opacity: 0.18 }}
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

        {/* Closing pull quote */}
        <div
          ref={quoteRef}
          className="fade-up-visible mt-20 max-w-2xl mx-auto flex flex-col items-center text-center"
        >
          <p
            className="font-display italic text-xl md:text-2xl leading-relaxed mb-10"
            style={{ color: '#1A1A1A' }}
          >
            Every roadblock removed reignites a rebrand that reinforces the right reason and real result:
          </p>
          <a
            href="#process"
            className="inline-block font-heading text-sm tracking-widest uppercase border px-8 py-4 transition-all duration-200"
            style={{
              borderColor: '#7C6122',
              color: '#7C6122',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#C2A878'
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#C2A878'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#0D0D0D'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#7C6122'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#7C6122'
            }}
          >
            Render Restoration →
          </a>
        </div>
      </div>
    </section>
  )
}
