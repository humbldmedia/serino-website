import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { supabase } from '../lib/supabase'

const TIMELINE_OPTIONS = [
  { value: 'immediate', label: 'Ready to move now' },
  { value: '1-3months', label: 'Next 1–3 months' },
  { value: 'exploring', label: 'Just exploring for now' },
]

export default function ContactPage() {
  const ref = useScrollReveal()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', situation: '', timeline: '' })
  const [timelineOpen, setTimelineOpen] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!timelineOpen) return
    const handleClick = (e: MouseEvent) => {
      if (timelineRef.current && !timelineRef.current.contains(e.target as Node)) {
        setTimelineOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [timelineOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    const { error } = await supabase.from('contact_submissions').insert([form])
    if (error) {
      setStatus('error')
      return
    }
    // Send confirmation email — fire and forget, don't block navigation
    fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).catch(() => {})
    navigate('/thank-you')
  }

  const inputClass = `w-full bg-transparent border-b border-gold/30 py-3 font-body text-base text-roma-cream placeholder-roma-cream/30 focus:outline-none focus:border-gold transition-colors duration-200`

  return (
    <div className="min-h-screen bg-serino-black pt-32 pb-24">
      <hr className="gold-rule" />

      <div className="container-main" ref={ref}>
        <div className="max-w-xl mx-auto pt-16">
          <span className="section-label fade-up-visible">Get in Touch</span>

          <h1
            className="font-display text-4xl md:text-5xl text-roma-cream mb-4 leading-tight fade-up-visible"
            style={{ transitionDelay: '80ms' }}
          >
            Not ready for a call?<br />Tell us where you are.
          </h1>

          <p
            className="font-body text-lg text-roma-cream/50 mb-12 leading-relaxed fade-up-visible"
            style={{ transitionDelay: '160ms' }}
          >
            We read every message personally and follow up within 48 hours.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10 fade-up-visible" style={{ transitionDelay: '240ms' }}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="company"
                  placeholder="Business / Organization"
                  value={form.company}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <textarea
                  name="situation"
                  placeholder="What are you working on?"
                  required
                  rows={4}
                  value={form.situation}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div ref={timelineRef} className="relative">
                <button
                  type="button"
                  onClick={() => setTimelineOpen(o => !o)}
                  className="w-full text-left bg-transparent border-b border-gold/30 py-3 font-body text-base focus:outline-none focus:border-gold transition-colors duration-200 flex items-center justify-between"
                  style={{ color: form.timeline ? '#F4F0EA' : 'rgba(244,240,234,0.3)' }}
                >
                  <span>{form.timeline ? TIMELINE_OPTIONS.find(o => o.value === form.timeline)?.label : "What's your timeline?"}</span>
                  <svg
                    width="12" height="7" viewBox="0 0 12 7" fill="none"
                    style={{
                      color: '#C2A878',
                      transform: timelineOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms',
                      flexShrink: 0,
                    }}
                  >
                    <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {timelineOpen && (
                  <div
                    className="absolute left-0 right-0 z-50 mt-1"
                    style={{ backgroundColor: '#111111', border: '1px solid rgba(194,168,120,0.25)' }}
                  >
                    {TIMELINE_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setForm(f => ({ ...f, timeline: opt.value }))
                          setTimelineOpen(false)
                        }}
                        className="w-full text-left px-4 py-3 font-body text-base transition-colors duration-150"
                        style={{
                          color: form.timeline === opt.value ? '#C2A878' : 'rgba(244,240,234,0.7)',
                          backgroundColor: 'transparent',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(194,168,120,0.08)'; e.currentTarget.style.color = '#C2A878' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = form.timeline === opt.value ? '#C2A878' : 'rgba(244,240,234,0.7)' }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {status === 'error' && (
                <p className="font-body text-sm text-red-400/80">Something went wrong. Try emailing us directly at strategy@serinoconsulting.com.</p>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="font-heading text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200 disabled:opacity-50"
                  style={{ backgroundColor: '#7a3825', color: '#F4F0EA' }}
                  onMouseEnter={(e) => { if (status !== 'submitting') e.currentTarget.style.backgroundColor = '#964830' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#7a3825' }}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message →'}
                </button>

                <span className="font-body text-sm text-roma-cream/30">or</span>

                <a
                  href="https://wellbooked.net/book/serinoconsulting/acquisition-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xs tracking-widest uppercase border border-gold text-gold px-6 py-3 transition-all duration-200"
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#7a3825'; e.currentTarget.style.color = '#F4F0EA'; e.currentTarget.style.borderColor = '#7a3825' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C2A878'; e.currentTarget.style.borderColor = '#C2A878' }}
                >
                  Book a Call
                </a>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}
