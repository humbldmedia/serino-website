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

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Contact', href: '#contact' },
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
          <a href="#hero" className="flex items-center" aria-label="Serino Consulting">
            <img
              src="/assets/logos/black_w_quill.png"
              alt="Serino Consulting"
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/contact"
              className="font-heading text-xs tracking-widest uppercase text-roma-cream/50 hover:text-gold transition-colors duration-200"
            >
              Contact
            </Link>
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
          {navLinks.map((link) => (
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
        </div>
      </div>
    </>
  )
}
