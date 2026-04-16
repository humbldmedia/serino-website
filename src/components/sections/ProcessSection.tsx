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
            <line x1="300" y1="400" x2="300" y2="450" stroke="#C2A878" strokeWidth="1" pathLength="1" style={la(780)} />

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
              <text x="300" y="30" textAnchor="middle" fill={textFill('client-needs')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>CLIENT NEEDS</text>
              <text x="300" y="48" textAnchor="middle" fill={goldFill('client-needs')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>"We need branding / content"</text>
            </g>

            {/* Dot */}
            <circle cx="300" cy="110" r="3" fill="#C2A878" style={na(150)} />

            {/* NODE: SERINO CONSULTING */}
            <g {...hoverHandlers('serino')} style={{ ...hoverHandlers('serino').style, ...na(200) }}>
              <rect x="190" y="110" width="220" height="60" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity={rectFill('serino', 0.08)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="134" textAnchor="middle" fill={goldFill('serino')} fontSize="13" fontFamily="Cormorant Garamond, serif" letterSpacing="2" fontWeight="500" style={{ transition: 'fill 200ms' }}>SERINO CONSULTING</text>
              <text x="300" y="154" textAnchor="middle" fill={textFill('serino')} fontSize="11" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>The Brain</text>
            </g>

            {/* NODE: BRAND STRATEGY */}
            <g {...hoverHandlers('brand-strategy')} style={{ ...hoverHandlers('brand-strategy').style, ...na(440) }}>
              <rect x="50" y="235" width="120" height="44" rx="0" fill="#C2A878" fillOpacity={rectFill('brand-strategy', 0)} stroke="none" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="100" y="257" textAnchor="middle" fill={textFill('brand-strategy')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>BRAND</text>
              <text x="100" y="271" textAnchor="middle" fill={textFill('brand-strategy')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>STRATEGY</text>
            </g>

            {/* NODE: CREATIVE DIRECTION */}
            <g {...hoverHandlers('creative-dir')} style={{ ...hoverHandlers('creative-dir').style, ...na(470) }}>
              <rect x="240" y="235" width="120" height="44" rx="0" fill="#C2A878" fillOpacity={rectFill('creative-dir', 0)} stroke="none" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="257" textAnchor="middle" fill={textFill('creative-dir')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>CREATIVE</text>
              <text x="300" y="271" textAnchor="middle" fill={textFill('creative-dir')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>DIRECTION</text>
            </g>

            {/* NODE: PROJECT ARCHITECTURE */}
            <g {...hoverHandlers('project-arch')} style={{ ...hoverHandlers('project-arch').style, ...na(500) }}>
              <rect x="430" y="235" width="110" height="44" rx="0" fill="#C2A878" fillOpacity={rectFill('project-arch', 0)} stroke="none" style={{ transition: 'fill-opacity 200ms' }} />
              <text x="490" y="257" textAnchor="middle" fill={textFill('project-arch')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>PROJECT</text>
              <text x="490" y="271" textAnchor="middle" fill={textFill('project-arch')} fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5" style={{ transition: 'fill 200ms' }}>ARCHITECTURE</text>
            </g>

            {/* Dot */}
            <circle cx="300" cy="340" r="3" fill="#C2A878" style={na(640)} />

            {/* NODE: STRATEGIC PRODUCTION PLAN */}
            <g {...hoverHandlers('production-plan')} style={{ ...hoverHandlers('production-plan').style, ...na(660) }}>
              <rect x="150" y="340" width="300" height="60" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity={rectFill('production-plan', 0.06)} style={{ transition: 'fill-opacity 200ms' }} />
              <text x="300" y="363" textAnchor="middle" fill={goldFill('production-plan')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>STRATEGIC PRODUCTION PLAN</text>
              <text x="300" y="381" textAnchor="middle" fill={textFill('production-plan')} fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic" style={{ transition: 'fill 200ms' }}>The Master Plan for Execution</text>
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
              <text x="300" y="822" textAnchor="middle" fill={goldFill('ongoing')} fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2" style={{ transition: 'fill 200ms' }}>ONGOING CONSULTING &amp; GROWTH</text>
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
    </section>
  )
}
