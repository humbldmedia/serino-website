import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { HeroBackgroundVideo, ProofVideo } from '../components/acquisition/AcquisitionVideo'
import { heroVideo, proofVideos, verticalClips } from '../config/acquisitionVideos'

const BOOKING_URL = 'https://wellbooked.net/book/serinoconsulting/acquisition-call'

// ─── Shared CTA button ───────────────────────────────────────────────────────
function BookButton({ label = 'Book a quick call' }: { label?: string }) {
  return (
    <a
      href={BOOKING_URL}
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

/** Gold outline variant, matching the home page hero CTA. */
function BookButtonOutline({ label = 'Book a quick call' }: { label?: string }) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block font-heading text-sm tracking-widest uppercase border border-gold text-gold px-8 py-4 hover:bg-gold hover:text-serino-black transition-all duration-200"
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
          <img src="/assets/logos/black_w_quill.png" alt="Serino Consulting" className="h-12 w-auto" />
        </div>
      </div>

      <div className="relative z-10 w-full mt-auto pt-16 pb-16 md:pb-20">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
          <span className="section-label" style={{ ...reveal('40ms') }}>
            The Brand Acquisition System
          </span>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-roma-cream leading-[1.05] mb-6"
            style={{ ...reveal('120ms') }}
          >
            People purchase tr<span style={{ color: '#DBBFA8' }}>u</span>st.
          </h1>

          <p
            className="font-body italic text-xl text-roma-cream/70 mb-10 leading-relaxed max-w-xl mx-auto"
            style={{ ...reveal('220ms') }}
          >
            The founders on camera pull ahead of those hiding behind a logo.
          </p>

          <div className="flex justify-center" style={{ ...reveal('320ms') }}>
            <BookButtonOutline label="Book now" />
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
    <section className="pb-28 md:pb-40" style={{ backgroundColor: '#0D0D0D' }}>
      <hr className="gold-rule" />
      <div className="container-main pt-28 md:pt-40" ref={ref}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="fade-up-visible font-display text-2xl md:text-3xl text-roma-cream/90 leading-snug">
            The market is saturated.
            <br />
            AI is flooding every feed with generic content.
            <br />
            Attention is cheap, and trust is harder to earn than ever.
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

// ─── Section 2.5: The Bridge (ROI hook) ──────────────────────────────────────
function Bridge() {
  const ref = useScrollReveal()
  return (
    <section className="pb-24 md:pb-32" style={{ backgroundColor: '#F4F0EA' }}>
      <hr className="gold-rule" />
      <div className="container-main pt-24 md:pt-32" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label fade-up-visible" style={{ color: '#7C6122' }}>
            Unique Value Proposition
          </span>
          <h2 className="fade-up-visible font-display text-4xl md:text-6xl text-serino-black leading-[1.05]">
            90 days of content.
            <br />
            <span style={{ color: '#964830' }}>From one shoot.</span>
          </h2>
          <p
            className="fade-up-visible mt-8 font-body text-xl text-serino-black/60 leading-relaxed max-w-xl mx-auto"
            style={{ transitionDelay: '120ms' }}
          >
            One day of your time becomes three months of showing up everywhere your customers
            already are. That is the whole point of the system: film once, stay visible for a
            quarter.
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
    body: 'Brand messaging framework + conversion landing page. Gets your story right and builds the page that turns visitors into calls.',
  },
  {
    n: '02',
    name: 'Production',
    body: '1–2 shoot days: brand hero film + ad / short-form content. You are the guide, your customer is the hero.',
  },
  {
    n: '03',
    name: 'Deployment Assets',
    body: '30–60 short-form clips, 30 graphics / stills, organic + paid deployment brief. 90 days of content from one shoot.',
  },
]

function Offer() {
  const ref = useScrollReveal()
  return (
    <section className="pb-28 md:pb-36" style={{ backgroundColor: '#4d2718' }}>
      <hr className="gold-rule" />
      <div className="container-main pt-28 md:pt-36" ref={ref}>
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-label fade-up-visible" style={{ color: '#EAD9BB' }}>
            What You Get
          </span>
          <h2 className="fade-up-visible font-display text-4xl md:text-5xl text-roma-cream leading-tight">
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
                backgroundColor: 'rgba(244,240,234,0.06)',
                border: '2px solid #C2A878',
              }}
            >
              <span className="font-display text-5xl leading-none" style={{ color: '#EAD9BB', opacity: 0.45 }}>
                {p.n}
              </span>
              <h3 className="mt-5 font-heading text-2xl tracking-wide uppercase text-roma-cream md:min-h-[4rem]">
                Phase {p.n.replace('0', '')}: {p.name}
              </h3>
              <p className="mt-4 font-body text-lg text-roma-cream/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Phase-1 note */}
        <div className="fade-up-visible mt-14 text-center" style={{ transitionDelay: '160ms' }}>
          <p className="font-body italic text-lg text-roma-cream/60 max-w-xl mx-auto">
            Phase 1 is the most important place to start. You can have a stunning hero film and
            reels in every feed, but without the right brand funnel, that attention never converts.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Section 4: Proof ────────────────────────────────────────────────────────
const proof = [
  {
    name: 'Aladdin Heating & Cooling',
    filmTitle: 'The Heart Behind the Heat',
    source: proofVideos.aladdin,
    story:
      'An established Portland HVAC company with real craft but no presence online. Two production days: brand film plus ad and skit content. They launched their first Instagram off the back of it — and before spending a dollar on ads, the content pulled 4,000+ views, 1,500+ in reach, and their first followers.',
    tags: 'Brand Film · Ad Content · 4K+ Views · 1,500+ Reach — Pre-Ads',
    quote: null,
  },
  {
    name: 'DirectStay',
    filmTitle: 'The Future of Short-Term Rental',
    source: proofVideos.directStay,
    story:
      'Pre-engagement: an early-stage short-term-rental startup with no brand identity and no video presence. We built the brand bible, shot the hero film, and produced 30 pieces of content their team used to launch their entire digital presence. Since then: 30,000+ views across channels, 50,000+ in reach, and more than 100 new hosts onboarded, and growing.',
    tags: 'Brand Strategy · Hero Film · 30K+ Views · 50K+ Reach · 100+ New Hosts',
    quote: {
      text: 'You captured the essence and heart of what we’re doing and I literally had chills. I could not have done it better myself.',
      who: 'Jennefer Payne, DirectStay',
    },
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
    <section className="pb-28 md:pb-36" style={{ backgroundColor: '#0D0D0D' }}>
      <hr className="gold-rule" />
      <div className="container-main pt-20" ref={ref}>
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-label fade-up-visible">Case Studies</span>
          <h2 className="fade-up-visible font-display text-4xl md:text-5xl text-roma-cream leading-tight">
            Trust, earned on camera.
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
            <p className="section-label text-center">A Format for Every Job</p>
            <p className="text-center font-body italic text-lg text-roma-cream/50 max-w-xl mx-auto -mt-2">
              Every setup from one shoot, cut into content engineered for a different result.
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

// ─── Section 5: The Founder ──────────────────────────────────────────────────
function Founder() {
  const ref = useScrollReveal()
  return (
    <section className="pb-28 md:pb-36" style={{ backgroundColor: '#0D0D0D' }}>
      <hr className="gold-rule" />
      <div className="container-main pt-28 md:pt-36" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label fade-up-visible">Who You&rsquo;re Working With</span>
          <h2 className="fade-up-visible font-display text-3xl md:text-4xl text-roma-cream leading-tight">
            Meet Serino Consulting
          </h2>
          <p
            className="fade-up-visible mt-6 font-body text-lg text-roma-cream/65 leading-relaxed max-w-2xl mx-auto"
            style={{ transitionDelay: '80ms' }}
          >
            The people you meet on the first call are the people responsible for your results.
            Philip directs the creative. Alexandria runs the operation. We work closely with our
            in-house production team to execute under our direction so that nothing gets lost in
            translation between the person who heard your story and the person telling it.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14 max-w-2xl mx-auto">
          {[
            {
              img: 'phil.png',
              name: 'Philip Serino',
              role: 'Founder & CEO',
            },
            {
              img: 'lexi.png',
              name: 'Alexandria Russell',
              role: 'Lead Strategist & COO',
            },
          ].map((m, i) => (
            <div
              key={m.name}
              className="fade-up-visible text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <img
                src={`/assets/pictures/${m.img}`}
                alt={`${m.name}, ${m.role} at Serino Consulting`}
                className="w-full object-cover"
                style={{ aspectRatio: '4 / 5', filter: 'grayscale(0.15)' }}
              />
              <p className="mt-5 font-heading text-sm tracking-widest uppercase text-roma-cream">
                {m.name}
              </p>
              <p className="mt-1 font-heading text-xs tracking-widest uppercase" style={{ color: '#C2A878' }}>
                {m.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 6: CTA Footer ───────────────────────────────────────────────────
function CTAFooter() {
  const ref = useScrollReveal()
  return (
    <section className="pb-28 md:pb-36" style={{ backgroundColor: '#F4F0EA' }}>
      <hr className="gold-rule" />
      <div className="container-main pt-28 md:pt-36" ref={ref}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="fade-up-visible font-display text-4xl md:text-5xl lg:text-6xl text-serino-black leading-tight mb-8">
            Ready to own your category?
          </h2>
          <p
            className="fade-up-visible font-body text-xl text-serino-black/70 leading-relaxed mb-4"
            style={{ transitionDelay: '80ms' }}
          >
            If you&rsquo;re doing over $500K a year and you&rsquo;re still invisible online, this call
            is for you.
          </p>
          <p
            className="fade-up-visible font-body text-lg text-serino-black/55 leading-relaxed mb-12"
            style={{ transitionDelay: '140ms' }}
          >
            We&rsquo;ll look at your current presence, show you exactly what the system looks like for
            your business, and tell you straight whether we&rsquo;re the right fit.
          </p>
          <div className="fade-up-visible" style={{ transitionDelay: '220ms' }}>
            <BookButton label="Book your call" />
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
      <Bridge />
      <Proof />
      <Offer />
      <Founder />
      <CTAFooter />
    </main>
  )
}
