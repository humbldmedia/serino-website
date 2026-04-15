export default function Footer() {
  return (
    <footer className="bg-serino-black border-t border-gold/20">
      <div className="container-main py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/assets/logos/black_w_quill.png"
            alt="Serino Consulting"
            className="h-6 w-auto opacity-80"
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
          </div>
        </div>
      </div>
    </footer>
  )
}
