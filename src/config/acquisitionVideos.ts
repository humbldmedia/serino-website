// ─────────────────────────────────────────────────────────────────────────────
// Acquisition landing page: video configuration
//
// This is the ONLY file you edit to wire up videos. Nothing else needs to change.
//
// HOW TO HOST (recommended): Cloudflare Stream
//   1. Upload each film in your Cloudflare dashboard → Stream.
//   2. Copy your customer subdomain (looks like "customer-a1b2c3d4e5f6g7h8")
//      from any Stream embed URL and paste it into STREAM_CUSTOMER below.
//   3. Copy each video's UID (32-char id) into the `streamUid` fields below.
//
// FREE ALTERNATIVE for the two proof films: unlisted YouTube.
//   Just set `youtubeId` instead of `streamUid`.
//
// HERO LOOP: for the cleanest muted autoplay loop, use a short 15–30s cutdown.
//   Best result = a direct MP4 (`mp4Url`) hosted on Cloudflare Stream "downloads"
//   or Cloudflare R2. If you only have a Stream UID, that works too (it will be
//   scaled to fill the hero). If no video is set yet, the poster image shows.
// ─────────────────────────────────────────────────────────────────────────────

/** Your Cloudflare Stream customer subdomain, e.g. "customer-a1b2c3d4e5f6g7h8". Leave "" until you have it. */
export const STREAM_CUSTOMER = 'customer-u32pdhmjcvj10rgj'

export interface VideoSource {
  /** Cloudflare Stream video UID (preferred for proof films). */
  streamUid?: string
  /** Direct MP4 URL (preferred for the hero loop, native <video>, object-fit cover). */
  mp4Url?: string
  /** Unlisted YouTube id (free fallback for proof films). */
  youtubeId?: string
  /** Still image shown before play / when no video is set yet. Overrides the Stream auto-thumbnail. */
  poster?: string
  /** For Stream clips: which frame to use as the poster, e.g. '6s'. Defaults to '1s'. */
  thumbTime?: string
  /** Accessible title / label. */
  title: string
}

/** Hero background: short muted loop. Falls back to the poster until a video is set. */
export const heroVideo: VideoSource = {
  // mp4Url: 'https://.../hero-loop.mp4',   // ← 15–30s cutdown, muted loop (best)
  // streamUid: '',                          // ← or a Cloudflare Stream UID
  poster: '/assets/pictures/hero-bg.png',
  title: 'Serino Consulting brand film',
}

/**
 * The two proof films. Click-to-play, full length, with sound.
 * Any one source works: `mp4Url` (Cloudflare R2), `streamUid`, or `youtubeId`.
 * R2 example: mp4Url: 'https://media.serinoconsulting.com/acquisition/directstay-film.mp4'
 */
export const proofVideos = {
  directStay: {
    streamUid: 'def64f68bb31ce98cb51a0d5fedc5e35',
    poster: '/assets/pictures/directstay-poster.jpg',
    title: 'DirectStay brand film',
  } as VideoSource,
  aladdin: {
    streamUid: 'ce6acf77aa5dcf7e07874bfadc77daea',
    poster: '/assets/pictures/aladdin-poster.jpg',
    title: 'Aladdin Heating & Cooling brand film',
  } as VideoSource,
}

/**
 * Optional short-form vertical clips (9:16). Add up to 3 when you have them,
 * the strip renders automatically once this array is non-empty, and stays hidden
 * while it's empty.
 */
export const verticalClips: VideoSource[] = [
  { streamUid: '6efe5fe37e0e3984fb5ddf8d7ca5bb31', poster: '/assets/pictures/haunted-poster.jpg', title: 'The Haunted Listing' }, // Skit
  { streamUid: '12045e484429034ef40822868dcf6f7e', poster: '/assets/pictures/rooted-poster.jpg', title: 'Rooted in Community' }, // Interview
  { streamUid: '1f320c64d4a17f74a90f1893c919adbc', poster: '/assets/pictures/thisjustin-poster.jpg', title: 'This Just In' }, // Remix / pattern interrupt
]

/** True when at least one playable source is present. */
export function hasSource(v: VideoSource): boolean {
  return Boolean(v.mp4Url || v.streamUid || v.youtubeId)
}
