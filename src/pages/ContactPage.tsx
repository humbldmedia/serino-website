import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { supabase } from '../lib/supabase'

export default function ContactPage() {
  const ref = useScrollReveal()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', situation: '', timeline: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    const { error } = await supabase.from('contact_submissions').insert([form])
    setStatus(error ? 'error' : 'success')
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

          {status === 'success' ? (
            <div className="fade-up-visible text-center py-16">
              <p className="font-display text-2xl text-roma-cream mb-4">We received your message.</p>
              <p className="font-body text-roma-cream/50 mb-10">Expect a personal response within 48 hours.</p>
              <Link
                to="/"
                className="font-heading text-xs tracking-widest uppercase text-gold hover:text-roma-cream transition-colors"
              >
                ← Back to home
              </Link>
            </div>
          ) : (
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
              <div>
                <select
                  name="timeline"
                  required
                  value={form.timeline}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                  style={{ appearance: 'none' }}
                >
                  <option value="" disabled>What's your timeline?</option>
                  <option value="immediate">Ready to move now</option>
                  <option value="1-3months">Next 1–3 months</option>
                  <option value="exploring">Just exploring for now</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="font-body text-sm text-red-400/80">Something went wrong. Try emailing us directly at hello@serinoconsulting.com.</p>
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
                  href="https://calendly.com/serinoconsulting/30min"
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
          )}
        </div>
      </div>
    </div>
  )
}
