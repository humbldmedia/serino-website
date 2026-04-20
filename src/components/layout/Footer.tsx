function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-serino-black border-t border-gold/20">
      <div className="container-main py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/assets/logos/black_w_quill.png"
            alt="Serino Consulting"
            className="h-10 w-auto opacity-80"
          />
          <p className="font-body text-sm text-roma-cream/40 text-center">
            © 2025 Serino Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-heading text-xs tracking-widest uppercase text-roma-cream/40 hover:text-gold transition-colors">
              Privacy
            </a>
            <span className="text-roma-cream/20">|</span>
            <a href="#" className="font-heading text-xs tracking-widest uppercase text-roma-cream/40 hover:text-gold transition-colors">
              Terms
            </a>
            <span className="text-roma-cream/20">|</span>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/serino.consulting" target="_blank" rel="noopener noreferrer" className="text-roma-cream/40 hover:text-gold transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/serino.consulting/" target="_blank" rel="noopener noreferrer" className="text-roma-cream/40 hover:text-gold transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://www.linkedin.com/company/serino-consulting/" target="_blank" rel="noopener noreferrer" className="text-roma-cream/40 hover:text-gold transition-colors">
                <LinkedInIcon />
              </a>
              <a href="https://www.youtube.com/@serino-consulting" target="_blank" rel="noopener noreferrer" className="text-roma-cream/40 hover:text-gold transition-colors">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
