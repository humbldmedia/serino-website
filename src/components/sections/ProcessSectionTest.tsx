import { useEffect, useRef, useState } from 'react'

const GOLD     = '#C2A878'
const GOLD_DIM = 'rgba(194,168,120,0.25)'
const GOLD_SUB = 'rgba(194,168,120,0.5)'
const CREAM    = '#F4F0EA'
const CREAM_DIM= 'rgba(244,240,234,0.65)'
const CARD_BG  = 'rgba(14,14,14,0.97)'
const CARD_ACC = 'rgba(194,168,120,0.07)'

const CAROUSEL_CARDS = [
  { num: '01', title: 'BRAND DEVELOPMENT',    body: 'We craft your complete brand bible with careful interpretation and precision.' },
  { num: '02', title: 'MARKETING STRATEGY',   body: 'We map your exact marketing strategy fit for your specific industry.' },
  { num: '03', title: 'CREATIVE DIRECTION',   body: 'We think from a consumer standpoint and give direction throughout the whole process from development to execution.' },
  { num: '04', title: 'PROJECT ARCHITECTURE', body: 'We architect your exact plan for sustainable growth.' },
]

interface CardCh     { id:string; type:'card';     title:string; subtitle?:string; label?:string; accent?:boolean; learnMore?:boolean }
interface CarouselCh { id:string; type:'carousel' }
interface SplitCh    { id:string; type:'split';    left:{title:string;sub:string}; right:{title:string;sub:string} }
interface FinalCh    { id:string; type:'final';    title:string }
type Chapter = CardCh | CarouselCh | SplitCh | FinalCh

const CHAPTERS: Chapter[] = [
  { id:'client',   type:'card',     label:'The Journey Begins', title:'CLIENT',                     subtitle:'"We have a need"' },
  { id:'serino',   type:'card',     label:'Strategy',           title:'SERINO CONSULTING',           subtitle:'"This is what you need"',             accent:true  },
  { id:'del1',     type:'card',     label:'Foundation',         title:'DELIVERABLE ITEM #1',         subtitle:'The Serino Brand Foundation',         learnMore:true },
  { id:'carousel', type:'carousel' },
  { id:'ship1',    type:'card',     label:'Delivered',          title:'DELIVERABLE ITEM #1 SHIPPED', subtitle:'Assessment & Review'                               },
  { id:'review',   type:'card',     label:'Alignment',          title:'REVIEW CALL',                 subtitle:"Client: \"Wow!\" · Serino: \"Yes! Now let's execute.\"", accent:true },
  { id:'del2',     type:'card',     label:'Content Engine',     title:'DELIVERABLE ITEM #2',         subtitle:'The Serino Content Engine',           learnMore:true },
  { id:'exec',     type:'split',    left:{title:'HUMBLD MEDIA', sub:'Our production agency partner'}, right:{title:'YOUR COMPANY', sub:'Your in-house marketing team'} },
  { id:'oversees', type:'card',     label:'Oversight',          title:'SERINO CONSULTING OVERSEES',  subtitle:'Quality, Consistency, Brand Alignment, Approvals', accent:true },
  { id:'ship2',    type:'card',     label:'Delivered',          title:'DELIVERABLE ITEM #2 SHIPPED', subtitle:'The Serino Content Engine'                         },
  { id:'ongoing',  type:'final',    title:'ONGOING GOVERNANCE & GROWTH'                                                                                             },
]

const N          = CHAPTERS.length
const PERSP      = 1100   // CSS perspective, px
const STEP_Z     = 560    // 3D z-gap between chapters, px
const PX_PER_STEP= 360    // scroll px per chapter step
const TOTAL_SCROLL = (N - 1) * PX_PER_STEP

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }

// Opacity for a card whose effective Z from camera is relZ
// relZ > 0  = card is "in front of" camera origin (recently passed)
// relZ < 0  = card is behind camera origin (not yet reached)
function cardOpacity(relZ: number): number {
  if (relZ > 60)  return Math.max(0, 1 - (relZ - 60) / 140) // receding: fade quickly
  if (relZ >= -STEP_Z) return 0.07 + 0.93 * clamp(1 + relZ / STEP_Z, 0, 1) // approaching
  if (relZ >= -STEP_Z * 1.6) return clamp((relZ + STEP_Z * 1.6) / (STEP_Z * 0.6) * 0.07, 0, 0.07)
  return 0
}

// ─── Chapter content ─────────────────────────────────────────────────────────
function ChapterContent({ ch }: { ch: Chapter }) {
  if (ch.type === 'card') {
    const accent = ch.accent
    return (
      <div style={{
        width: 'min(520px,88vw)',
        backgroundColor: accent ? CARD_ACC : CARD_BG,
        border: `1px solid ${accent ? 'rgba(194,168,120,0.55)' : GOLD_DIM}`,
        padding: 'clamp(2rem,5vw,3rem) clamp(1.5rem,5vw,2.5rem)',
        textAlign: 'center',
        boxShadow: '0 40px 120px rgba(0,0,0,0.9)',
      }}>
        {ch.label && (
          <p style={{ fontFamily:'Cormorant Garamond,serif', letterSpacing:'0.22em', fontSize:'0.65rem', color:GOLD_SUB, textTransform:'uppercase', marginBottom:'1.1rem' }}>
            {ch.label}
          </p>
        )}
        <h3 style={{ fontFamily:'Cormorant Garamond,serif', letterSpacing:'0.15em', fontSize:'clamp(1.05rem,3vw,1.35rem)', color: accent ? GOLD : CREAM, fontWeight:500, marginBottom: ch.subtitle ? '0.75rem' : 0 }}>
          {ch.title}
        </h3>
        {ch.subtitle && (
          <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', fontSize:'clamp(0.95rem,2.5vw,1.15rem)', color:CREAM_DIM, lineHeight:1.55 }}>
            {ch.subtitle}
          </p>
        )}
        {ch.learnMore && (
          <button style={{ marginTop:'1.75rem', fontFamily:'Cormorant Garamond,serif', letterSpacing:'0.15em', fontSize:'0.72rem', textTransform:'uppercase', color:GOLD, border:`1px solid ${GOLD_DIM}`, padding:'0.55rem 1.5rem', background:'transparent', cursor:'pointer' }}>
            Learn More →
          </button>
        )}
      </div>
    )
  }

  if (ch.type === 'carousel') {
    const POSITIONS = [
      { tx:'0%',   tz:'0px',    ry:'0deg',   sc:1,    op:1,    blur:0 },
      { tx:'72%',  tz:'-160px', ry:'-44deg', sc:0.82, op:0.5,  blur:1 },
      { tx:'0%',   tz:'-340px', ry:'0deg',   sc:0.65, op:0.12, blur:3 },
      { tx:'-72%', tz:'-160px', ry:'44deg',  sc:0.82, op:0.5,  blur:1 },
    ]
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <p style={{ fontFamily:'Cormorant Garamond,serif', letterSpacing:'0.22em', fontSize:'0.65rem', color:GOLD_SUB, textTransform:'uppercase', marginBottom:'2.5rem' }}>
          Inside the Foundation
        </p>
        <div style={{ position:'relative', width:'min(420px,88vw)', height:'clamp(180px,28vw,240px)', perspective:'900px', perspectiveOrigin:'50% 50%' }}>
          <div style={{ position:'relative', width:'100%', height:'100%', transformStyle:'preserve-3d' }}>
            {CAROUSEL_CARDS.map((card, i) => {
              const pos     = POSITIONS[i]
              const isFront = i === 0
              return (
                <div key={card.title} style={{
                  position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
                  transform:`translateX(${pos.tx}) translateZ(${pos.tz}) rotateY(${pos.ry}) scale(${pos.sc})`,
                  opacity:pos.op, filter: pos.blur > 0 ? `blur(${pos.blur}px)` : 'none',
                }}>
                  <div style={{
                    width:'100%', height:'100%',
                    backgroundColor: isFront ? CARD_ACC : CARD_BG,
                    border:`1px solid ${isFront ? 'rgba(194,168,120,0.55)' : GOLD_DIM}`,
                    padding:'clamp(1.25rem,3vw,1.75rem)',
                    display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center', gap:'0.6rem',
                  }}>
                    <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(1.5rem,4vw,2rem)', color:'rgba(194,168,120,0.18)', lineHeight:1 }}>{card.num}</p>
                    <h3 style={{ fontFamily:'Cormorant Garamond,serif', letterSpacing:'0.14em', fontSize:'clamp(0.78rem,2.2vw,0.98rem)', color: isFront ? GOLD : CREAM, fontWeight:500 }}>{card.title}</h3>
                    {isFront && <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', fontSize:'clamp(0.82rem,2vw,0.95rem)', color:CREAM_DIM, lineHeight:1.5 }}>{card.body}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (ch.type === 'split') {
    return (
      <div style={{ display:'flex', gap:'clamp(1rem,3vw,1.75rem)', width:'min(560px,90vw)' }}>
        {[ch.left, ch.right].map((side, i) => (
          <div key={i} style={{
            flex:1, backgroundColor:CARD_BG, border:`1px solid ${GOLD_DIM}`,
            padding:'clamp(1.5rem,4vw,2rem) clamp(1rem,3vw,1.5rem)', textAlign:'center',
            transform:`perspective(900px) rotateY(${i === 0 ? '4deg' : '-4deg'}) rotateX(2deg)`,
            boxShadow:'0 20px 60px rgba(0,0,0,0.65)',
          }}>
            <h4 style={{ fontFamily:'Cormorant Garamond,serif', letterSpacing:'0.14em', fontSize:'clamp(0.82rem,2.5vw,0.98rem)', color:GOLD, marginBottom:'0.6rem', fontWeight:500 }}>{side.title}</h4>
            <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', fontSize:'clamp(0.8rem,2vw,0.9rem)', color:CREAM_DIM }}>{side.sub}</p>
          </div>
        ))}
      </div>
    )
  }

  if (ch.type === 'final') {
    return (
      <div style={{ textAlign:'center' }}>
        <div style={{ width:'32px', height:'1px', backgroundColor:GOLD, margin:'0 auto 1.5rem' }} />
        <h2 style={{ fontFamily:'Cormorant Garamond,serif', letterSpacing:'0.12em', fontSize:'clamp(0.8rem,2.5vw,1.1rem)', color:GOLD, fontWeight:400, maxWidth:'min(480px,80vw)', margin:'0 auto' }}>
          {ch.title}
        </h2>
        <div style={{ width:'32px', height:'1px', backgroundColor:GOLD, margin:'1.5rem auto 0' }} />
      </div>
    )
  }

  return null
}

// ─── Depth Spine ──────────────────────────────────────────────────────────────
// Nodes are laid out vertically with spacing that compresses toward the extremes,
// mimicking a perspective rail receding above and below the active node.
function DepthSpine({ scrollY }: { scrollY: number }) {
  const currentStep = scrollY / PX_PER_STEP   // 0 → N-1, fractional
  const SPACING     = 22                       // px between adjacent nodes at center

  return (
    <div style={{
      position: 'absolute',
      left:     'clamp(1.25rem,3.5vw,2.5rem)',
      top: 0, bottom: 0,
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      zIndex: 20,
      pointerEvents: 'none',
    }}>
      {/* Background rail */}
      <div style={{ position:'absolute', top:'8%', bottom:'8%', width:'1px', backgroundColor:'rgba(194,168,120,0.08)' }} />

      {CHAPTERS.map((ch, i) => {
        const dist   = i - currentStep
        // Compress spacing as nodes get farther from active
        const sign   = dist >= 0 ? 1 : -1
        const absDist= Math.abs(dist)
        // Cumulative compressed offset: nodes get closer together farther away
        let yOffset  = 0
        for (let d = 0; d < absDist; d++) {
          yOffset += SPACING / (1 + d * 0.28)
        }
        // Fractional part of dist (sub-step interpolation)
        const frac   = absDist - Math.floor(absDist)
        const lastStep = SPACING / (1 + Math.floor(absDist) * 0.28)
        yOffset      = (yOffset - lastStep + lastStep * frac) * sign

        const isActive = Math.round(currentStep) === i
        const isPast   = i < currentStep
        const opacity  = Math.max(0, 1 - absDist * 0.22)
        const dotSize  = isActive ? 8 : Math.max(3, 5 - absDist * 0.5)

        return (
          <div key={ch.id} style={{
            position:  'absolute',
            top:       '50%',
            left:      '50%',
            transform: `translate(-50%, calc(-50% + ${yOffset}px))`,
            opacity,
            display:   'flex',
            alignItems:'center',
          }}>
            <div style={{
              width:           `${dotSize}px`,
              height:          `${dotSize}px`,
              borderRadius:    '50%',
              backgroundColor: isPast || isActive ? GOLD : 'rgba(194,168,120,0.22)',
              boxShadow:       isActive ? '0 0 14px rgba(194,168,120,0.75)' : 'none',
              transition:      'width 0.15s, height 0.15s, background-color 0.15s, box-shadow 0.15s',
            }} />
          </div>
        )
      })}

      {/* Gold fill: from top to active node */}
      <div style={{
        position:        'absolute',
        top:             '8%',
        width:           '1px',
        height:          `${clamp((currentStep / (N - 1)) * 84, 0, 84)}%`,
        backgroundColor: GOLD,
        transition:      'height 0.08s linear',
      }} />
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function ProcessSectionTest() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY]   = useState(0)
  const [active,  setActive]    = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return
      const scrolled = -wrapperRef.current.getBoundingClientRect().top

      if (scrolled < -80 || scrolled > TOTAL_SCROLL + window.innerHeight * 0.6) {
        setActive(s => s ? false : s)
        return
      }

      setActive(true)
      setScrollY(clamp(scrolled, 0, TOTAL_SCROLL))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Camera position in 3D: cameraZ = scrollY scaled to Z-space
  const cameraZ   = (scrollY / PX_PER_STEP) * STEP_Z
  // Track whichever chapter is closest to Z=0 (the camera focal point)
  const activeIdx = clamp(Math.round(cameraZ / STEP_Z), 0, N - 1)

  return (
    <section id="process-test" style={{ backgroundColor:'#0D0D0D' }}>

      {/* Entry label above the scroll zone */}
      <div style={{ textAlign:'center', padding:'4rem 0 0' }}>
        <span style={{ fontFamily:'Cormorant Garamond,serif', letterSpacing:'0.22em', fontSize:'0.72rem', textTransform:'uppercase', color:GOLD_SUB }}>
          The Process
        </span>
      </div>

      {/* Tall spacer — creates the scroll distance */}
      <div ref={wrapperRef} style={{ height:`calc(${TOTAL_SCROLL}px + 100vh)` }} />

      {/* ── Fixed 3D scene ── */}
      <div style={{
        position:    'fixed',
        top: 0, left: 0, right: 0,
        height:      '100vh',
        backgroundColor: '#0D0D0D',
        zIndex:      30,
        opacity:     active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        transition:  'opacity 0.25s ease',
        overflow:    'hidden',
        // Perspective established here for all 3D children
        perspective: `${PERSP}px`,
        perspectiveOrigin: '50% 50%',
      }}>

        {/* Atmospheric vignette */}
        <div style={{
          position:   'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 65% 65% at 50% 50%, transparent 20%, rgba(0,0,0,0.65) 100%)',
        }} />

        {/* Subtle receding tunnel outlines */}
        <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
          {([0.12, 0.22, 0.34] as const).map((f, i) => (
            <div key={i} style={{
              position:'absolute',
              top:`${50 - f * 50}%`, left:`${50 - f * 50}%`,
              right:`${50 - f * 50}%`, bottom:`${50 - f * 50}%`,
              border:`1px solid rgba(194,168,120,${0.05 - i * 0.015})`,
              borderRadius:'1px',
            }} />
          ))}
        </div>

        {/* ── 3D world — moves along Z as camera advances ── */}
        <div style={{
          position:       'absolute', inset: 0,
          transformStyle: 'preserve-3d',
          transform:      `translateZ(${cameraZ}px)`,
        }}>
          {CHAPTERS.map((ch, i) => {
            // Effective Z from camera's perspective origin
            const relZ    = (-i * STEP_Z) + cameraZ
            const opacity = cardOpacity(relZ)
            if (opacity <= 0) return null

            return (
              <div
                key={ch.id}
                style={{
                  position:  'absolute', inset: 0,
                  transform: `translateZ(${-i * STEP_Z}px)`,
                  display:   'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {/* opacity on inner wrapper so it doesn't break preserve-3d on parent */}
                <div style={{ opacity, willChange: 'opacity' }}>
                  <ChapterContent ch={ch} />
                </div>
              </div>
            )
          })}
        </div>

        {/* ── 2D overlays ── */}
        <DepthSpine scrollY={scrollY} />

        {/* Step counter */}
        <div style={{ position:'absolute', bottom:'2rem', right:'clamp(1.25rem,3.5vw,2.5rem)', zIndex:20 }}>
          <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'0.72rem', letterSpacing:'0.15em', color:GOLD_SUB }}>
            {String(activeIdx + 1).padStart(2,'0')} / {String(N).padStart(2,'0')}
          </span>
        </div>

        {/* Scroll hint */}
        {activeIdx === 0 && scrollY < PX_PER_STEP * 0.3 && (
          <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', textAlign:'center', zIndex:20 }}>
            <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', fontSize:'0.82rem', color:'rgba(194,168,120,0.4)', letterSpacing:'0.1em', marginBottom:'0.4rem' }}>
              scroll to explore
            </p>
            <span style={{ fontSize:'0.7rem', color:'rgba(194,168,120,0.3)' }}>↓</span>
          </div>
        )}

      </div>
    </section>
  )
}
