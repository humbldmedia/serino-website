import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function PhilosophySection() {
  const ref = useScrollReveal()

  return (
    <section
      id="philosophy"
      className="py-28 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: '#F4F0EA' }}
    >
      {/* Faint quill watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/assets/logos/gold_quill.png"
          alt=""
          className="w-96 h-96 object-contain select-none"
          style={{ opacity: 0.04 }}
        />
      </div>

      <div className="container-main relative z-10" ref={ref}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="section-label fade-up-visible" style={{ color: '#C2A878' }}>
            How We Approach It
          </span>

          <blockquote
            className="font-display text-3xl md:text-4xl text-serino-black leading-tight mb-12 fade-up-visible"
            style={{ transitionDelay: '80ms' }}
          >
            "Interpretation before prescription.<br />
            Naming before solving."
          </blockquote>

          <div
            className="font-body text-lg text-serino-black/70 leading-relaxed space-y-6 text-left max-w-xl mx-auto fade-up-visible"
            style={{ transitionDelay: '160ms' }}
          >
            <p>
              We do not start with strategy. We start with diagnosis. Our job is to identify the real issue behind your brand confusion and name it plainly before we build anything.
            </p>
            <p>
              That interpretation is the skill. When you can name a problem correctly, you change how you solve it. You change what you say, what you build, and what you say no to.
            </p>
            <p>
              Once we have named it, we stay in the room. We govern the decisions that follow so the clarity we build together does not erode under pressure.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
