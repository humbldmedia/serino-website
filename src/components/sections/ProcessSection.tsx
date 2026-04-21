import { useEffect, useRef, useState } from 'react'

// ── Constants ──────────────────────────────────────────
const DIAG_W = 800
const DIAG_H = 1400
const CX = 400
const HUB_X = 400
const HUB_Y = 598
const HEX_W = 152
const HEX_H = 138
const HEX_HW = HEX_W / 2
const HEX_HH = HEX_H / 2

const GOLD      = 'rgb(194,168,120)'   // --gold-warm / site's #C2A878
const GOLD_V    = '#c9a84c'            // --gold (vivid)
const CREAM     = 'rgb(244,240,234)'   // --cream
const BG_COLOR  = '#060402'
const DARK_BG   = 'rgba(36,13,4,0.94)'

// ── Types ──────────────────────────────────────────────
interface NodeDef {
  id: string
  cx: number; cy: number
  w: number; h: number
  type: 'standard' | 'dark' | 'hex'
  title: string
  sub?: string
  link?: 'flagship' | 'retainer'
  info: string
}

interface Particle {
  x: number; y: number
  tx: number; ty: number
  progress: number; speed: number; size: number
}

// ── Node data ──────────────────────────────────────────
const NODES: NodeDef[] = [
  { id: 'client',     cx: CX,       cy: 0,              w: 240,   h: 58,    type: 'standard',
    title: 'CLIENT', sub: '"We have a need"',
    info: 'The engagement begins. A client arrives with a vision, a challenge, or a gap that needs filling. This moment is everything.' },

  { id: 'serino1',   cx: CX,       cy: 128,            w: 288,   h: 58,    type: 'standard',
    title: 'SERINO CONSULTING', sub: '"This is what you need"',
    info: 'Serino Consulting maps the challenge to a solution — delivering clarity and a precise path forward. No guesswork. Only strategy.' },

  { id: 'flagship',  cx: CX,       cy: 265,            w: 312,   h: 76,    type: 'dark',
    title: 'FLAGSHIP SERVICE', sub: 'Serino Brand Foundation Plan', link: 'flagship',
    info: 'The Serino Brand Foundation is our core strategic offering — a full-spectrum brand and business alignment engagement built for lasting impact.' },

  { id: 'brand',     cx: CX,       cy: 415,            w: HEX_W, h: HEX_H, type: 'hex',
    title: 'BRAND\nDEVELOPMENT',
    info: 'Identity. Interpretation. Visual language. Voice. Everything that defines how the brand shows up in the world — consistently and boldly.' },

  { id: 'marketing', cx: CX - 158, cy: HUB_Y - HEX_HH, w: HEX_W, h: HEX_H, type: 'hex',
    title: 'MARKETING\nSTRATEGY',
    info: 'Channel Strategy. Campaigns. Positioning. Audience Development. Everything aligned to brand goals and growth objectives.' },

  { id: 'creative',  cx: CX + 158, cy: HUB_Y - HEX_HH, w: HEX_W, h: HEX_H, type: 'hex',
    title: 'CREATIVE\nDIRECTION',
    info: 'Strategic Thinking. Concept Development. Content Frameworks. Storytelling that breathes life into the brand and captivates audiences.' },

  { id: 'project',   cx: CX,       cy: HUB_Y + 15,     w: HEX_W, h: HEX_H, type: 'hex',
    title: 'PROJECT\nARCHITECTURE',
    info: 'Systems. Timelines. Workflows that ensure every initiative is executed with precision and excellence.' },

  { id: 'deliverable', cx: CX,     cy: 820,            w: 328,   h: 62,    type: 'standard',
    title: 'DELIVERY', sub: 'Assessment & Review',
    info: 'The first major deliverable lands. A comprehensive assessment and strategic review package — a tangible, actionable foundation.' },

  { id: 'review',    cx: CX,       cy: 942,            w: 305,   h: 70,    type: 'standard',
    title: 'REVIEW CALL', sub: 'Client: "Wow!"\nSerino: "Yes! Now let\'s execute."',
    info: 'The alignment moment. Client and Serino lock in with full confidence and momentum. This is where the real work begins.' },

  { id: 'retainer',  cx: CX,       cy: 1068,           w: 305,   h: 76,    type: 'dark',
    title: 'RETAINER PACKAGE', sub: 'Serino Governance & Growth', link: 'retainer',
    info: 'Ongoing partnership. The Serino Governance & Growth retainer sustains momentum, consistency, and brand integrity across every initiative.' },

  { id: 'humbld',    cx: CX - 145, cy: 1204,           w: 210,   h: 62,    type: 'standard',
    title: 'HUMBLD MEDIA', sub: 'Our production agency partner',
    info: 'Humbld Media handles all production — video, photo, and content creation at the highest creative and technical standard.' },

  { id: 'yourco',    cx: CX + 145, cy: 1204,           w: 210,   h: 62,    type: 'standard',
    title: 'YOUR COMPANY', sub: 'Your in-house marketing team',
    info: 'Your internal team executes day-to-day operations — fully empowered with Serino strategy and brand guardrails as their guide.' },

  { id: 'oversees',  cx: CX,       cy: 1320,           w: 300,   h: 70,    type: 'standard',
    title: 'SERINO CONSULTING OVERSEES',
    sub: 'Quality, Consistency, Brand Alignment, Approvals',
    info: 'Serino maintains final oversight — ensuring every output meets the standard, serves the brand, and advances the mission.' },
]

const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))
const nb = (id: string) => ({ x: nodeMap[id].cx, y: nodeMap[id].cy + nodeMap[id].h })
const nt = (id: string) => ({ x: nodeMap[id].cx, y: nodeMap[id].cy })
const nc = (id: string) => ({ x: nodeMap[id].cx, y: nodeMap[id].cy + nodeMap[id].h / 2 })

const mktRight = { x: nodeMap['marketing'].cx + HEX_HW, y: nc('marketing').y }
const creLeft  = { x: nodeMap['creative'].cx  - HEX_HW, y: nc('creative').y  }

// ── Particle connection endpoints ──────────────────────
const CONN_PAIRS = [
  [nb('client'),      nt('serino1')],
  [nb('serino1'),     nt('flagship')],
  [nb('flagship'),    nt('brand')],
  [nb('brand'),       { x: HUB_X, y: HUB_Y }],
  [{ x: HUB_X, y: HUB_Y }, nt('project')],
  [{ x: HUB_X, y: HUB_Y }, mktRight],
  [{ x: HUB_X, y: HUB_Y }, creLeft],
  [nb('project'),     nt('deliverable')],
  [nb('deliverable'), nt('review')],
  [nb('review'),      nt('retainer')],
  [nb('retainer'),    { x: nodeMap['humbld'].cx, y: nodeMap['humbld'].cy }],
  [nb('retainer'),    { x: nodeMap['yourco'].cx, y: nodeMap['yourco'].cy }],
  [nb('humbld'),      nt('oversees')],
  [nb('yourco'),      nt('oversees')],
]

// ── SVG path data ──────────────────────────────────────
const jRetainer = nb('retainer').y + 36
const jOversees = nb('humbld').y + 32

const SVG_PATHS = [
  // Spine top
  { d: `M${CX},${nb('client').y} L${CX},${nt('serino1').y - 5}`,   delay: 0,    arrow: true },
  { d: `M${CX},${nb('serino1').y} L${CX},${nt('flagship').y - 5}`, delay: 0.3,  arrow: true },
  { d: `M${CX},${nb('flagship').y} L${CX},${nt('brand').y - 5}`,   delay: 0.6,  arrow: true },
  // Cross
  { d: `M${CX},${nb('brand').y} L${HUB_X},${HUB_Y - 3}`,           delay: 0.8,  arrow: false },
  { d: `M${HUB_X},${HUB_Y + 3} L${CX},${nt('project').y - 5}`,     delay: 0.9,  arrow: true },
  { d: `M${HUB_X - 3},${HUB_Y} L${mktRight.x + 5},${mktRight.y}`,  delay: 0.85, arrow: true },
  { d: `M${HUB_X + 3},${HUB_Y} L${creLeft.x - 5},${creLeft.y}`,    delay: 0.85, arrow: true },
  // Spine bottom
  { d: `M${CX},${nb('project').y} L${CX},${nt('deliverable').y - 5}`,   delay: 1.1,  arrow: true },
  { d: `M${CX},${nb('deliverable').y} L${CX},${nt('review').y - 5}`,    delay: 1.3,  arrow: true },
  { d: `M${CX},${nb('review').y} L${CX},${nt('retainer').y - 5}`,       delay: 1.6,  arrow: true },
  // Retainer branches
  { d: `M${CX},${nb('retainer').y} L${CX},${jRetainer}`,                          delay: 1.9,  arrow: false },
  { d: `M${nodeMap['humbld'].cx},${jRetainer} L${nodeMap['yourco'].cx},${jRetainer}`, delay: 2.0, arrow: false },
  { d: `M${nodeMap['humbld'].cx},${jRetainer} L${nodeMap['humbld'].cx},${nodeMap['humbld'].cy - 5}`, delay: 2.05, arrow: true },
  { d: `M${nodeMap['yourco'].cx},${jRetainer} L${nodeMap['yourco'].cx},${nodeMap['yourco'].cy - 5}`, delay: 2.05, arrow: true },
  // Oversees branches
  { d: `M${nodeMap['humbld'].cx},${nb('humbld').y} L${nodeMap['humbld'].cx},${jOversees}`, delay: 2.2,  arrow: false },
  { d: `M${nodeMap['yourco'].cx},${nb('yourco').y} L${nodeMap['yourco'].cx},${jOversees}`, delay: 2.2,  arrow: false },
  { d: `M${nodeMap['humbld'].cx},${jOversees} L${nodeMap['yourco'].cx},${jOversees}`,      delay: 2.3,  arrow: false },
  { d: `M${CX},${jOversees} L${CX},${nt('oversees').y - 5}`,                              delay: 2.35, arrow: true },
]

const HUB_DOTS = [
  nb('client'), nb('serino1'), nb('flagship'),
  { x: CX, y: HUB_Y },
  nb('project'), nb('deliverable'), nb('review'), nb('retainer'),
]

// ══════════════════════════════════════════════════════
export default function ProcessSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const bgCanvasRef  = useRef<HTMLCanvasElement>(null)
  const pCanvasRef   = useRef<HTMLCanvasElement>(null)
  const rafRef       = useRef<number>(0)
  const mouseRef     = useRef({ x: 0, y: 0, sx: 0, sy: 0 })
  const particlesRef = useRef<Particle[]>([])

  const [activeNode,    setActiveNode]    = useState<string | null>(null)
  const [hoveredNode,   setHoveredNode]   = useState<string | null>(null)
  const [showDeliverable, setShowDeliverable] = useState(false)
  const [modalView,     setModalView]     = useState<'deliverable' | 'why'>('deliverable')
  const [showRetainer,  setShowRetainer]  = useState(false)
  const [retainerView,  setRetainerView]  = useState<'deliverable' | 'why'>('deliverable')
  const [diagramScale,  setDiagramScale]  = useState(1)
  const touchStartX = useRef(0)

  useEffect(() => {
    const updateScale = () => {
      // Content spans x≈150–650 within the 800px canvas; scale to that real width
      const CONTENT_W = 520
      const maxW = window.innerWidth - 40
      setDiagramScale(Math.min(1, maxW / CONTENT_W))
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // ── Canvas RAF loop ──────────────────────────────────
  useEffect(() => {
    const bgCanvas = bgCanvasRef.current
    const pCanvas  = pCanvasRef.current
    const section  = sectionRef.current
    if (!bgCanvas || !pCanvas || !section) return

    const bgCtx = bgCanvas.getContext('2d')!
    const pc    = pCanvas.getContext('2d')!

    const resizeBg = () => {
      bgCanvas.width  = section.offsetWidth
      bgCanvas.height = section.offsetHeight
    }
    resizeBg()
    window.addEventListener('resize', resizeBg)

    const orbs = Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      speed: 0.00022 + Math.random() * 0.0002,
      rx:    0.28 + Math.random() * 0.18,
      ry:    0.22 + Math.random() * 0.15,
      r:     160 + Math.random() * 200,
    }))

    const drawBg = () => {
      const w = bgCanvas.width, h = bgCanvas.height
      bgCtx.fillStyle = BG_COLOR
      bgCtx.fillRect(0, 0, w, h)

      bgCtx.strokeStyle = 'rgba(201,168,76,0.028)'
      bgCtx.lineWidth = 1
      for (let x = 0; x < w; x += 55) { bgCtx.beginPath(); bgCtx.moveTo(x, 0); bgCtx.lineTo(x, h); bgCtx.stroke() }
      for (let y = 0; y < h; y += 55) { bgCtx.beginPath(); bgCtx.moveTo(0, y); bgCtx.lineTo(w, y); bgCtx.stroke() }

      orbs.forEach(o => {
        o.angle += o.speed
        const cx = w * 0.5 + w * o.rx * Math.sin(o.angle)
        const cy = h * 0.5 + h * o.ry * Math.cos(o.angle * 0.71)
        const g = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, o.r)
        g.addColorStop(0, 'rgba(150,95,18,0.04)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        bgCtx.fillStyle = g; bgCtx.fillRect(0, 0, w, h)
      })

      const m = mouseRef.current
      const mg = bgCtx.createRadialGradient(m.sx, m.sy, 0, m.sx, m.sy, 280)
      mg.addColorStop(0,   'rgba(201,168,76,0.098)')
      mg.addColorStop(0.4, 'rgba(201,168,76,0.028)')
      mg.addColorStop(1,   'rgba(0,0,0,0)')
      bgCtx.fillStyle = mg; bgCtx.fillRect(0, 0, w, h)
    }

    const spawnParticle = () => {
      const pair = CONN_PAIRS[Math.floor(Math.random() * CONN_PAIRS.length)]
      const base = 0.013
      particlesRef.current.push({
        x: pair[0].x, y: pair[0].y,
        tx: pair[1].x, ty: pair[1].y,
        progress: 0, speed: base + Math.random() * base,
        size: 1.2 + Math.random() * 0.8,
      })
    }

    const updateParticles = () => {
      pc.clearRect(0, 0, DIAG_W, DIAG_H)
      const parts = particlesRef.current
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.progress += p.speed
        if (p.progress >= 1) { parts.splice(i, 1); continue }
        const op = Math.sin(p.progress * Math.PI)
        const x = p.x + (p.tx - p.x) * p.progress
        const y = p.y + (p.ty - p.y) * p.progress
        pc.beginPath(); pc.arc(x, y, p.size, 0, Math.PI * 2)
        pc.fillStyle = `rgba(201,168,76,${op * 0.75})`; pc.fill()
        const rg = pc.createRadialGradient(x, y, 0, x, y, p.size * 5)
        rg.addColorStop(0, `rgba(201,168,76,${op * 0.22})`)
        rg.addColorStop(1, 'rgba(0,0,0,0)')
        pc.fillStyle = rg; pc.fillRect(x - p.size * 6, y - p.size * 6, p.size * 12, p.size * 12)
      }
      if (Math.random() < 0.1) spawnParticle()
    }

    const tick = () => {
      const m = mouseRef.current
      m.sx += (m.x - m.sx) * 0.065
      m.sy += (m.y - m.sy) * 0.065
      drawBg(); updateParticles()
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    section.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resizeBg)
      section.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  // Close info bar on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Element
      if (!target.closest('[data-proc-node]')) setActiveNode(null)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const handleNodeClick = (node: NodeDef) => {
    setActiveNode(prev => prev === node.id ? null : node.id)
  }

  const activeNodeData = activeNode ? nodeMap[activeNode] : null

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ backgroundColor: BG_COLOR, position: 'relative', overflow: 'hidden', paddingTop: '66px', paddingBottom: '130px' }}
    >
      <style>{`
        @keyframes procHexSpin { to { transform: rotate(360deg); } }
        @keyframes procNdIn {
          from { opacity: 0; transform: translate(-50%, 6px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes procFlow {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -75; }
        }
        @keyframes procTitleIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 0.5; }
        }
      `}</style>

      {/* Background canvas: grid + orbs + mouse glow */}
      <canvas ref={bgCanvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* Scanlines overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg,transparent 0,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)',
      }} />

      {/* Vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 80% at 50% 50%,transparent 35%,rgba(0,0,0,0.7) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
        <div style={{ width: DIAG_W, maxWidth: '100%' }}>

          {/* Section label */}
          <div style={{
            fontSize: '11.5px', letterSpacing: '0.36em', fontWeight: 400,
            color: GOLD_V, textTransform: 'uppercase',
            marginBottom: '60px',
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            animation: 'procTitleIn 0.9s ease both',
          }}>
            THE PROCESS
          </div>

          {/* Diagram */}
          <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', height: DIAG_H * diagramScale }}>
            <div style={{ position: 'relative', width: DIAG_W, height: DIAG_H, flexShrink: 0, transformOrigin: 'top center', transform: `scale(${diagramScale})` }}>

              {/* Particle canvas */}
              <canvas
                ref={pCanvasRef}
                width={DIAG_W}
                height={DIAG_H}
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 }}
              />

              {/* SVG connections */}
              <svg
                width={DIAG_W}
                height={DIAG_H}
                style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 1 }}
              >
                <defs>
                  <marker id="proc-arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                    <path d="M0,0.5 L6.5,3.5 L0,6.5 L1.5,3.5 Z" fill="rgba(201,168,76,0.5)" />
                  </marker>
                  <filter id="proc-glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {SVG_PATHS.map((path, i) => (
                  <g key={i}>
                    <path d={path.d} stroke="rgba(201,168,76,0.08)" strokeWidth="3" fill="none" filter="url(#proc-glow)" />
                    <path
                      d={path.d}
                      stroke="rgba(201,168,76,0.38)"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="5 10"
                      markerEnd={path.arrow ? 'url(#proc-arr)' : undefined}
                      style={{ animation: `procFlow 2.8s linear ${path.delay}s infinite` }}
                    />
                  </g>
                ))}

                {HUB_DOTS.map((dot, i) => (
                  <circle
                    key={i} cx={dot.x} cy={dot.y} r="3"
                    fill={GOLD_V} opacity="0.7"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.8))' }}
                  />
                ))}
              </svg>

              {/* Nodes */}
              {NODES.map((node, i) => {
                const isActive  = activeNode  === node.id
                const isHovered = hoveredNode === node.id
                const delay     = 0.12 + i * 0.07

                const commonWrapStyle: React.CSSProperties = {
                  position: 'absolute',
                  left: node.cx,
                  top: node.cy,
                  width: node.w,
                  cursor: 'pointer',
                  zIndex: 10,
                  animation: `procNdIn 0.55s ease ${delay}s both`,
                }

                if (node.type === 'hex') {
                  return (
                    <div
                      key={node.id}
                      data-proc-node="1"
                      style={{ ...commonWrapStyle, height: node.h }}
                      onClick={() => handleNodeClick(node)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Spinning border hex */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        filter: isActive
                          ? 'drop-shadow(0 0 14px rgba(201,168,76,0.6))'
                          : isHovered
                          ? 'drop-shadow(0 0 8px rgba(201,168,76,0.45))'
                          : 'none',
                        animation: isHovered ? 'procHexSpin 4s linear infinite' : 'none',
                        transition: 'filter 0.3s',
                      }}>
                        <div style={{
                          width: '100%', height: '100%',
                          clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
                          background: `rgba(201,168,76,${isHovered || isActive ? 0.65 : 0.42})`,
                          padding: '1.5px',
                          display: 'flex', alignItems: 'stretch',
                          transition: 'background 0.3s',
                        }}>
                          <div style={{
                            flex: 1,
                            clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
                            background: 'rgba(8,4,1,.96)',
                          }} />
                        </div>
                      </div>
                      {/* Static text — always upright */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'column', textAlign: 'center',
                        padding: '8px 22px', zIndex: 2, pointerEvents: 'none',
                      }}>
                        {node.title.split('\n').map((line, li) => (
                          <div key={li} style={{
                            fontSize: '9.5px', letterSpacing: '0.2em', fontWeight: 600,
                            color: CREAM, textTransform: 'uppercase', lineHeight: 1.6,
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                          }}>{line}</div>
                        ))}
                      </div>
                    </div>
                  )
                }

                // Standard / dark node
                return (
                  <div
                    key={node.id}
                    data-proc-node="1"
                    style={commonWrapStyle}
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div style={{
                      border: `1px solid ${
                        node.type === 'dark' || node.id === 'flagship'
                          ? 'rgba(201,168,76,0.5)'
                          : GOLD
                      }`,
                      background: node.type === 'dark' ? DARK_BG : 'rgba(10,6,2,.92)',
                      textAlign: 'center',
                      padding: '11px 20px 10px',
                      position: 'relative', overflow: 'hidden',
                      transition: 'border-color .25s, box-shadow .25s',
                      boxShadow: isActive
                        ? '0 0 32px rgba(201,168,76,.24),0 0 80px rgba(201,168,76,.07)'
                        : '0 0 20px rgba(201,168,76,.07),inset 0 0 20px rgba(201,168,76,.04)',
                    }}>
                      {/* Hover inner glow */}
                      <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: 'radial-gradient(ellipse at 50% -10%,rgba(201,168,76,.1),transparent 65%)',
                        opacity: isHovered ? 1 : 0, transition: 'opacity .3s',
                      }} />
                      <div style={{
                        fontSize: '12px', letterSpacing: '0.22em', fontWeight: 600,
                        color: isActive ? GOLD : CREAM,
                        textTransform: 'uppercase', lineHeight: 1.55,
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        transition: 'color 0.2s', position: 'relative',
                      }}>{node.title}</div>
                      {node.sub && (
                        <div style={{
                          fontStyle: 'italic', fontSize: '12px', color: GOLD,
                          marginTop: '3px', lineHeight: 1.45,
                          fontFamily: 'Cormorant Garamond, Georgia, serif',
                          position: 'relative',
                        }}>
                          {node.sub.split('\n').map((line, li) => <div key={li}>{line}</div>)}
                        </div>
                      )}
                      {node.link && (
                        <span
                          style={{
                            display: 'block', fontStyle: 'italic', fontSize: '9px',
                            color: 'rgba(201,168,76,.35)', textDecoration: 'underline',
                            marginTop: '4px',
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            position: 'relative',
                          }}
                          onClick={e => {
                            e.stopPropagation()
                            if (node.link === 'flagship') setShowDeliverable(true)
                            if (node.link === 'retainer') setShowRetainer(true)
                          }}
                        >
                          Learn More
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
            <a
              href="#testimonials"
              style={{
                display: 'inline-block',
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '11px', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: `1px solid ${GOLD}`, color: GOLD,
                padding: '14px 32px', transition: 'all 200ms', textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = GOLD
                ;(e.currentTarget as HTMLAnchorElement).style.color = BG_COLOR
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLAnchorElement).style.color = GOLD
              }}
            >
              What Our Clients Say ↓
            </a>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        borderTop: '1px solid rgba(201,168,76,.14)',
        background: 'rgba(4,3,2,.96)', backdropFilter: 'blur(20px)',
        padding: '14px 40px',
        display: 'flex', alignItems: 'center', gap: '24px',
        transform: activeNode ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform .4s ease',
        zIndex: 700,
      }}>
        <span style={{
          fontSize: '9.5px', letterSpacing: '0.24em', textTransform: 'uppercase',
          color: GOLD_V, flexShrink: 0,
          fontFamily: 'Cormorant Garamond, Georgia, serif',
        }}>
          {activeNodeData?.title.replace('\n', ' ')}
        </span>
        <div style={{ width: '1px', height: '20px', background: 'rgba(201,168,76,.2)', flexShrink: 0 }} />
        <span style={{
          fontStyle: 'italic', fontSize: '11.5px',
          color: 'rgba(201,168,76,.6)', lineHeight: 1.5,
          fontFamily: 'Cormorant Garamond, Georgia, serif',
        }}>
          {activeNodeData?.info}
        </span>
        <span
          style={{
            marginLeft: 'auto', fontSize: '9px', letterSpacing: '0.15em',
            color: 'rgba(201,168,76,.3)', cursor: 'pointer', flexShrink: 0,
            textTransform: 'uppercase',
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            transition: 'color 0.2s',
          }}
          onClick={() => setActiveNode(null)}
          onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = GOLD_V}
          onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(201,168,76,.3)'}
        >
          ✕ close
        </span>
      </div>

      {/* Flagship Service Modal */}
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
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              const delta = e.changedTouches[0].clientX - touchStartX.current
              if (delta < -50) setModalView('why')
              if (delta > 50) setModalView('deliverable')
            }}
          >
            <button
              onClick={() => { setShowDeliverable(false); setModalView('deliverable') }}
              className="absolute top-4 right-5 font-heading text-xs tracking-widest uppercase"
              style={{ color: '#C2A878' }}
            >
              Close ✕
            </button>
            <p className="font-heading text-xs tracking-widest uppercase mb-1" style={{ color: '#C2A878' }}>Flagship Service</p>
            <h2 className="font-display text-3xl text-roma-cream mb-1">Serino Brand Foundation Plan</h2>
            <p className="font-heading text-xs tracking-widest uppercase mb-6" style={{ color: 'rgba(194,168,120,0.6)' }}>$20,000 – $25,000+&nbsp;&nbsp;·&nbsp;&nbsp;4–6 Weeks</p>
            <div className="flex gap-2 mb-8">
              {(['deliverable', 'why'] as const).map(v => (
                <div key={v} style={{ height: '2px', flex: 1, backgroundColor: modalView === v ? '#C2A878' : 'rgba(194,168,120,0.2)', transition: 'background-color 350ms' }} />
              ))}
            </div>
            {/* Sliding track */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                display: 'flex',
                width: '200%',
                transform: modalView === 'deliverable' ? 'translateX(0)' : 'translateX(-50%)',
                transition: 'transform 350ms cubic-bezier(0.4,0,0.2,1)',
              }}>
                {/* Deliverables panel */}
                <div style={{ width: '50%', flexShrink: 0 }}>
                  <p className="font-body text-roma-cream/70 leading-relaxed mb-8">
                    Perfect for anyone serious about building a scalable brand with long-term vision. This is the transformation package: brand assets, marketing strategy, integration, and guided consulting all in one.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <p className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A878' }}>Brand Bible</p>
                      <ul className="space-y-2">
                        {['Brand Audit + Discovery Session','Mission, Vision & Values','Core Identity Messaging + UVP','Brand Voice & Tone Guide','StoryBrand Framework','Audience & Brand Narrative Arc','Logo Creation','Color Palette','Typography System','Moodboards','Social Media Templates','Social Media Messaging + Scripts'].map(item => (
                          <li key={item} className="flex items-start gap-3 font-body text-sm text-roma-cream/70">
                            <span style={{ color: '#C2A878', marginTop: '2px', flexShrink: 0 }}>—</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A878' }}>Master Marketing Plan</p>
                        <ul className="space-y-2 mb-6">
                          {['Social Media Integration','Website Strategy + Integration','Marketing Strategy + Planning','Content Buckets + 30-Day Content Plan','Brand Video Shoot + Photoshoot','Consulting + Project Management (duration of project)'].map(item => (
                            <li key={item} className="flex items-start gap-3 font-body text-sm text-roma-cream/70">
                              <span style={{ color: '#C2A878', marginTop: '2px', flexShrink: 0 }}>—</span>{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => setModalView('why')}
                        className="font-heading text-xs tracking-widest uppercase border px-6 py-3 transition-all duration-200 self-start"
                        style={{ borderColor: '#C2A878', color: '#C2A878' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C2A878'; e.currentTarget.style.color = '#0D0D0D' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C2A878' }}
                      >
                        Why This Matters →
                      </button>
                    </div>
                  </div>
                </div>
                {/* Why panel */}
                <div style={{ width: '50%', flexShrink: 0, paddingLeft: '2.5rem' }}>
                  <p className="font-heading text-xs tracking-widest uppercase mb-6" style={{ color: '#C2A878' }}>Why This Matters</p>
                  <div className="space-y-4 leading-relaxed mb-10">
                    <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>This is the essential item that most startups and businesses overlook. Not for any reason other than it's simply not talked about enough. You cannot build a house successfully without the foundation.</p>
                    <p className="font-display italic text-center" style={{ color: 'rgba(194,168,120,0.85)', fontSize: '0.8rem' }}>"Do your planning and prepare your fields before building your house." — Proverbs 24:27</p>
                    <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>Without a clear identity, voice, and plan established from the start, teams pull in different directions, messaging becomes inconsistent, and the energy that launched the idea slowly turns into burnout and dysfunction. No, a brand logo is not all you need.</p>
                    <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>Why do 90% of startups fail within the first 2–5 years of operation? Because they do not hire Serino Consulting to establish their brand foundation and keep them on track.</p>
                    <p className="font-display italic text-center" style={{ color: 'rgba(194,168,120,0.85)', fontSize: '0.8rem' }}>"Write the vision and make it plain on tablets, that he may run who reads it." — Habakkuk 2:2</p>
                    <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>The Serino Brand Foundation Plan exists to not only actualize the brand and make it official for growth, but to help preserve integrity and heart through every stage of growth. It's the difference between a brand that reacts and one that leads.</p>
                  </div>
                  <div className="flex items-center gap-6 flex-wrap mt-2">
                    <button onClick={() => setModalView('deliverable')} className="font-heading text-xs tracking-widest uppercase" style={{ color: '#C2A878', letterSpacing: '0.1em' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>← Back to Deliverables</button>
                    <a
                      href="https://calendly.com/serinoconsulting/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200"
                      style={{ backgroundColor: '#7a3825', color: '#F4F0EA' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#964830')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#7a3825')}
                    >
                      Book Now →
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              const delta = e.changedTouches[0].clientX - touchStartX.current
              if (delta < -50) setRetainerView('why')
              if (delta > 50) setRetainerView('deliverable')
            }}
          >
            <button
              onClick={() => { setShowRetainer(false); setRetainerView('deliverable') }}
              className="absolute top-4 right-5 font-heading text-xs tracking-widest uppercase"
              style={{ color: '#C2A878' }}
            >
              Close ✕
            </button>
            <p className="font-heading text-xs tracking-widest uppercase mb-1" style={{ color: '#C2A878' }}>Retainer Package</p>
            <h2 className="font-display text-3xl text-roma-cream mb-1">Serino Governance &amp; Growth</h2>
            <p className="font-heading text-xs tracking-widest uppercase mb-6" style={{ color: 'rgba(194,168,120,0.6)' }}>$3,500 – $6,000 / mo&nbsp;&nbsp;·&nbsp;&nbsp;Ongoing</p>
            <div className="flex gap-2 mb-8">
              {(['deliverable', 'why'] as const).map(v => (
                <div key={v} style={{ height: '2px', flex: 1, backgroundColor: retainerView === v ? '#C2A878' : 'rgba(194,168,120,0.2)', transition: 'background-color 350ms' }} />
              ))}
            </div>
            {/* Sliding track */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                display: 'flex',
                width: '200%',
                transform: retainerView === 'deliverable' ? 'translateX(0)' : 'translateX(-50%)',
                transition: 'transform 350ms cubic-bezier(0.4,0,0.2,1)',
              }}>
                {/* Deliverables panel */}
                <div style={{ width: '50%', flexShrink: 0 }}>
                  <p className="font-body text-roma-cream/70 leading-relaxed mb-8">The brand is built. Now it has to be kept. This retainer exists for companies that understand the work doesn't end at launch — it deepens. Serino stays inside your operation as the strategic constant: guiding decisions, maintaining brand integrity, and ensuring every execution reflects the vision you built from the foundation.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <p className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A878' }}>Strategic Oversight</p>
                      <ul className="space-y-2">
                        {['Monthly Strategy & Direction Sessions','Brand Governance & Consistency Reviews','Content Approval & Quality Control','Campaign Direction & Messaging Alignment','Quarterly Brand Audits','Creative Direction on All Output'].map(item => (
                          <li key={item} className="flex items-start gap-3 font-body text-sm text-roma-cream/70">
                            <span style={{ color: '#C2A878', marginTop: '2px', flexShrink: 0 }}>—</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A878' }}>Execution Support</p>
                        <ul className="space-y-2 mb-6">
                          {['Vendor & Production Team Coordination','Humbld Media Partnership Management','Performance Review & Reporting','Growth Roadmap Updates','On-Call Consulting (Priority Access)','Consulting + Project Management (Ongoing)'].map(item => (
                            <li key={item} className="flex items-start gap-3 font-body text-sm text-roma-cream/70">
                              <span style={{ color: '#C2A878', marginTop: '2px', flexShrink: 0 }}>—</span>{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => setRetainerView('why')}
                        className="font-heading text-xs tracking-widest uppercase border px-6 py-3 transition-all duration-200 self-start"
                        style={{ borderColor: '#C2A878', color: '#C2A878' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C2A878'; e.currentTarget.style.color = '#0D0D0D' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C2A878' }}
                      >
                        Why This Matters →
                      </button>
                    </div>
                  </div>
                </div>
                {/* Why panel */}
                <div style={{ width: '50%', flexShrink: 0, paddingLeft: '2.5rem' }}>
                  <p className="font-heading text-xs tracking-widest uppercase mb-6" style={{ color: '#C2A878' }}>Why This Matters</p>
                  <div className="space-y-4 leading-relaxed mb-10">
                    <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>Most brands drift within six to twelve months of launch. Not because the strategy was wrong — but because there was no one keeping watch. Execution without ongoing oversight becomes inconsistent. Messaging fragments. The heart of the brand gets buried under urgency and output.</p>
                    <p className="font-display italic text-center" style={{ color: 'rgba(194,168,120,0.85)', fontSize: '0.8rem' }}>"Let us not grow weary in doing good, for in due season we will reap,<br />if we do not give up." — Galatians 6:9</p>
                    <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>Governance is not maintenance. It is mastery maintained. The Serino Retainer keeps your brand in alignment through every season of growth — protecting what was built, directing what comes next, and ensuring that every decision made in the marketplace is rooted in your original vision and values.</p>
                  <p className="font-display italic text-center" style={{ color: 'rgba(194,168,120,0.85)', fontSize: '0.8rem' }}>"Where there is no guidance, a people falls, but in an abundance of counselors<br />there is safety." — Proverbs 11:14</p>
                  <p className="font-body text-roma-cream/70" style={{ fontSize: '0.875rem' }}>The brands that endure are not the ones that launched loudest. They are the ones that stayed true the longest. Serino Consulting exists to be that voice in the room — the one that keeps the standard high, the direction clear, and the brand worth believing in.</p>
                </div>
                  <div className="flex items-center gap-6 flex-wrap mt-2">
                    <button onClick={() => setRetainerView('deliverable')} className="font-heading text-xs tracking-widest uppercase" style={{ color: '#C2A878', letterSpacing: '0.1em' }} onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }} onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>← Back to Deliverables</button>
                    <a
                      href="https://calendly.com/serinoconsulting/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200"
                      style={{ backgroundColor: '#7a3825', color: '#F4F0EA' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#964830')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#7a3825')}
                    >
                      Book Now →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
