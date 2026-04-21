import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mobileLinks = [
    { label: 'Our Motive', href: '#process-intro' },
    { label: 'The Process', href: '#process' },
    { label: 'Our Team', href: '#team' },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? '#0D0D0D' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(194,168,120,0.15)' : 'none',
        }}
      >
        <div className="container-main flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Serino Consulting">
            <img
              src="/assets/logos/black_w_quill.png"
              alt="Serino Consulting"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://calendly.com/serinoconsulting/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xs tracking-widest uppercase border border-gold text-gold px-5 py-2.5 transition-all duration-200"
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#7a3825'; e.currentTarget.style.color = '#F4F0EA'; e.currentTarget.style.borderColor = '#7a3825' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C2A878'; e.currentTarget.style.borderColor = '#C2A878' }}
            >
              Book a Call
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px bg-roma-cream transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none' }}
            />
            <span
              className="block w-6 h-px bg-roma-cream transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-px bg-roma-cream transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 bg-serino-black flex flex-col items-center justify-center transition-all duration-500"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        <div className="flex flex-col items-center gap-10">
          {mobileLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl text-roma-cream hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://calendly.com/serinoconsulting/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 font-heading text-sm tracking-widest uppercase border border-gold text-gold px-8 py-3 transition-all duration-200"
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#7a3825'; e.currentTarget.style.color = '#F4F0EA'; e.currentTarget.style.borderColor = '#7a3825' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C2A878'; e.currentTarget.style.borderColor = '#C2A878' }}
          >
            Book a Call
          </a>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="font-heading text-sm tracking-widest uppercase text-roma-cream/50 hover:text-gold transition-colors duration-200"
          >
            Contact
          </Link>
          <div className="flex items-center gap-6 mt-4">
            <a href="https://www.instagram.com/serino.consulting" target="_blank" rel="noopener noreferrer" className="text-roma-cream/40 hover:text-gold transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.facebook.com/serino.consulting/" target="_blank" rel="noopener noreferrer" className="text-roma-cream/40 hover:text-gold transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/serino-consulting/" target="_blank" rel="noopener noreferrer" className="text-roma-cream/40 hover:text-gold transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.youtube.com/@serino-consulting" target="_blank" rel="noopener noreferrer" className="text-roma-cream/40 hover:text-gold transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
