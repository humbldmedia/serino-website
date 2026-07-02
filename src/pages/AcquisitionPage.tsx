import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { HeroBackgroundVideo, ProofVideo } from '../components/acquisition/AcquisitionVideo'
import { heroVideo, proofVideos, verticalClips } from '../config/acquisitionVideos'

const CALENDLY = 'https://calendly.com/serinoconsulting/30min'

// ─── Shared CTA button ───────────────────────────────────────────────────────
function BookButton({ label = 'Book a 20-minute call' }: { label?: string }) {
  return (
    <a
      href={CALENDLY}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block font-heading text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200"
      style={{ backgroundColor: '#7a3825', color: '#F4F0EA' }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#964830')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7a3825')}
    >
      {label} →
    </a>
  )
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const reveal = (delay: string) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(24px)',
    transition:
      'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
    transitionDelay: delay,
  })

  return (
    <section className="relative min-h-screen flex flex-col grain-overlay" style={{ backgroundColor: '#0D0D0D' }}>
      {/* Background film / poster */}
      <HeroBackgroundVideo source={heroVideo} />

      {/* Legibility overlays */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(13,13,13,0.75) 0%, rgba(13,13,13,0.35) 55%, rgba(13,13,13,0.1) 100%)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: 'linear-gradient(to top, rgba(13,13,13,1) 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.7) 0%, transparent 100%)' }}
      />

      {/* Minimal brand mark (no nav links, per brief) — in normal flow at the top */}
      <div className="relative z-20 w-full">
        <div className="container-main flex items-center py-6">
          <img src="/assets/logos/white_copy.png" alt="Serino Consulting" style={{ height: 40, width: 'auto' }} />
        </div>
      </div>

      <div className="relative z-10 w-full mt-auto pt-16 pb-28 md:pb-36">
        <div className="container-main">
          <div className="max-w-3xl">
          <span className="section-label" style={{ ...reveal('40ms') }}>
            The Brand Acquisition System
          </span>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-roma-cream leading-[1.05] mb-6"
            style={{ ...reveal('120ms') }}
          >
            Attention is cheap.
            <br />
            Trust <span style={{ color: '#DBBFA8' }}>isn&rsquo;t</span>.
          </h1>

          <p
            className="font-body italic text-lg md:text-2xl text-roma-cream/70 mb-10 leading-relaxed max-w-xl"
            style={{ ...reveal('220ms') }}
          >
            The founders who show up on camera pull ahead of everyone still hiding behind a logo.
          </p>

          <div style={{ ...reveal('320ms') }}>
            <BookButton />
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 2: The Problem ──────────────────────────────────────────────────
function Problem() {
  const ref = useScrollReveal()
  return (
    <section className="py-28 md:py-40" style={{ backgroundColor: '#0D0D0D' }}>
      <div className="container-main" ref={ref}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="fade-up-visible font-display text-2xl md:text-3xl text-roma-cream/90 leading-snug">
            The market is saturated. AI is flooding every feed with generic content. Attention is
            cheap, but trust is harder to earn than ever.
          </p>
          <p
            className="fade-up-visible font-body text-xl text-roma-cream/60 leading-relaxed"
            style={{ transitionDelay: '120ms' }}
          >
            Most local service businesses are invisible online, not because they&rsquo;re bad at what
            they do, but because nobody&rsquo;s ever told their story properly. No film. No page built
            to convert. No system behind it.
          </p>
          <p
            className="fade-up-visible font-display italic text-3xl md:text-4xl leading-tight"
            style={{ transitionDelay: '240ms', color: '#C2A878' }}
          >
            That&rsquo;s what we build.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Section 3: The Offer ────────────────────────────────────────────────────
const phases = [
  {
    n: '01',
    name: 'Foundation',
    price: '$2,500–$3,500',
    body: 'Brand messaging framework + conversion landing page. Gets your story right and builds the page that turns visitors into calls.',
  },
  {
    n: '02',
    name: 'Production',
    price: '$6,000–$10,000',
    body: '1–2 shoot days: brand hero film + ad / short-form content. StoryBrand on film. You are the guide, your customer is the hero.',
  },
  {
    n: '03',
    name: 'Deployment Assets',
    price: '$3,000–$5,000',
    body: '30–60 short-form clips, 30 graphics / stills, organic + paid deployment brief. 90 days of content from one shoot.',
  },
]

function Offer() {
  const ref = useScrollReveal()
  return (
    <section className="py-28 md:py-36" style={{ backgroundColor: '#F4F0EA' }}>
      <div className="container-main" ref={ref}>
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-label fade-up-visible" style={{ color: '#7C6122' }}>
            The Offer
          </span>
          <h2 className="fade-up-visible font-display text-4xl md:text-5xl text-serino-black leading-tight">
            The Brand Acquisition System
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {phases.map((p, i) => (
            <div
              key={p.n}
              className="fade-up-visible flex flex-col p-8"
              style={{
                transitionDelay: `${i * 120}ms`,
                backgroundColor: '#FBF9F5',
                border: '1px solid rgba(124,97,34,0.18)',
              }}
            >
              <span className="font-display text-5xl leading-none" style={{ color: '#7C6122', opacity: 0.4 }}>
                {p.n}
              </span>
              <h3 className="mt-5 font-heading text-2xl tracking-wide uppercase text-serino-black md:min-h-[4rem]">
                Phase {p.n.replace('0', '')}: {p.name}
              </h3>
              <p className="mt-1 font-heading text-lg tracking-wide" style={{ color: '#7C6122' }}>
                {p.price}
              </p>
              <p className="mt-4 font-body text-lg text-serino-black/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Full system + note */}
        <div className="fade-up-visible mt-14 text-center" style={{ transitionDelay: '160ms' }}>
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-x-4 gap-y-1 px-8 py-5"
            style={{ border: '1px solid rgba(124,97,34,0.35)' }}
          >
            <span className="font-heading text-sm tracking-widest uppercase text-serino-black/60">
              Full System
            </span>
            <span className="font-display text-3xl md:text-4xl text-serino-black">$12,000–$20,000</span>
          </div>
          <p className="mt-8 font-body italic text-lg text-serino-black/60 max-w-xl mx-auto">
            Most clients start with Phase 1. The page we build becomes the sales tool for the rest.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Section 4: Proof ────────────────────────────────────────────────────────
const proof = [
  {
    name: 'DirectStay',
    filmTitle: 'The Future of Short-Term Rental',
    source: proofVideos.directStay,
    story:
      'Pre-engagement: an early-stage startup with no brand identity and no video presence. We built the brand bible, shot the hero film, and produced 30 pieces of content. Their marketing team used it to launch their full digital presence.',
    tags: 'Brand Strategy · Hero Film · 30-piece Content Package · $20,000',
    quote: {
      text: 'You captured the essence and heart of what we’re doing and I literally had chills. I could not have done it better myself.',
      who: 'Jennefer Payne, DirectStay',
    },
  },
  {
    name: 'Aladdin Heating & Cooling',
    filmTitle: 'The Heart Behind the Heat',
    source: proofVideos.aladdin,
    story:
      'An established Portland HVAC company. Two production days: brand film plus ad and skit content. Nine core videos now anchor their digital presence.',
    tags: 'Brand Film · Ad Content · 9 Core Videos',
    quote: null,
  },
]

// Strategy classification for the short-form strip (from the HUMBLD content taxonomy).
// Each clip is a different format engineered for a different job.
const verticalMeta = [
  {
    format: 'Skit',
    purpose: 'Awareness · Reach',
    strategy:
      'Character-driven and entertainment-first. The kind of skit people rewatch and tag a friend on, earning reach through story instead of a pitch.',
  },
  {
    format: 'Interview',
    purpose: 'Trust · Authority',
    strategy:
      'A candid two-person conversation that signals authority and depth, trust-building, and easy to clip into more content.',
  },
  {
    format: 'Trend Splice',
    purpose: 'Reach · Engagement',
    strategy:
      'Opens on a familiar breaking-news beat, then hard-cuts to brand: a pattern interrupt engineered for watch-through and shares.',
  },
]

function Proof() {
  const ref = useScrollReveal()
  return (
    <section className="py-28 md:py-36" style={{ backgroundColor: '#0D0D0D' }}>
      <hr className="gold-rule" />
      <div className="container-main pt-20" ref={ref}>
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-label fade-up-visible">The Proof</span>
          <h2 className="fade-up-visible font-display text-4xl md:text-5xl text-roma-cream leading-tight">
            The work speaks first.
          </h2>
        </div>

        <div className="mt-16 space-y-20">
          {proof.map((c, i) => (
            <div
              key={c.name}
              className="fade-up-visible grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Alternate video/text sides on desktop */}
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <ProofVideo source={c.source} label={c.filmTitle} subLabel="Brand Film" />
              </div>
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <h3 className="font-display text-3xl md:text-4xl text-roma-cream mb-5">{c.name}</h3>
                <p className="font-body text-lg text-roma-cream/70 leading-relaxed">{c.story}</p>
                {c.quote && (
                  <blockquote className="mt-6 font-display italic text-xl text-roma-cream/90 leading-snug border-l-2 pl-5" style={{ borderColor: '#C2A878' }}>
                    &ldquo;{c.quote.text}&rdquo;
                    <cite className="mt-3 block font-heading text-xs tracking-widest uppercase not-italic" style={{ color: '#C2A878' }}>
                      {c.quote.who}
                    </cite>
                  </blockquote>
                )}
                <p className="mt-6 font-heading text-xs tracking-widest uppercase" style={{ color: '#C2A878' }}>
                  {c.tags}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional short-form vertical strip: renders only once clips are added */}
        {verticalClips.length > 0 && (
          <div className="mt-24">
            <p className="section-label text-center">90 Days of Content, From One Shoot</p>
            <p className="text-center font-body italic text-lg text-roma-cream/50 max-w-xl mx-auto -mt-2">
              Three formats, three jobs: every setup cut into content engineered for a different result.
            </p>
            <div className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 max-w-4xl mx-auto">
              {verticalClips.slice(0, 3).map((clip, i) => {
                const meta = verticalMeta[i]
                return (
                  <div key={i} className="snap-center shrink-0 w-[66%] sm:w-[42%] md:w-auto">
                    <ProofVideo source={clip} aspect="9 / 16" subLabel={meta?.format} />
                    {meta && (
                      <div className="mt-4 text-center">
                        <p className="font-heading text-[10px] tracking-[0.22em] uppercase" style={{ color: '#C2A878' }}>
                          {meta.purpose}
                        </p>
                        <p className="mt-2 font-body text-xs md:text-[13px] text-roma-cream/55 leading-snug">
                          {meta.strategy}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Section 5: CTA Footer ───────────────────────────────────────────────────
function CTAFooter() {
  const ref = useScrollReveal()
  return (
    <section className="py-28 md:py-36" style={{ backgroundColor: '#F4F0EA' }}>
      <div className="container-main" ref={ref}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="fade-up-visible font-display text-4xl md:text-5xl lg:text-6xl text-serino-black leading-tight mb-8">
            Ready to own your category?
          </h2>
          <p
            className="fade-up-visible font-body text-xl text-serino-black/60 leading-relaxed mb-12"
            style={{ transitionDelay: '80ms' }}
          >
            Start with a 20-minute call. We&rsquo;ll look at your current digital presence, identify the
            gaps, and show you exactly what the system looks like for your business.
          </p>
          <div className="fade-up-visible" style={{ transitionDelay: '200ms' }}>
            <BookButton label="Book a call" />
          </div>

          {/* Signatures */}
          <div
            className="fade-up-visible mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14"
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center gap-4">
              <img
                src="/assets/pictures/phil-avatar.jpg"
                alt="Philip Serino"
                className="rounded-full object-cover"
                style={{ width: 56, height: 56, filter: 'grayscale(0.2)' }}
              />
              <p className="text-left font-heading text-sm tracking-widest uppercase text-serino-black/70 leading-snug">
                Philip Serino
                <span className="block text-serino-black/45">Founder &amp; CEO</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/pictures/lexi-avatar.jpg"
                alt="Alexandria Russell"
                className="rounded-full object-cover"
                style={{ width: 56, height: 56, filter: 'grayscale(0.2)' }}
              />
              <p className="text-left font-heading text-sm tracking-widest uppercase text-serino-black/70 leading-snug">
                Alexandria Russell
                <span className="block text-serino-black/45">Business Consultant</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AcquisitionPage() {
  return (
    <main>
      <Hero />
      <Problem />
      <Offer />
      <Proof />
      <CTAFooter />
    </main>
  )
}
