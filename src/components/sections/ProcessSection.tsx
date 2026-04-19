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
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [showDeliverable, setShowDeliverable] = useState(false)
  const [modalView, setModalView] = useState<'deliverable' | 'why'>('deliverable')
  const [showRetainer, setShowRetainer] = useState(false)
  const [retainerView, setRetainerView] = useState<'deliverable' | 'why'>('deliverable')

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

        <div
          ref={svgWrapRef}
          className="mt-8 fade-up-visible"
          style={{ transitionDelay: '80ms', overflowX: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative' } as React.CSSProperties}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
          }}
        >
          <svg
            viewBox="80 0 440 970"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto overflow-visible"
            style={{ width: '100%', minWidth: '340px' }}
            aria-label="Serino Consulting Process Flowchart"
          >
            {/* ── LINES ── */}

            {/* CLIENT → SERINO */}
            <line x1="300" y1="60" x2="300" y2="110" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(150)} />

            {/* SERINO → DELIVERABLE #1 */}
            <line x1="300" y1="170" x2="300" y2="220" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(350)} />

            {/* DELIVERABLE #1 → fan dot */}
            <line x1="300" y1="292" x2="300" y2="310" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(560)} />

            {/* Fan dot → top hex (Brand Dev) */}
            <line x1="300" y1="310" x2="300" y2="323" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(600)} />

            {/* Top hex → hub */}
            <line x1="300" y1="367" x2="300" y2="385" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(650)} />

            {/* Hub → left hex (Marketing) */}
            <line x1="300" y1="385" x2="272" y2="385" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(680)} />

            {/* Hub → right hex (Creative Dir) */}
            <line x1="300" y1="385" x2="328" y2="385" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(710)} />

            {/* Hub → bottom hex (Project Arch) */}
            <line x1="300" y1="385" x2="300" y2="403" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(740)} />

            {/* Bottom hex → converge dot */}
            <line x1="300" y1="447" x2="300" y2="467" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1060)} />

            {/* Converge dot → DELIVERABLES */}
            <line x1="300" y1="467" x2="300" y2="487" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1080)} />

            {/* PACKAGE DELIVERED → REVIEW CALL */}
            <line x1="300" y1="541" x2="300" y2="559" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1200)} />

            {/* REVIEW CALL → DELIVERABLE #2 */}
            <line x1="300" y1="631" x2="300" y2="651" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1360)} />

            {/* DELIVERABLE #2 → HUMBLD / OUTSIDE */}
            <line x1="300" y1="723" x2="175" y2="769" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1540)} />
            <line x1="300" y1="723" x2="425" y2="769" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1565)} />

            {/* HUMBLD / OUTSIDE → OVERSEES */}
            <line x1="175" y1="809" x2="300" y2="859" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1730)} />
            <line x1="425" y1="809" x2="300" y2="859" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(1750)} />


            {/* ── DOTS ── */}
            <circle cx="300" cy="110" r="3" fill="#C2A878" style={na(150)} />
            <circle cx="300" cy="220" r="3" fill="#C2A878" style={na(370)} />
            <circle cx="300" cy="310" r="3" fill="#C2A878" style={na(580)} />
            <circle cx="300" cy="385" r="3" fill="#C2A878" style={na(660)} />
            <circle cx="300" cy="467" r="3" fill="#C2A878" style={na(1040)} />
            <circle cx="300" cy="559" r="3" fill="#C2A878" style={na(1220)} />
            <circle cx="300" cy="651" r="3" fill="#C2A878" style={na(1380)} />
            <circle cx="300" cy="859" r="3" fill="#C2A878" style={na(1770)} />

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
              <rect x="150" y="220" width="300" height="72" rx="0" stroke="#C2A878" strokeWidth="1" fill="#b45f40" fillOpacity={rectFill('production-plan', 0.18)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="243" textAnchor="middle" fill={goldFill('production-plan')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>FLAGSHIP SERVICE</text>
              <text x="300" y="261" textAnchor="middle" fill={textFill('production-plan')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>The Serino Brand Foundation</text>
              <text
                x="300" y="276" textAnchor="middle"
                fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5"
                fill="#C2A878"
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={(e) => { e.stopPropagation(); setShowDeliverable(true) }}
              >Learn more</text>
            </g>

            {/* NODE: BRAND DEVELOPMENT (top of cross) */}
            <g {...hoverHandlers('brand-dev')} style={{ ...hoverHandlers('brand-dev').style, ...na(720) }}>
              <polygon points="327,323 352,345 327,367 273,367 248,345 273,323" fill="#C2A878" fillOpacity={rectFill('brand-dev', 0.13)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="341" textAnchor="middle" fill={textFill('brand-dev')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>BRAND</text>
              <text x="300" y="354" textAnchor="middle" fill={textFill('brand-dev')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>DEVELOPMENT</text>
            </g>

            {/* NODE: MARKETING STRATEGY (left of cross) */}
            <g {...hoverHandlers('marketing-strategy')} style={{ ...hoverHandlers('marketing-strategy').style, ...na(750) }}>
              <polygon points="247,363 272,385 247,407 193,407 168,385 193,363" fill="#C2A878" fillOpacity={rectFill('marketing-strategy', 0.13)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="220" y="381" textAnchor="middle" fill={textFill('marketing-strategy')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>MARKETING</text>
              <text x="220" y="394" textAnchor="middle" fill={textFill('marketing-strategy')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>STRATEGY</text>
            </g>

            {/* NODE: CREATIVE DIRECTION (right of cross) */}
            <g {...hoverHandlers('creative-dir')} style={{ ...hoverHandlers('creative-dir').style, ...na(780) }}>
              <polygon points="407,363 432,385 407,407 353,407 328,385 353,363" fill="#C2A878" fillOpacity={rectFill('creative-dir', 0.13)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="380" y="381" textAnchor="middle" fill={textFill('creative-dir')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>CREATIVE</text>
              <text x="380" y="394" textAnchor="middle" fill={textFill('creative-dir')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>DIRECTION</text>
            </g>

            {/* NODE: PROJECT ARCHITECTURE (bottom of cross) */}
            <g {...hoverHandlers('project-arch')} style={{ ...hoverHandlers('project-arch').style, ...na(810) }}>
              <polygon points="327,403 352,425 327,447 273,447 248,425 273,403" fill="#C2A878" fillOpacity={rectFill('project-arch', 0.13)} stroke="#C2A878" strokeWidth="1" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="421" textAnchor="middle" fill={textFill('project-arch')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>PROJECT</text>
              <text x="300" y="434" textAnchor="middle" fill={textFill('project-arch')} fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.2" style={{ transition: 'fill 200ms' }}>ARCHITECTURE</text>
            </g>

            {/* NODE: DELIVERABLES */}
            <g {...hoverHandlers('deliverables')} style={{ ...hoverHandlers('deliverables').style, ...na(1080) }}>
              <rect x="150" y="487" width="300" height="54" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('deliverables', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="507" textAnchor="middle" fill={textFill('deliverables')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>DELIVERABLE ITEM #1 SHIPPED</text>
              <text x="300" y="525" textAnchor="middle" fill={goldFill('deliverables')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Assessment &amp; Review</text>
            </g>

            {/* NODE: REVIEW CALL */}
            <g {...hoverHandlers('review-call')} style={{ ...hoverHandlers('review-call').style, ...na(1240) }}>
              <rect x="160" y="559" width="280" height="72" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity={rectFill('review-call', 0.08)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="581" textAnchor="middle" fill={goldFill('review-call')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" fontWeight="500" style={{ transition: 'fill 200ms' }}>REVIEW CALL</text>
              <text x="300" y="599" textAnchor="middle" fill={textFill('review-call')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Client: "Wow!"</text>
              <text x="300" y="617" textAnchor="middle" fill={textFill('review-call')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Serino Consulting: "Yes! Now let's execute."</text>
            </g>

            {/* NODE: RETAINER PACKAGE */}
            <g {...hoverHandlers('deliverable-2')} style={{ ...hoverHandlers('deliverable-2').style, ...na(1400) }}>
              <rect x="150" y="651" width="300" height="72" rx="0" stroke="#C2A878" strokeWidth="1" fill="#b45f40" fillOpacity={rectFill('deliverable-2', 0.18)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="674" textAnchor="middle" fill={goldFill('deliverable-2')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>RETAINER PACKAGE</text>
              <text x="300" y="692" textAnchor="middle" fill={textFill('deliverable-2')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Serino Governance &amp; Growth</text>
              <text x="300" y="707" textAnchor="middle" fontSize="9" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" fill="#C2A878" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={(e) => { e.stopPropagation(); setShowRetainer(true) }}>Learn more</text>
            </g>

            {/* NODE: HUMBLD MEDIA */}
            <g {...hoverHandlers('humbld')} style={{ ...hoverHandlers('humbld').style, ...na(1590) }}>
              <rect x="95" y="769" width="160" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('humbld', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="175" y="786" textAnchor="middle" fill={textFill('humbld')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>HUMBLD MEDIA</text>
              <text x="175" y="800" textAnchor="middle" fill={goldFill('humbld')} fontSize="9" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Our production agency partner</text>
            </g>

            {/* NODE: YOUR COMPANY */}
            <g {...hoverHandlers('outside-team')} style={{ ...hoverHandlers('outside-team').style, ...na(1615) }}>
              <rect x="345" y="769" width="160" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('outside-team', 0)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="425" y="786" textAnchor="middle" fill={textFill('outside-team')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>YOUR COMPANY</text>
              <text x="425" y="800" textAnchor="middle" fill={goldFill('outside-team')} fontSize="9" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Your in-house marketing team</text>
            </g>

            {/* NODE: SERINO OVERSEES */}
            <g {...hoverHandlers('oversees')} style={{ ...hoverHandlers('oversees').style, ...na(1790) }}>
              <rect x="150" y="859" width="300" height="80" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity={rectFill('oversees', 0.08)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="887" textAnchor="middle" fill={goldFill('oversees')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>SERINO CONSULTING OVERSEES</text>
              <text x="300" y="907" textAnchor="middle" fill={textFill('oversees')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>Quality, Consistency, Brand Alignment, Approvals</text>
            </g>


          </svg>

          {/* Floating cursor tooltip */}
          {hoveredNode && NODE_DESCRIPTIONS[hoveredNode] && (
            <div
              style={{
                position: 'absolute',
                left: tooltipPos.x + 16,
                top: tooltipPos.y - 12,
                maxWidth: '220px',
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(194,168,120,0.35)',
                padding: '12px 14px',
                pointerEvents: 'none',
                zIndex: 30,
              }}
            >
              <p
                style={{
                  fontFamily: 'EB Garamond, serif',
                  fontSize: '13px',
                  fontStyle: 'italic',
                  color: 'rgba(245,240,230,0.85)',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {NODE_DESCRIPTIONS[hoveredNode]}
              </p>
            </div>
          )}
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
            style={{ backgroundColor: '#26211a', border: '1px solid rgba(194,168,120,0.3)', padding: '2.5rem' }}
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
            <p className="font-heading text-xs tracking-widest uppercase mb-1" style={{ color: '#C2A878' }}>Flagship Service</p>
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
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    Without a clear identity, voice, and plan established from the start, teams pull in different directions, messaging becomes inconsistent, and the energy that launched the idea slowly turns into burnout and dysfunction. No, a brand logo is not all you need.
                  </p>
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    Why do 90% of startups fail within the first 2–5 years of operation? Because they do not hire Serino Consulting to establish their brand foundation and keep them on track.
                  </p>
                  <p className="font-display italic text-center" style={{ color: 'rgba(194,168,120,0.85)', fontSize: '0.8rem' }}>
                    "Write the vision and make it plain on tablets, that he may run who reads it." — Habakkuk 2:2
                  </p>
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    The Serino Brand Foundation exists to not only actualize the brand and make it official for growth, but to help preserve integrity and heart through every stage of growth. It's the difference between a brand that reacts and one that leads.
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
      {/* Retainer Package Modal */}
      {showRetainer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(4px)' }}
          onClick={() => { setShowRetainer(false); setRetainerView('deliverable') }}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: '#26211a', border: '1px solid rgba(194,168,120,0.3)', padding: '2.5rem' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => { setShowRetainer(false); setRetainerView('deliverable') }}
              className="absolute top-4 right-5 font-heading text-xs tracking-widest uppercase"
              style={{ color: '#C2A878' }}
            >
              Close ✕
            </button>

            {/* Shared header */}
            <p className="font-heading text-xs tracking-widest uppercase mb-1" style={{ color: '#C2A878' }}>Retainer Package</p>
            <h2 className="font-display text-3xl text-roma-cream mb-1">Serino Governance &amp; Growth</h2>
            <p className="font-heading text-xs tracking-widest uppercase mb-6" style={{ color: 'rgba(194,168,120,0.6)' }}>$3,500 – $6,000 / mo&nbsp;&nbsp;·&nbsp;&nbsp;Ongoing</p>

            {/* Slide indicator */}
            <div className="flex gap-2 mb-8">
              {(['deliverable', 'why'] as const).map(v => (
                <div
                  key={v}
                  style={{
                    height: '2px',
                    flex: 1,
                    backgroundColor: retainerView === v ? '#C2A878' : 'rgba(194,168,120,0.2)',
                    transition: 'background-color 300ms',
                  }}
                />
              ))}
            </div>

            {/* SLIDE 1: Package breakdown */}
            {retainerView === 'deliverable' && (
              <div>
                <p className="font-body text-roma-cream/70 leading-relaxed mb-8">
                  The brand is built. Now it has to be kept. This retainer exists for companies that understand the work doesn't end at launch — it deepens. Serino stays inside your operation as the strategic constant: guiding decisions, maintaining brand integrity, and ensuring every execution reflects the vision you built from the foundation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <p className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A878' }}>Strategic Oversight</p>
                    <ul className="space-y-2">
                      {[
                        'Monthly Strategy & Direction Sessions',
                        'Brand Governance & Consistency Reviews',
                        'Content Approval & Quality Control',
                        'Campaign Direction & Messaging Alignment',
                        'Quarterly Brand Audits',
                        'Creative Direction on All Output',
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
                      <p className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A878' }}>Execution Support</p>
                      <ul className="space-y-2 mb-6">
                        {[
                          'Vendor & Production Team Coordination',
                          'Humbld Media Partnership Management',
                          'Performance Review & Reporting',
                          'Growth Roadmap Updates',
                          'On-Call Consulting (Priority Access)',
                          'Consulting + Project Management (Ongoing)',
                        ].map(item => (
                          <li key={item} className="flex items-start gap-3 font-body text-sm text-roma-cream/70">
                            <span style={{ color: '#C2A878', marginTop: '2px', flexShrink: 0 }}>—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => setRetainerView('why')}
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
            {retainerView === 'why' && (
              <div>
                <p className="font-heading text-xs tracking-widest uppercase mb-6" style={{ color: '#C2A878' }}>Why This Matters</p>

                <div className="space-y-4 leading-relaxed mb-10">
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    Most brands drift within six to twelve months of launch. Not because the strategy was wrong — but because there was no one keeping watch. Execution without ongoing oversight becomes inconsistent. Messaging fragments. The heart of the brand gets buried under urgency and output.
                  </p>
                  <p className="font-display italic text-center" style={{ color: 'rgba(194,168,120,0.85)', fontSize: '0.8rem' }}>
                    "Let us not grow weary in doing good, for in due season we will reap,<br />if we do not give up." — Galatians 6:9
                  </p>
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    Governance is not maintenance. It is mastery maintained. The Serino Retainer keeps your brand in alignment through every season of growth — protecting what was built, directing what comes next, and ensuring that every decision made in the marketplace is rooted in your original vision and values.
                  </p>
                  <p className="font-display italic text-center" style={{ color: 'rgba(194,168,120,0.85)', fontSize: '0.8rem' }}>
                    "Where there is no guidance, a people falls, but in an abundance of counselors<br />there is safety." — Proverbs 11:14
                  </p>
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>
                    The brands that endure are not the ones that launched loudest. They are the ones that stayed true the longest. Serino Consulting exists to be that voice in the room — the one that keeps the standard high, the direction clear, and the brand worth believing in.
                  </p>
                </div>

                <button
                  onClick={() => setRetainerView('deliverable')}
                  className="font-heading text-xs tracking-widest uppercase"
                  style={{ color: '#C2A878', letterSpacing: '0.1em' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
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
