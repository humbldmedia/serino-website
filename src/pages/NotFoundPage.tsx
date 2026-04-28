import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="container-main text-center">
        <p
          className="font-display text-8xl md:text-9xl font-normal leading-none mb-8 select-none"
          style={{ color: '#C2A878', opacity: 0.18 }}
        >
          404
        </p>

        <h1
          className="font-display text-3xl md:text-4xl text-roma-cream leading-tight mb-6"
          style={{ marginTop: '-4rem' }}
        >
          This page doesn't exist.
        </h1>

        <p className="font-body text-lg text-roma-cream/50 mb-12 max-w-sm mx-auto leading-relaxed">
          It may have moved, or the link might be off. Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-block font-heading text-sm tracking-widest uppercase border border-gold text-gold px-8 py-4 hover:bg-gold hover:text-serino-black transition-all duration-200"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
