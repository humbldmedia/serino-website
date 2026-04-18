import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const NODE_DESCRIPTIONS: Record<string, string> = {
  'client-needs':       'You bring us the challenge — a brand to build, content to create, or a creative problem to solve.',
  'serino':             'We become your strategic partner, translating business goals into a clear creative direction.',
  'production-plan':    'The foundational package that actualizes your brand and builds the infrastructure for everything that follows.',
  'brand-dev':          'We craft your complete brand bible with careful interpretation and precision.',
  'marketing-strategy': 'We map your exact marketing strategy fit for your specific industry.',
  'creative-dir':       'We think from a consumer standpoint and give direction throughout the whole process from development to execution.',
  'project-arch':       'We architect your exact plan for sustainable growth.',
  'deliverables':       'Your complete brand foundation package has been delivered — assets, strategy, and plan ready to activate.',
  'deliverable-2-shipped': 'The Serino Content Engine has been delivered — content systems, campaigns, and creative output ready to deploy.',
  'review-call':        'We walk through every deliverable together — this is the moment clarity meets conviction and the next phase begins.',
  'deliverable-2':      'Your ongoing retainer with Serino Consulting — strategic oversight, governance, and continuous growth management to keep your brand sharp and your execution aligned.',
  'humbld':             'Our in-house agency partner offers a seamless production ecosystem that handles content creation of all types and needs, planning and management, and design executions. We bring in vetted specialists when the scope demands deeper or niche expertise.',
  'outside-team':       'Every business is run differently. Sometimes companies have their own marketing manager and teams, and sometimes they don\'t. Our intent is to build good relations and team collaboration throughout the process of what\'s needed for your company to grow.',
  'oversees':           'We stay in the loop on every deliverable, ensuring quality, brand alignment, and your approval.',
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
        <span className="section-label fade-up-visible">The Process</span>

        <div ref={svgWrapRef} className="max-w-3xl mx-auto mt-8 fade-up-visible" style={{ transitionDelay: '80ms' }}>
          <svg
            viewBox="0 0 600 920"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto overflow-visible"
            aria-label="Serino Consulting Process Flowchart"
          >
            {/* ── LINES ── */}

            {/* CLIENT → SERINO */}
            <line x1="300" y1="60" x2="300" y2="110" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(150)} />

            {/* SERINO → DELIVERABLE #1 */}
            <line x1="300" y1="170" x2="300" y2="220" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(350)} />

            {/* DELIVERABLE #1 → fan dot */}
            <line x1="300" y1="292" x2="300" y2="310" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(560)} />

            {/* Fan → 4 hexagons */}
            <line x1="300" y1="310" x2="75"  y2="338" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(600)} />
            <line x1="300" y1="310" x2="225" y2="338" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(630)} />
            <line x1="300" y1="310" x2="375" y2="338" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(660)} />
            <line x1="300" y1="310" x2="525" y2="338" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(690)} />

            {/* 4 hexagons → converge dot */}
            <line x1="75"  y1="382" x2="300" y2="418" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(960)} />
            <line x1="225" y1="382" x2="300" y2="418" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(980)} />
            <line x1="375" y1="382" x2="300" y2="418" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1000)} />
            <line x1="525" y1="382" x2="300" y2="418" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1020)} />

            {/* converge dot → DELIVERABLES */}
            <line x1="300" y1="418" x2="300" y2="438" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1060)} />

            {/* PACKAGE DELIVERED → REVIEW CALL */}
            <line x1="300" y1="492" x2="300" y2="510" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1200)} />

            {/* REVIEW CALL → DELIVERABLE #2 */}
            <line x1="300" y1="582" x2="300" y2="602" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1360)} />

            {/* DELIVERABLE #2 → HUMBLD / OUTSIDE */}
            <line x1="300" y1="674" x2="140" y2="720" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1540)} />
            <line x1="300" y1="674" x2="460" y2="720" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1565)} />

            {/* HUMBLD / OUTSIDE → OVERSEES */}
            <line x1="140" y1="760" x2="300" y2="810" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1730)} />
            <line x1="460" y1="760" x2="300" y2="810" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1750)} />


            {/* ── DOTS ── */}
            <circle cx="300" cy="110" r="3" fill="#C2A878" style={na(150)} />
            <circle cx="300" cy="220" r="3" fill="#C2A878" style={na(370)} />
            <circle cx="300" cy="310" r="3" fill="#C2A878" style={na(580)} />
            <circle cx="300" cy="418" r="3" fill="#C2A878" style={na(1040)} />
            <circle cx="300" cy="510" r="3" fill="#C2A878" style={na(1220)} />
            <circle cx="300" cy="602" r="3" fill="#C2A878" style={na(1380)} />
            <circle cx="300" cy="810" r="3" fill="#C2A878" style={na(1770)} />

            {/* ── NODES ── */}

            {/* NODE: CLIENT */}
            <g {...hoverHandlers('client-needs')} style={{ ...hoverHandlers('client-needs').style, ...na(0) }}>
              <rect x="180" y="10" width="240" height="50" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('client-needs', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="30" textAnchor="middle" fill={textFill('client-needs')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>CLIENT</text>
              <text x="300" y="50" textAnchor="middle" fill={goldFill('client-needs')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>"We have a need"</text>
            </g>

            {/* NODE: SERINO CONSULTING */}
            <g {...hoverHandlers('serino')} style={{ ...hoverHandlers('serino').style, ...na(200) }}>
              <rect x="190" y="110" width="220" height="60" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity={rectFill('serino', 0.08)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="134" textAnchor="middle" fill={goldFill('serino')} fontSize="13" fontFamily="Cormorant Garamond, serif" letterSpacing="2" fontWeight="500" style={{ transition: 'fill 200ms' }}>SERINO CONSULTING</text>
              <text x="300" y="154" textAnchor="middle" fill={textFill('serino')} fontSize="11" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>"This is what you need"</text>
            </g>

            {/* NODE: DELIVERABLE ITEM #1 */}
            <g {...hoverHandlers('production-plan')} style={{ ...hoverHandlers('production-plan').style, ...na(400) }}>
              <rect x="150" y="220" width="300" height="72" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('production-plan', 0.06)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="243" textAnchor="middle" fill={goldFill('production-plan')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>DELIVERABLE ITEM #1</text>
              <text x="300" y="261" textAnchor="middle" fill={textFill('production-plan')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>The Serino Brand Foundation</text>
              <text
                x="300" y="276" textAnchor="middle"
                fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5"
                fill="#C2A878"
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={(e) => { e.stopPropagation(); setShowDeliverable(true) }}
              >Learn more</text>
            </g>

            {/* NODE: BRAND DEVELOPMENT */}
            <g {...hoverHandlers('brand-dev')} style={{ ...hoverHandlers('brand-dev').style, ...na(720) }}>
              <polygon points="102,338 127,360 102,382 48,382 23,360 48,338" fill="#C2A878" fillOpacity={rectFill('brand-dev', 0)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="75" y="357" textAnchor="middle" fill={textFill('brand-dev')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>BRAND</text>
              <text x="75" y="370" textAnchor="middle" fill={textFill('brand-dev')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>DEVELOPMENT</text>
            </g>

            {/* NODE: MARKETING STRATEGY */}
            <g {...hoverHandlers('marketing-strategy')} style={{ ...hoverHandlers('marketing-strategy').style, ...na(750) }}>
              <polygon points="252,338 277,360 252,382 198,382 173,360 198,338" fill="#C2A878" fillOpacity={rectFill('marketing-strategy', 0)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="225" y="357" textAnchor="middle" fill={textFill('marketing-strategy')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>MARKETING</text>
              <text x="225" y="370" textAnchor="middle" fill={textFill('marketing-strategy')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>STRATEGY</text>
            </g>

            {/* NODE: CREATIVE DIRECTION */}
            <g {...hoverHandlers('creative-dir')} style={{ ...hoverHandlers('creative-dir').style, ...na(780) }}>
              <polygon points="402,338 427,360 402,382 348,382 323,360 348,338" fill="#C2A878" fillOpacity={rectFill('creative-dir', 0)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="375" y="357" textAnchor="middle" fill={textFill('creative-dir')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>CREATIVE</text>
              <text x="375" y="370" textAnchor="middle" fill={textFill('creative-dir')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>DIRECTION</text>
            </g>

            {/* NODE: PROJECT ARCHITECTURE */}
            <g {...hoverHandlers('project-arch')} style={{ ...hoverHandlers('project-arch').style, ...na(810) }}>
              <polygon points="552,338 577,360 552,382 498,382 473,360 498,338" fill="#C2A878" fillOpacity={rectFill('project-arch', 0)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="525" y="357" textAnchor="middle" fill={textFill('project-arch')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>PROJECT</text>
              <text x="525" y="370" textAnchor="middle" fill={textFill('project-arch')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>ARCHITECTURE</text>
            </g>

            {/* NODE: DELIVERABLES */}
            <g {...hoverHandlers('deliverables')} style={{ ...hoverHandlers('deliverables').style, ...na(1080) }}>
              <rect x="150" y="438" width="300" height="54" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('deliverables', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="458" textAnchor="middle" fill={textFill('deliverables')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>DELIVERABLE ITEM #1 SHIPPED</text>
              <text x="300" y="476" textAnchor="middle" fill={goldFill('deliverables')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Assessment &amp; Review</text>
            </g>

            {/* NODE: REVIEW CALL */}
            <g {...hoverHandlers('review-call')} style={{ ...hoverHandlers('review-call').style, ...na(1240) }}>
              <rect x="160" y="510" width="280" height="72" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity={rectFill('review-call', 0.08)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="532" textAnchor="middle" fill={goldFill('review-call')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" fontWeight="500" style={{ transition: 'fill 200ms' }}>REVIEW CALL</text>
              <text x="300" y="550" textAnchor="middle" fill={textFill('review-call')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Client: "Wow!"</text>
              <text x="300" y="568" textAnchor="middle" fill={textFill('review-call')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Serino Consulting: "Yes! Now let's execute."</text>
            </g>

            {/* NODE: ONGOING GOVERNANCE & GROWTH */}
            <g {...hoverHandlers('deliverable-2')} style={{ ...hoverHandlers('deliverable-2').style, ...na(1400) }}>
              <rect x="150" y="602" width="300" height="72" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('deliverable-2', 0.06)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="625" textAnchor="middle" fill={goldFill('deliverable-2')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>ONGOING GOVERNANCE &amp; GROWTH</text>
              <text x="300" y="643" textAnchor="middle" fill={textFill('deliverable-2')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Retainer Package</text>
              <text x="300" y="658" textAnchor="middle" fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" fill="#C2A878" style={{ cursor: 'pointer', textDecoration: 'underline' }}>Learn more</text>
            </g>

            {/* NODE: HUMBLD MEDIA */}
            <g {...hoverHandlers('humbld')} style={{ ...hoverHandlers('humbld').style, ...na(1590) }}>
              <rect x="50" y="720" width="180" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('humbld', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="140" y="737" textAnchor="middle" fill={textFill('humbld')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>HUMBLD MEDIA</text>
              <text x="140" y="751" textAnchor="middle" fill={goldFill('humbld')} fontSize="9" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Our production agency partner</text>
            </g>

            {/* NODE: YOUR COMPANY */}
            <g {...hoverHandlers('outside-team')} style={{ ...hoverHandlers('outside-team').style, ...na(1615) }}>
              <rect x="370" y="720" width="180" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('outside-team', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="460" y="737" textAnchor="middle" fill={textFill('outside-team')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>YOUR COMPANY</text>
              <text x="460" y="751" textAnchor="middle" fill={goldFill('outside-team')} fontSize="9" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Your in-house marketing team</text>
            </g>

            {/* NODE: SERINO OVERSEES */}
            <g {...hoverHandlers('oversees')} style={{ ...hoverHandlers('oversees').style, ...na(1790) }}>
              <rect x="150" y="810" width="300" height="80" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity={rectFill('oversees', 0.08)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="838" textAnchor="middle" fill={goldFill('oversees')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>SERINO CONSULTING OVERSEES</text>
              <text x="300" y="858" textAnchor="middle" fill={textFill('oversees')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Quality, Consistency, Brand Alignment, Approvals</text>
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

        {/* CTA → Testimonials */}
        <div className="flex justify-center mt-12">
          <a
            href="#testimonials"
            className="inline-block font-heading text-sm tracking-widest uppercase border px-8 py-4 transition-all duration-200"
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
            What Our Clients Say →
          </a>
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
            <h2 className="font-display text-3xl text-roma-cream mb-1">The Serino Brand Foundation</h2>
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
                    Serino's The Serino Brand Foundation exists to not only actualize the brand and make it official for growth, but to help preserve integrity and heart through every stage of growth. It's the difference between a brand that reacts and one that leads.
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
