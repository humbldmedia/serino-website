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

function PlayIcon({ size = 52 }: { size?: number }) {
  const triH = Math.round(size * 0.3)
  const triW = Math.round(triH * 0.846)
  return (
    <span
      className="flex items-center justify-center rounded-full border border-gold transition-transform duration-200 group-hover:scale-110"
      // paddingLeft optically centers the right-pointing triangle (its visual mass sits left of the bounding box)
      style={{ width: size, height: size, backgroundColor: 'rgba(13,13,13,0.35)', paddingLeft: Math.round(size * 0.08) }}
    >
      <svg width={triW} height={triH} viewBox="0 0 22 26" fill="none" aria-hidden="true">
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
export function ProofVideo({
  source,
  aspect = '16 / 9',
  label,
  subLabel,
}: {
  source: VideoSource
  aspect?: string
  label?: string
  subLabel?: string
}) {
  const [playing, setPlaying] = useState(false)
  const available = hasSource(source)
  const isVertical = aspect.trim().startsWith('9')
  const visibleTitle = label ?? source.title

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
          className="group absolute inset-0 w-full h-full block text-left"
          style={{
            backgroundImage: poster ? `url(${poster})` : undefined,
            backgroundColor: poster ? undefined : '#141414',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: available ? 'pointer' : 'default',
          }}
          aria-label={available ? `Play ${source.title}` : `${source.title}, coming soon`}
        >
          {/* Light overall tint, deepens slightly on hover for feedback */}
          <span
            className="absolute inset-0 transition-colors duration-200 group-hover:bg-black/10"
            style={{ background: 'rgba(13,13,13,0.10)' }}
          />
          {/* Bottom gradient scrim so the title stays legible over any image */}
          <span
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: '65%', background: 'linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 42%, transparent 100%)' }}
          />
          {/* Bottom-left: play button + title (+ optional tag) */}
          <span className={`absolute inset-x-0 bottom-0 z-10 flex items-center ${isVertical ? 'gap-2.5 p-3' : 'gap-4 p-5'}`}>
            <span className="flex-shrink-0">
              <PlayIcon size={isVertical ? 34 : 52} />
            </span>
            <span className="flex flex-col min-w-0">
              <span className={`font-display text-roma-cream leading-tight ${isVertical ? 'text-sm' : 'text-xl md:text-2xl'}`}>
                {visibleTitle}
              </span>
              {subLabel && (
                <span
                  className={`font-heading tracking-widest uppercase mt-1 ${isVertical ? 'text-[9px]' : 'text-[11px]'}`}
                  style={{ color: '#C2A878' }}
                >
                  {subLabel}
                </span>
              )}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
