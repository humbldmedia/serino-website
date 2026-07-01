import { useState } from 'react'
import { STREAM_CUSTOMER, hasSource, type VideoSource } from '../../config/acquisitionVideos'

/**
 * Full-bleed hero background video. Muted, autoplaying, looping.
 * Prefers a native <video> (mp4Url) for true object-cover; falls back to a
 * scaled Cloudflare Stream iframe; falls back again to the poster image.
 */
export function HeroBackgroundVideo({ source }: { source: VideoSource }) {
  if (source.mp4Url) {
    return (
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={source.poster}
        aria-hidden="true"
      >
        <source src={source.mp4Url} type="video/mp4" />
      </video>
    )
  }

  if (source.streamUid && STREAM_CUSTOMER) {
    const src =
      `https://${STREAM_CUSTOMER}.cloudflarestream.com/${source.streamUid}/iframe` +
      `?autoplay=true&muted=true&loop=true&controls=false&preload=auto`
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <iframe
          src={src}
          title={source.title}
          allow="autoplay; fullscreen"
          loading="eager"
          className="pointer-events-none"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw', // 16:9
            minHeight: '100%',
            minWidth: '177.78vh',
            transform: 'translate(-50%, -50%)',
            border: 0,
          }}
        />
      </div>
    )
  }

  // Poster fallback (no video wired yet)
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: source.poster ? `url(${source.poster})` : undefined }}
      aria-hidden="true"
    />
  )
}

function PlayIcon() {
  return (
    <span
      className="flex items-center justify-center rounded-full border border-gold transition-transform duration-200 group-hover:scale-110"
      style={{ width: 72, height: 72, backgroundColor: 'rgba(13,13,13,0.35)' }}
    >
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden="true">
        <path d="M21 13 0 26V0z" fill="#C2A878" />
      </svg>
    </span>
  )
}

/**
 * Click-to-play proof film in a 16:9 frame. Shows a poster + play button until
 * clicked, then swaps in the Cloudflare Stream (or YouTube) iframe with sound.
 * When no source is wired yet, renders an elegant "coming soon" placeholder.
 */
export function ProofVideo({ source, aspect = '16 / 9' }: { source: VideoSource; aspect?: string }) {
  const [playing, setPlaying] = useState(false)
  const available = hasSource(source)

  // Auto-poster from Stream's generated thumbnail when no explicit still is set.
  const streamPoster =
    source.streamUid && STREAM_CUSTOMER
      ? `https://${STREAM_CUSTOMER}.cloudflarestream.com/${source.streamUid}/thumbnails/thumbnail.jpg?time=${source.thumbTime || '1s'}&height=720`
      : undefined
  const poster = source.poster || streamPoster

  let iframeSrc: string | null = null
  if (playing) {
    if (source.streamUid && STREAM_CUSTOMER) {
      iframeSrc = `https://${STREAM_CUSTOMER}.cloudflarestream.com/${source.streamUid}/iframe?autoplay=true`
    } else if (source.youtubeId) {
      iframeSrc = `https://www.youtube.com/embed/${source.youtubeId}?autoplay=1&rel=0`
    }
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: aspect, backgroundColor: '#111', border: '1px solid rgba(194,168,120,0.18)' }}
    >
      {playing && source.mp4Url ? (
        // Direct MP4 (e.g. hosted on Cloudflare R2)
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={source.mp4Url}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
      ) : iframeSrc ? (
        <iframe
          src={iframeSrc}
          title={source.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => available && setPlaying(true)}
          className="group absolute inset-0 w-full h-full flex items-center justify-center"
          style={{
            backgroundImage: poster ? `url(${poster})` : undefined,
            backgroundColor: poster ? undefined : '#141414',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: available ? 'pointer' : 'default',
          }}
          aria-label={available ? `Play ${source.title}` : `${source.title} — coming soon`}
        >
          <span className="absolute inset-0" style={{ background: 'rgba(13,13,13,0.45)' }} />
          <span className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
            <PlayIcon />
            <span className="font-heading text-xs tracking-widest uppercase text-roma-cream/70">
              {available ? source.title : `${source.title} — coming soon`}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
