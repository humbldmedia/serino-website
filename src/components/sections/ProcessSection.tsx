import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function ProcessSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="process"
      className="py-28 md:py-36"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="container-main" ref={ref}>
        <span className="section-label fade-up-visible">The Process</span>

        <div className="max-w-3xl mx-auto mt-8 fade-up-visible" style={{ transitionDelay: '80ms' }}>
          {/* SVG Flowchart */}
          <svg
            viewBox="0 0 600 820"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            aria-label="Serino Consulting Process Flowchart"
          >
            {/* Lines */}
            {/* CLIENT NEEDS → SERINO */}
            <line x1="300" y1="60" x2="300" y2="110" stroke="#C2A878" strokeWidth="1" />
            {/* SERINO → Brand / Creative / Project */}
            <line x1="300" y1="170" x2="120" y2="230" stroke="#C2A878" strokeWidth="1" />
            <line x1="300" y1="170" x2="300" y2="230" stroke="#C2A878" strokeWidth="1" />
            <line x1="300" y1="170" x2="480" y2="230" stroke="#C2A878" strokeWidth="1" />
            {/* converge → STRATEGIC PRODUCTION */}
            <line x1="120" y1="280" x2="300" y2="340" stroke="#C2A878" strokeWidth="1" />
            <line x1="300" y1="280" x2="300" y2="340" stroke="#C2A878" strokeWidth="1" />
            <line x1="480" y1="280" x2="300" y2="340" stroke="#C2A878" strokeWidth="1" />
            {/* → DECISION */}
            <line x1="300" y1="400" x2="300" y2="450" stroke="#C2A878" strokeWidth="1" />
            {/* DECISION → HUMBLD / OUTSIDE */}
            <line x1="300" y1="490" x2="150" y2="550" stroke="#C2A878" strokeWidth="1" />
            <line x1="300" y1="490" x2="450" y2="550" stroke="#C2A878" strokeWidth="1" />
            {/* converge → SERINO OVERSEES */}
            <line x1="150" y1="590" x2="300" y2="650" stroke="#C2A878" strokeWidth="1" />
            <line x1="450" y1="590" x2="300" y2="650" stroke="#C2A878" strokeWidth="1" />
            {/* → DELIVERABLES */}
            <line x1="300" y1="710" x2="300" y2="750" stroke="#C2A878" strokeWidth="1" />
            {/* → ONGOING */}
            <line x1="300" y1="780" x2="300" y2="810" stroke="#C2A878" strokeWidth="1" />

            {/* NODE: CLIENT NEEDS */}
            <rect x="180" y="10" width="240" height="50" rx="0" stroke="#C2A878" strokeWidth="1" fill="transparent" />
            <text x="300" y="30" textAnchor="middle" fill="#F4F0EA" fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2">CLIENT NEEDS</text>
            <text x="300" y="48" textAnchor="middle" fill="#C2A878" fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic">"We need branding / content"</text>

            {/* NODE: SERINO */}
            <rect x="190" y="110" width="220" height="60" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity="0.08" />
            <text x="300" y="134" textAnchor="middle" fill="#C2A878" fontSize="13" fontFamily="Cormorant Garamond, serif" letterSpacing="2" fontWeight="500">SERINO CONSULTING</text>
            <text x="300" y="154" textAnchor="middle" fill="#F4F0EA" fontSize="11" fontFamily="EB Garamond, serif" fontStyle="italic">The Brain</text>

            {/* NODES: Brand / Creative / Project */}
            <text x="100" y="262" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5">BRAND</text>
            <text x="100" y="276" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5">STRATEGY</text>
            <text x="300" y="262" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5">CREATIVE</text>
            <text x="300" y="276" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5">DIRECTION</text>
            <text x="490" y="262" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5">PROJECT</text>
            <text x="490" y="276" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5">ARCHITECTURE</text>

            {/* NODE: STRATEGIC PRODUCTION PLAN */}
            <rect x="150" y="340" width="300" height="60" rx="0" stroke="#C2A878" strokeWidth="1" fill="#C2A878" fillOpacity="0.06" />
            <text x="300" y="363" textAnchor="middle" fill="#C2A878" fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2">STRATEGIC PRODUCTION PLAN</text>
            <text x="300" y="381" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic">The Master Plan for Execution</text>

            {/* NODE: DECISION */}
            <rect x="210" y="450" width="180" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="transparent" />
            <text x="300" y="468" textAnchor="middle" fill="#F4F0EA" fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2">DECISION</text>
            <text x="300" y="482" textAnchor="middle" fill="#F4F0EA/60" fill-opacity="0.6" fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic">Who executes?</text>

            {/* NODES: HUMBLD / OUTSIDE */}
            <rect x="60" y="550" width="160" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="transparent" />
            <text x="140" y="567" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5">HUMBLD MEDIA</text>
            <text x="140" y="581" textAnchor="middle" fill="#F4F0EA" fontSize="9" fontFamily="EB Garamond, serif" fontStyle="italic">(In-House)</text>

            <rect x="380" y="550" width="160" height="40" rx="0" stroke="#C2A878" strokeWidth="1" fill="transparent" />
            <text x="460" y="567" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="Cormorant Garamond, serif" letterSpacing="1.5">OUTSIDE TEAM</text>
            <text x="460" y="581" textAnchor="middle" fill="#F4F0EA" fontSize="9" fontFamily="EB Garamond, serif" fontStyle="italic">(Specialized)</text>

            {/* NODE: SERINO OVERSEES */}
            <rect x="150" y="650" width="300" height="60" rx="0" stroke="#C2A878" strokeWidth="1.5" fill="#C2A878" fillOpacity="0.08" />
            <text x="300" y="673" textAnchor="middle" fill="#C2A878" fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2">SERINO CONSULTING OVERSEES</text>
            <text x="300" y="691" textAnchor="middle" fill="#F4F0EA" fontSize="10" fontFamily="EB Garamond, serif" fontStyle="italic">Quality, Brand Alignment, Approvals</text>

            {/* NODE: DELIVERABLES */}
            <text x="300" y="765" textAnchor="middle" fill="#F4F0EA" fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2">DELIVERABLES</text>

            {/* NODE: ONGOING */}
            <text x="300" y="818" textAnchor="middle" fill="#C2A878" fontSize="11" fontFamily="Cormorant Garamond, serif" letterSpacing="2">ONGOING CONSULTING & GROWTH</text>

            {/* Dots at nodes */}
            <circle cx="300" cy="110" r="3" fill="#C2A878" />
            <circle cx="300" cy="340" r="3" fill="#C2A878" />
            <circle cx="300" cy="450" r="3" fill="#C2A878" />
            <circle cx="300" cy="650" r="3" fill="#C2A878" />
            <circle cx="300" cy="750" r="3" fill="#C2A878" />
          </svg>
        </div>
      </div>
    </section>
  )
}
