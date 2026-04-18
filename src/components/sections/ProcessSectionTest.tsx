import { useEffect, useRef, useState } from 'react'

// ─── Palette ─────────────────────────────────────────────────────────────────
const GOLD     = '#C2A878'
const GOLD_DIM = 'rgba(194,168,120,0.25)'
const GOLD_SUB = 'rgba(194,168,120,0.5)'
const CREAM    = '#F4F0EA'
const CREAM_DIM= 'rgba(244,240,234,0.65)'
const CARD_BG  = 'rgba(14,14,14,0.97)'
const CARD_ACC = 'rgba(194,168,120,0.07)'

// ─── Carousel cards ──────────────────────────────────────────────────────────
const CAROUSEL_CARDS = [
  { num: '01', title: 'BRAND DEVELOPMENT',    body: 'We craft your complete brand bible with careful interpretation and precision.' },
  { num: '02', title: 'MARKETING STRATEGY',   body: 'We map your exact marketing strategy fit for your specific industry.' },
  { num: '03', title: 'CREATIVE DIRECTION',   body: 'We think from a consumer standpoint and give direction throughout the whole process from development to execution.' },
  { num: '04', title: 'PROJECT ARCHITECTURE', body: 'We architect your exact plan for sustainable growth.' },
]

// ─── Chapter types ───────────────────────────────────────────────────────────
interface CardCh     { id:string; type:'card';     title:string; subtitle?:string; label?:string; accent?:boolean; learnMore?:boolean; units:number }
interface CarouselCh { id:string; type:'carousel'; units:number }
interface SplitCh    { id:string; type:'split';    left:{title:string;sub:string}; right:{title:string;sub:string}; units:number }
interface FinalCh    { id:string; type:'final';    title:string; units:number }
type Chapter = CardCh | CarouselCh | SplitCh | FinalCh

// ─── Chapter data ────────────────────────────────────────────────────────────
const CHAPTERS: Chapter[] = [
  { id:'client',   type:'card',     label:'The Journey Begins', title:'CLIENT',                     subtitle:'"We have a need"',                                              units:1   },
  { id:'serino',   type:'card',     label:'Strategy',           title:'SERINO CONSULTING',           subtitle:'"This is what you need"',             accent:true,             units:1   },
  { id:'del1',     type:'card',     label:'Foundation',         title:'DELIVERABLE ITEM #1',         subtitle:'The Serino Brand Foundation',         learnMore:true,          units:1.5 },
  { id:'carousel', type:'carousel',                                                                                                                                            units:4   },
  { id:'ship1',    type:'card',     label:'Delivered',          title:'DELIVERABLE ITEM #1 SHIPPED', subtitle:'Assessment & Review',                                          units:1   },
  { id:'review',   type:'card',     label:'Alignment',          title:'REVIEW CALL',                 subtitle:"Client: \"Wow!\" · Serino: \"Yes! Now let's execute.\"", accent:true, units:1 },
  { id:'del2',     type:'card',     label:'Content Engine',     title:'DELIVERABLE ITEM #2',         subtitle:'The Serino Content Engine',           learnMore:true,          units:1.5 },
  { id:'exec',     type:'split',    left:{title:'HUMBLD MEDIA', sub:'Our production agency partner'}, right:{title:'YOUR COMPANY', sub:'Your in-house marketing team'}, units:1 },
  { id:'oversees', type:'card',     label:'Oversight',          title:'SERINO CONSULTING OVERSEES',  subtitle:'Quality, Consistency, Brand Alignment, Approvals', accent:true, units:1 },
  { id:'ship2',    type:'card',     label:'Delivered',          title:'DELIVERABLE ITEM #2 SHIPPED', subtitle:'The Serino Content Engine',                                    units:1   },
  { id:'ongoing',  type:'final',    title:'ONGOING GOVERNANCE & GROWTH',                                                                                                      units:2   },
]

// ─── Scroll geometry ─────────────────────────────────────────────────────────
const UNIT_PX  = 280
const CH_STARTS: number[] = (() => {
  const s: number[] = []; let cum = 0
  CHAPTERS.forEach(ch => { s.push(cum); cum += ch.units * UNIT_PX })
  return s
})()
const TOTAL_PX = CHAPTERS.reduce((s, c) => s + c.units * UNIT_PX, 0)

// ─── Animation helpers ───────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t))
const ease  = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

/** Returns opacity, translateY, and scale for a card at scroll progress p (0→1). */
function cardVis(p: number, last = false): { opacity: number; y: number; scale: number } {
  const ENTER = 0.18
  const EXIT  = last ? 1.01 : 0.82
  if (p <= 0)   return { opacity: 0,            y: 48,              scale: 0.93 }
  if (p < ENTER){ const t = ease(p / ENTER);    return { opacity: t,      y: lerp(48, 0, t),   scale: lerp(0.93, 1, t) } }
  if (p < EXIT)  return { opacity: 1,            y: 0,               scale: 1 }
  const t = ease((p - EXIT) / (1 - EXIT))
  return { opacity: 1 - t, y: lerp(0, -36, t), scale: lerp(1, 0.96, t) }
}

// ─── NodeCard ────────────────────────────────────────────────────────────────
function NodeCard({ ch, progress, last }: { ch: CardCh; progress: number; last?: boolean }) {
  const { opacity, y, scale } = cardVis(progress, last)
  const accent = ch.accent

  return (
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity, pointerEvents: opacity < 0.05 ? 'none' : 'auto' }}>
      <div style={{
        width: 'min(520px, 88vw)',
        backgroundColor: accent ? CARD_ACC : CARD_BG,
        border: `1px solid ${accent ? 'rgba(194,168,120,0.55)' : GOLD_DIM}`,
        padding: 'clamp(2rem,5vw,3rem) clamp(1.5rem,5vw,2.5rem)',
        textAlign: 'center',
        transform: `perspective(1100px) rotateX(2deg) translateY(${y}px) scale(${scale})`,
        boxShadow: `0 ${Math.round(20 + 20 * opacity)}px ${Math.round(50 + 50 * opacity)}px rgba(0,0,0,0.75)`,
        willChange: 'transform, opacity',
      }}>
        {ch.label && (
          <p style={{ fontFamily:'Cormorant Garamond, serif', letterSpacing:'0.22em', fontSize:'0.65rem', color: GOLD_SUB, textTransform:'uppercase', marginBottom:'1.1rem' }}>
            {ch.label}
          </p>
        )}
        <h3 style={{ fontFamily:'Cormorant Garamond, serif', letterSpacing:'0.15em', fontSize:'clamp(1.05rem,3vw,1.35rem)', color: accent ? GOLD : CREAM, fontWeight:500, marginBottom: ch.subtitle ? '0.75rem' : 0 }}>
          {ch.title}
        </h3>
        {ch.subtitle && (
          <p style={{ fontFamily:'EB Garamond, serif', fontStyle:'italic', fontSize:'clamp(0.95rem,2.5vw,1.15rem)', color: CREAM_DIM, lineHeight:1.55 }}>
            {ch.subtitle}
          </p>
        )}
        {ch.learnMore && (
          <button style={{ marginTop:'1.75rem', fontFamily:'Cormorant Garamond, serif', letterSpacing:'0.15em', fontSize:'0.72rem', textTransform:'uppercase', color: GOLD, border:`1px solid ${GOLD_DIM}`, padding:'0.55rem 1.5rem', background:'transparent', cursor:'pointer' }}>
            Learn More →
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Carousel3D ──────────────────────────────────────────────────────────────
function Carousel3D({ progress }: { progress: number }) {
  const ENTER = 0.18, EXIT = 0.82
  let secOpacity = 1
  if (progress < ENTER) secOpacity = progress / ENTER
  else if (progress > EXIT) secOpacity = 1 - (progress - EXIT) / (1 - EXIT)

  const holdP    = Math.max(0, Math.min(1, (progress - ENTER) / (EXIT - ENTER)))
  const activeIdx = Math.min(3, Math.floor(holdP * 4))

  const POSITIONS = [
    { tx: '0%',    tz: '0px',    ry: '0deg',  sc: 1,    op: 1,   blur: 0 },
    { tx: '72%',   tz: '-160px', ry: '-44deg', sc: 0.82, op: 0.5, blur: 1 },
    { tx: '0%',    tz: '-340px', ry: '0deg',  sc: 0.65, op: 0.12, blur: 3 },
    { tx: '-72%',  tz: '-160px', ry: '44deg', sc: 0.82, op: 0.5, blur: 1 },
  ]

  return (
    <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity: secOpacity, pointerEvents: secOpacity < 0.05 ? 'none' : 'auto' }}>
      <p style={{ fontFamily:'Cormorant Garamond, serif', letterSpacing:'0.22em', fontSize:'0.65rem', color: GOLD_SUB, textTransform:'uppercase', marginBottom:'2.5rem' }}>
        Inside the Foundation
      </p>

      <div style={{ position:'relative', width:'min(420px,88vw)', height:'clamp(180px,28vw,240px)', perspective:'900px', perspectiveOrigin:'50% 50%' }}>
        <div style={{ position:'relative', width:'100%', height:'100%', transformStyle:'preserve-3d' }}>
          {CAROUSEL_CARDS.map((card, i) => {
            const offset = (i - activeIdx + 4) % 4
            const pos    = POSITIONS[offset]
            const isFront = offset === 0

            return (
              <div
                key={card.title}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: `translateX(${pos.tx}) translateZ(${pos.tz}) rotateY(${pos.ry}) scale(${pos.sc})`,
                  opacity: pos.op,
                  filter: pos.blur > 0 ? `blur(${pos.blur}px)` : 'none',
                  transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, filter 0.4s ease',
                  willChange: 'transform',
                }}
              >
                <div style={{
                  width: '100%', height: '100%',
                  backgroundColor: isFront ? CARD_ACC : CARD_BG,
                  border: `1px solid ${isFront ? 'rgba(194,168,120,0.55)' : GOLD_DIM}`,
                  padding: 'clamp(1.25rem,3vw,1.75rem)',
                  boxShadow: isFront ? `0 30px 80px rgba(0,0,0,0.8)` : '0 8px 24px rgba(0,0,0,0.5)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  textAlign: 'center', gap: '0.6rem',
                }}>
                  <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(1.5rem,4vw,2rem)', color:'rgba(194,168,120,0.18)', lineHeight:1 }}>
                    {card.num}
                  </p>
                  <h3 style={{ fontFamily:'Cormorant Garamond, serif', letterSpacing:'0.14em', fontSize:'clamp(0.78rem,2.2vw,0.98rem)', color: isFront ? GOLD : CREAM, fontWeight:500 }}>
                    {card.title}
                  </h3>
                  {isFront && (
                    <p style={{ fontFamily:'EB Garamond, serif', fontStyle:'italic', fontSize:'clamp(0.82rem,2vw,0.95rem)', color: CREAM_DIM, lineHeight:1.5 }}>
                      {card.body}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ display:'flex', gap:'0.5rem', marginTop:'2rem', alignItems:'center' }}>
        {CAROUSEL_CARDS.map((_, i) => (
          <div key={i} style={{
            width: i === activeIdx ? '22px' : '6px', height: '6px', borderRadius: '3px',
            backgroundColor: i === activeIdx ? GOLD : GOLD_DIM,
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── SplitNode ───────────────────────────────────────────────────────────────
function SplitNode({ ch, progress }: { ch: SplitCh; progress: number }) {
  const { opacity, y, scale } = cardVis(progress)
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity, pointerEvents: opacity < 0.05 ? 'none' : 'auto' }}>
      <div style={{ display:'flex', gap:'clamp(1rem,3vw,1.75rem)', width:'min(560px,90vw)', transform:`translateY(${y}px) scale(${scale})` }}>
        {[ch.left, ch.right].map((side, i) => (
          <div key={i} style={{
            flex:1, backgroundColor: CARD_BG,
            border: `1px solid ${GOLD_DIM}`, padding:'clamp(1.5rem,4vw,2rem) clamp(1rem,3vw,1.5rem)',
            textAlign:'center',
            transform: `perspective(900px) rotateY(${i === 0 ? '4deg' : '-4deg'}) rotateX(2deg)`,
            boxShadow: '0 20px 60px rgba(0,0,0,0.65)',
          }}>
            <h4 style={{ fontFamily:'Cormorant Garamond, serif', letterSpacing:'0.14em', fontSize:'clamp(0.82rem,2.5vw,0.98rem)', color: GOLD, marginBottom:'0.6rem', fontWeight:500 }}>
              {side.title}
            </h4>
            <p style={{ fontFamily:'EB Garamond, serif', fontStyle:'italic', fontSize:'clamp(0.8rem,2vw,0.9rem)', color: CREAM_DIM }}>
              {side.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FinalNode ───────────────────────────────────────────────────────────────
function FinalNode({ ch, progress }: { ch: FinalCh; progress: number }) {
  const { opacity, y, scale } = cardVis(progress, true)
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity, pointerEvents: opacity < 0.05 ? 'none' : 'auto' }}>
      <div style={{ textAlign:'center', transform:`translateY(${y}px) scale(${scale})` }}>
        <div style={{ width:'32px', height:'1px', backgroundColor: GOLD, margin:'0 auto 1.5rem' }} />
        <h2 style={{ fontFamily:'Cormorant Garamond, serif', letterSpacing:'0.12em', fontSize:'clamp(0.8rem,2.5vw,1.1rem)', color: GOLD, fontWeight:400, maxWidth:'min(480px,80vw)', margin:'0 auto', wordBreak:'break-word' }}>
          {ch.title}
        </h2>
        <div style={{ width:'32px', height:'1px', backgroundColor: GOLD, margin:'1.5rem auto 0' }} />
      </div>
    </div>
  )
}

// ─── SpineIndicator ──────────────────────────────────────────────────────────
function SpineIndicator({ idx, progress }: { idx: number; progress: number }) {
  const n      = CHAPTERS.length
  const filled = (idx + progress) / (n - 1)

  return (
    <div style={{ position:'absolute', left:'clamp(1.25rem,3.5vw,2.5rem)', top:'12%', bottom:'12%', display:'flex', flexDirection:'column', alignItems:'center', zIndex:20 }}>
      <div style={{ position:'absolute', top:0, bottom:0, width:'1px', backgroundColor:'rgba(194,168,120,0.12)' }} />
      <div style={{ position:'absolute', top:0, width:'1px', height:`${Math.min(100, filled * 100)}%`, backgroundColor: GOLD, transition:'height 0.08s linear' }} />
      {CHAPTERS.map((ch, i) => {
        const active = i === idx
        const past   = i < idx
        return (
          <div key={ch.id} style={{
            position:'absolute', top:`${(i / (n - 1)) * 100}%`,
            transform:'translate(-50%,-50%)',
            width:  active ? '9px' : '5px',
            height: active ? '9px' : '5px',
            borderRadius:'50%',
            backgroundColor: active || past ? GOLD : 'rgba(194,168,120,0.22)',
            boxShadow: active ? `0 0 10px rgba(194,168,120,0.6)` : 'none',
            transition:'all 0.35s ease',
            zIndex:2,
          }} />
        )
      })}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
// Note: position:sticky is broken when any ancestor has overflow-x:hidden (#root does).
// We use position:fixed + manual active tracking instead.
export default function ProcessSectionTest() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ idx: 0, progress: 0, active: false })

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return
      const scrolled = -wrapperRef.current.getBoundingClientRect().top

      if (scrolled < 0 || scrolled > TOTAL_PX) {
        setState(s => s.active ? { ...s, active: false } : s)
        return
      }

      let idx = CHAPTERS.length - 1, progress = 1
      for (let i = 0; i < CHAPTERS.length; i++) {
        const end = CH_STARTS[i] + CHAPTERS[i].units * UNIT_PX
        if (scrolled < end) {
          idx      = i
          progress = (scrolled - CH_STARTS[i]) / (CHAPTERS[i].units * UNIT_PX)
          break
        }
      }
      setState({ idx, progress, active: true })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const { idx, progress, active } = state

  return (
    <section id="process-test" style={{ backgroundColor: '#0D0D0D' }}>

      {/* Entry label — visible before the fixed overlay takes over */}
      <div style={{ textAlign:'center', padding:'4rem 0 0' }}>
        <span style={{ fontFamily:'Cormorant Garamond, serif', letterSpacing:'0.22em', fontSize:'0.72rem', textTransform:'uppercase', color: GOLD_SUB }}>
          Restoration Test
        </span>
      </div>

      {/* Tall div that creates the scroll space */}
      <div ref={wrapperRef} style={{ height:`calc(${TOTAL_PX}px + 100vh)` }} />

      {/* Fixed overlay — covers viewport while section is active */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '100vh',
        backgroundColor: '#0D0D0D',
        zIndex: 30,
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        transition: 'opacity 0.2s ease',
      }}>
        <SpineIndicator idx={idx} progress={progress} />

        {/* Chapter layers — offset below nav (80px) */}
        <div style={{ position:'absolute', top:'80px', left:0, right:0, bottom:0 }}>
          {CHAPTERS.map((ch, i) => {
            if (Math.abs(i - idx) > 1) return null

            let p: number
            if (i === idx)       p = progress
            else if (i === idx + 1) p = Math.max(0, progress - 0.82)
            else                 p = 1

            const isLast = i === CHAPTERS.length - 1

            if (ch.type === 'card')     return <NodeCard    key={ch.id} ch={ch} progress={p} last={isLast} />
            if (ch.type === 'carousel') return <Carousel3D  key={ch.id}         progress={p} />
            if (ch.type === 'split')    return <SplitNode   key={ch.id} ch={ch} progress={p} />
            if (ch.type === 'final')    return <FinalNode   key={ch.id} ch={ch} progress={p} />
            return null
          })}
        </div>

        {/* Step counter */}
        <div style={{ position:'absolute', bottom:'2rem', right:'clamp(1.25rem,3.5vw,2.5rem)', textAlign:'right', zIndex:20 }}>
          <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'0.72rem', letterSpacing:'0.15em', color: GOLD_SUB }}>
            {String(idx + 1).padStart(2,'0')} / {String(CHAPTERS.length).padStart(2,'0')}
          </span>
        </div>

        {/* Scroll hint */}
        {idx === 0 && (
          <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', textAlign:'center', opacity: Math.max(0, 1 - progress / 0.25), transition:'opacity 0.1s', zIndex:20 }}>
            <p style={{ fontFamily:'EB Garamond, serif', fontStyle:'italic', fontSize:'0.82rem', color:'rgba(194,168,120,0.4)', letterSpacing:'0.1em', marginBottom:'0.4rem' }}>
              scroll to explore
            </p>
            <span style={{ fontSize:'0.7rem', color:'rgba(194,168,120,0.3)' }}>↓</span>
          </div>
        )}
      </div>

    </section>
  )
}
