import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const NODE_DESCRIPTIONS: Record<string, string> = {
  'client-needs':    'You bring us the challenge — a brand to build, content to create, or a creative problem to solve.',
  'serino':          'We become your strategic partner, translating business goals into a clear creative direction.',
  'brand-strategy':  'We define your positioning, voice, and visual identity system from the ground up.',
  'creative-dir':    'We shape the aesthetic and narrative direction across every deliverable.',
  'project-arch':    'We map every phase, stakeholder, and dependency before a single asset is made.',
  'production-plan': 'The master document aligning team, timeline, and creative vision before execution begins.',
  'decision':        'We determine who executes — in-house or specialized — based on your scope and budget.',
  'humbld':          'Our in-house production studio handles content creation, campaigns, and design execution.',
  'outside-team':    'We bring in vetted specialists when the scope demands deeper or niche expertise.',
  'oversees':        'We stay in the loop on every deliverable, ensuring quality, brand alignment, and your approval.',
  'deliverables':    'You receive polished, on-brand creative assets ready to launch.',
  'ongoing':         'We remain your strategic partner long after launch, adapting the strategy as you grow.',
}

export default function ProcessSection() {
  const containerRef = useScrollReveal() // handles .fade-up-visible children
  const svgWrapRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [showDeliverable, setShowDeliverable] = useState(false)
  const [modalView, setModalView] = useState<'deliverable' | 'why'>('deliverable')

  useEffect(() => {
    const el = svgWrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Node fade-up animation style
  const na = (delay: number): React.CSSProperties =>
    isVisible
      ? { animationName: 'processNodeIn', animationDuration: '500ms', animationTimingFunction: 'ease-out', animationDelay: `${delay}ms`, animationFillMode: 'both' }
      : { opacity: 0 }

  // Line draw-in animation style (requires pathLength="1" on the element)
  const la = (delay: number): React.CSSProperties =>
    isVisible
      ? { strokeDasharray: 1, strokeDashoffset: 1, animationName: 'processLineIn', animationDuration: '400ms', animationTimingFunction: 'ease-in-out', animationDelay: `${delay}ms`, animationFillMode: 'both' }
      : { strokeDasharray: 1, strokeDashoffset: 1 }

  // Hover helpers
  const hoverHandlers = (id: string) => ({
    onMouseEnter: () => setHoveredNode(id),
    onMouseLeave: () => setHoveredNode(null),
    style: { cursor: 'pointer' } as React.CSSProperties,
  })

  const rectFill = (id: string, base = 0) =>
    hoveredNode === id ? base + 0.12 : base

  const textFill = (id: string) =>
    hoveredNode === id ? '#E8D5B0' : '#F4F0EA'

  const goldFill = (id: string) =>
    hoveredNode === id ? '#D4BC90' : '#C2A878'

  return (
    <section
      id="process"
      className="py-28 md:py-36"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <style>{`
        @keyframes processNodeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes processLineIn {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="container-main" ref={containerRef}>
        <span className="section-label fade-up-visible">The Restoration Process</span>

        <div ref={svgWrapRef} className="max-w-3xl mx-auto mt-8 fade-up-visible" style={{ transitionDelay: '80ms' }}>
          <svg
            viewBox="0 0 600 820"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto overflow-visible"
            aria-label="Serino Consulting Process Flowchart"
          >
            {/* ── LINES ── */}

            {/* CLIENT NEEDS → SERINO */}
            <line x1="300" y1="60" x2="300" y2="110" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(150)} />

            {/* SERINO → Brand / Creative / Project */}
            <line x1="300" y1="170" x2="120" y2="230" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(350)} />
            <line x1="300" y1="170" x2="300" y2="230" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(380)} />
            <line x1="300" y1="170" x2="480" y2="230" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(410)} />

            {/* Brand / Creative / Project → STRATEGIC PRODUCTION */}
            <line x1="120" y1="280" x2="300" y2="340" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(570)} />
            <line x1="300" y1="280" x2="300" y2="340" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(590)} />
            <line x1="480" y1="280" x2="300" y2="340" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(610)} />

            {/* STRATEGIC PRODUCTION → DECISION */}
            <line x1="300" y1="412" x2="300" y2="450" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(780)} />

            {/* DECISION → HUMBLD / OUTSIDE */}
            <line x1="300" y1="490" x2="150" y2="550" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(960)} />
            <line x1="300" y1="490" x2="450" y2="550" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(985)} />

            {/* HUMBLD / OUTSIDE → SERINO OVERSEES */}
            <line x1="150" y1="590" x2="300" y2="650" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1150)} />
            <line x1="450" y1="590" x2="300" y2="650" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1170)} />

            {/* OVERSEES → DELIVERABLES */}
            <line x1="300" y1="710" x2="300" y2="750" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1350)} />

            {/* DELIVERABLES → ONGOING */}
            <line x1="300" y1="780" x2="300" y2="810" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1510)} />


            {/* ── NODES ── */}

            {/* NODE: CLIENT NEEDS */}
            <g {...hoverHandlers('client-needs')} style={{ ...hoverHandlers('client-needs').style, ...na(0) }}>
              <rect x="180" y="10" width="240" height="50" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('client-needs', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="30" textAnchor="middle" fill={textFill('client-needs')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>CLIENT</text>
              <text x="300" y="50" textAnchor="middle" fill={goldFill('client-needs')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>"We have a need"</text>
            </g>

            {/* Dot */}
            <circle cx="300" cy="110" r="3" fill="#C2A878" style={na(150)} />

            {/* NODE: SERINO CONSULTING */}
            <g {...hoverHandlers('serino')} style={{ ...hoverHandlers('serino').style, ...na(200) }}>
              <rect x="190" y="110" width="220" height="60" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity={rectFill('serino', 0.08)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="134" textAnchor="middle" fill={goldFill('serino')} fontSize="13" fontFamily="Cormorant Garamond, serif" letterSpacing="2" fontWeight="500" style={{ transition: 'fill 200ms' }}>SERINO CONSULTING</text>
              <text x="300" y="154" textAnchor="middle" fill={textFill('serino')} fontSize="11" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>"This is what you need"</text>
            </g>

            {/* NODE: BRAND STRATEGY */}
            <g {...hoverHandlers('brand-strategy')} style={{ ...hoverHandlers('brand-strategy').style, ...na(440) }}>
              <polygon points="148,233 172,257 148,281 92,281 68,257 92,233" fill="#C2A878" fillOpacity={rectFill('brand-strategy', 0)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="120" y="254" textAnchor="middle" fill={textFill('brand-strategy')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>BRAND</text>
              <text x="120" y="268" textAnchor="middle" fill={textFill('brand-strategy')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>STRATEGY</text>
            </g>

            {/* NODE: CREATIVE DIRECTION */}
            <g {...hoverHandlers('creative-dir')} style={{ ...hoverHandlers('creative-dir').style, ...na(470) }}>
              <polygon points="328,233 352,257 328,281 272,281 248,257 272,233" fill="#C2A878" fillOpacity={rectFill('creative-dir', 0)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="254" textAnchor="middle" fill={textFill('creative-dir')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>CREATIVE</text>
              <text x="300" y="268" textAnchor="middle" fill={textFill('creative-dir')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>DIRECTION</text>
            </g>

            {/* NODE: PROJECT ARCHITECTURE */}
            <g {...hoverHandlers('project-arch')} style={{ ...hoverHandlers('project-arch').style, ...na(500) }}>
              <polygon points="515,233 542,257 515,281 445,281 418,257 445,233" fill="#C2A878" fillOpacity={rectFill('project-arch', 0)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="480" y="254" textAnchor="middle" fill={textFill('project-arch')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>PROJECT</text>
              <text x="480" y="268" textAnchor="middle" fill={textFill('project-arch')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>ARCHITECTURE</text>
            </g>

            {/* Dot */}
            <circle cx="300" cy="340" r="3" fill="#C2A878" style={na(640)} />

            {/* NODE: STRATEGIC PRODUCTION PLAN */}
            <g {...hoverHandlers('production-plan')} style={{ ...hoverHandlers('production-plan').style, ...na(660) }}>
              <rect x="150" y="340" width="300" height="72" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('production-plan', 0.06)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="363" textAnchor="middle" fill={goldFill('production-plan')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>DELIVERABLE ITEM #1</text>
              <text x="300" y="381" textAnchor="middle" fill={textFill('production-plan')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Brand Foundation Plan</text>
              <text
                x="300" y="396" textAnchor="middle"
                fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5"
                fill="#C2A878"
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={(e) => { e.stopPropagation(); setShowDeliverable(true) }}
              >Learn more</text>
            </g>

            {/* Dot */}
            <circle cx="300" cy="450" r="3" fill="#C2A878" style={na(800)} />

            {/* NODE: DECISION */}
            <g {...hoverHandlers('decision')} style={{ ...hoverHandlers('decision').style, ...na(820) }}>
              <rect x="210" y="450" width="180" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('decision', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="468" textAnchor="middle" fill={textFill('decision')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>DECISION</text>
              <text x="300" y="482" textAnchor="middle" fill="rgba(244,240,234,0.55)" fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic">Who executes?</text>
            </g>

            {/* NODE: HUMBLD MEDIA */}
            <g {...hoverHandlers('humbld')} style={{ ...hoverHandlers('humbld').style, ...na(1010) }}>
              <rect x="60" y="550" width="160" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('humbld', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="140" y="567" textAnchor="middle" fill={textFill('humbld')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>HUMBLD MEDIA</text>
              <text x="140" y="581" textAnchor="middle" fill={goldFill('humbld')} fontSize="9" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>(In-House)</text>
            </g>

            {/* NODE: OUTSIDE TEAM */}
            <g {...hoverHandlers('outside-team')} style={{ ...hoverHandlers('outside-team').style, ...na(1040) }}>
              <rect x="380" y="550" width="160" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('outside-team', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="460" y="567" textAnchor="middle" fill={textFill('outside-team')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>OUTSIDE TEAM</text>
              <text x="460" y="581" textAnchor="middle" fill={goldFill('outside-team')} fontSize="9" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>(Specialized)</text>
            </g>

            {/* Dot */}
            <circle cx="300" cy="650" r="3" fill="#C2A878" style={na(1200)} />

            {/* NODE: SERINO OVERSEES */}
            <g {...hoverHandlers('oversees')} style={{ ...hoverHandlers('oversees').style, ...na(1220) }}>
              <rect x="150" y="650" width="300" height="60" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity={rectFill('oversees', 0.08)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="673" textAnchor="middle" fill={goldFill('oversees')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>SERINO CONSULTING OVERSEES</text>
              <text x="300" y="691" textAnchor="middle" fill={textFill('oversees')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Quality, Brand Alignment, Approvals</text>
            </g>

            {/* Dot */}
            <circle cx="300" cy="750" r="3" fill="#C2A878" style={na(1380)} />

            {/* NODE: DELIVERABLES */}
            <g {...hoverHandlers('deliverables')} style={{ ...hoverHandlers('deliverables').style, ...na(1400) }}>
              <rect x="210" y="750" width="180" height="30" rx="0" fill="#C2A878" fillOpacity={rectFill('deliverables', 0)} stroke="none" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="769" textAnchor="middle" fill={textFill('deliverables')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>DELIVERABLES</text>
            </g>

            {/* NODE: ONGOING */}
            <g {...hoverHandlers('ongoing')} style={{ ...hoverHandlers('ongoing').style, ...na(1560) }}>
              <rect x="100" y="806" width="400" height="24" rx="0" fill="#C2A878" fillOpacity={rectFill('ongoing', 0)} stroke="none" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="822" textAnchor="middle" fill={goldFill('ongoing')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>ONGOING GOVERNANCE &amp; GROWTH</text>
            </g>

          </svg>

          {/* Hover description */}
          <div
            style={{
              minHeight: '2.5rem',
              marginTop: '1.25rem',
              textAlign: 'center',
              transition: 'opacity 250ms',
              opacity: hoveredNode ? 1 : 0,
            }}
          >
            <p
              style={{
                color: '#C2A878',
                fontFamily: 'EB Garamond, serif',
                fontStyle: 'italic',
                fontSize: '1rem',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {hoveredNode ? NODE_DESCRIPTIONS[hoveredNode] : '\u00A0'}
            </p>
          </div>
        </div>
      </div>

      {/* Deliverable #1 Modal */}
      {showDeliverable && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(4px)' }}
          onClick={() => { setShowDeliverable(false); setModalView('deliverable') }}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: '#111', border: '1px solid rgba(194,168,120,0.3)', padding: '2.5rem' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => { setShowDeliverable(false); setModalView('deliverable') }}
              className="absolute top-4 right-5 font-heading text-xs tracking-widest uppercase"
              style={{ color: '#C2A878' }}
            >
              Close ✕
            </button>

            {/* Shared header */}
            <p className="font-heading text-xs tracking-widest uppercase mb-1" style={{ color: '#C2A878' }}>Deliverable Item #1</p>
            <h2 className="font-display text-3xl text-roma-cream mb-1">Brand Foundation Plan</h2>
            <p className="font-heading text-xs tracking-widest uppercase mb-6" style={{ color: 'rgba(194,168,120,0.6)' }}>$20,000 – $25,000+&nbsp;&nbsp;·&nbsp;&nbsp;4–6 Weeks</p>

            {/* Slide indicator */}
            <div className="flex gap-2 mb-8">
              {(['deliverable', 'why'] as const).map(v => (
                <div
                  key={v}
                  style={{
                    height: '2px',
                    flex: 1,
                    backgroundColor: modalView === v ? '#C2A878' : 'rgba(194,168,120,0.2)',
                    transition: 'background-color 300ms',
                  }}
                />
              ))}
            </div>

            {/* SLIDE 1: Deliverable breakdown */}
            {modalView === 'deliverable' && (
              <div>
                <p className="font-body text-roma-cream/70 leading-relaxed mb-8">
                  Perfect for anyone serious about building a scalable brand with long-term vision. This is the transformation package: brand assets, marketing strategy, integration, and guided consulting all in one.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <p className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A878' }}>Brand Bible</p>
                    <ul className="space-y-2">
                      {[
                        'Brand Audit + Discovery Session',
                        'Mission, Vision & Values',
                        'Core Identity Messaging + UVP',
                        'Brand Voice & Tone Guide',
                        'StoryBrand Framework',
                        'Audience & Brand Narrative Arc',
                        'Logo Creation',
                        'Color Palette',
                        'Typography System',
                        'Moodboards',
                        'Social Media Templates',
                        'Social Media Messaging + Scripts',
                      ].map(item => (
                        <li key={item} className="flex items-start gap-3 font-body text-sm text-roma-cream/70">
                          <span style={{ color: '#C2A878', marginTop: '2px', flexShrink: 0 }}>—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A878' }}>Master Marketing Plan</p>
                      <ul className="space-y-2 mb-6">
                        {[
                          'Social Media Integration',
                          'Website Strategy + Integration',
                          'Marketing Strategy + Planning',
                          'Content Buckets + 30-Day Content Plan',
                          'Brand Video Shoot + Photoshoot',
                          'Consulting + Project Management (duration of project)',
                        ].map(item => (
                          <li key={item} className="flex items-start gap-3 font-body text-sm text-roma-cream/70">
                            <span style={{ color: '#C2A878', marginTop: '2px', flexShrink: 0 }}>—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => setModalView('why')}
                      className="font-heading text-xs tracking-widest uppercase border px-6 py-3 transition-all duration-200 self-start"
                      style={{ borderColor: '#C2A878', color: '#C2A878' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#C2A878'
                        e.currentTarget.style.color = '#0D0D0D'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = '#C2A878'
                      }}
                    >
                      Why This Matters →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2: Why This Matters */}
            {modalView === 'why' && (
              <div>
                <p className="font-heading text-xs tracking-widest uppercase mb-6" style={{ color: '#C2A878' }}>Why This Matters</p>

                <div className="space-y-4 leading-relaxed mb-10">
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    This is the essential item that most startups and businesses overlook. Not for any reason other than it's simply not talked about enough. You cannot build a house successfully without the foundation.
                  </p>
                  <p className="font-display italic text-center" style={{ color: 'rgba(194,168,120,0.85)', fontSize: '0.8rem' }}>
                    "Do your planning and prepare your fields before building your house." — Proverbs 24:27
                  </p>
                  <p className="font-display italic text-center" style={{ color: 'rgba(194,168,120,0.85)', fontSize: '0.8rem' }}>
                    "Write the vision and make it plain on tablets, that he may run who reads it." — Habakkuk 2:2
                  </p>
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    Without a clear identity, voice, and plan established from the start, teams pull in different directions, messaging becomes inconsistent, and the energy that launched the idea slowly turns into burnout and dysfunction. No, a brand logo is not all you need.
                  </p>
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    Why do 90% of startups fail within the first 2–5 years of operation? Because they do not hire Serino Consulting to establish their brand foundation and keep them on track.
                  </p>
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    Serino's Brand Foundation Plan exists to not only actualize the brand and make it official for growth, but to help preserve integrity and heart through every stage of growth. It's the difference between a brand that reacts and one that leads.
                  </p>
                </div>

                <button
                  onClick={() => setModalView('deliverable')}
                  className="font-heading text-xs tracking-widest uppercase"
                  style={{ color: '#C2A878', letterSpacing: '0.1em' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  ← Back to Deliverables
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
