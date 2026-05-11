import React, { useEffect, useState, useRef } from 'react'

// Speckle dots — seeded so they're stable
function Speckles({ count = 120 }) {
  const dots = useRef(
    Array.from({ length: count }, (_, i) => {
      const seed = i * 137.508
      return {
        x: ((Math.sin(seed) * 0.5 + 0.5) * 100).toFixed(2),
        y: ((Math.cos(seed * 1.3) * 0.5 + 0.5) * 100).toFixed(2),
        r: (((Math.sin(seed * 2.1) * 0.5 + 0.5) * 3) + 1).toFixed(1),
        op: (((Math.cos(seed * 3.7) * 0.5 + 0.5) * 0.35) + 0.08).toFixed(2),
      }
    })
  )

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {dots.current.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="rgba(0,0,0,1)" opacity={d.op} />
      ))}
    </svg>
  )
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 2400
    const tick = () => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.floor(eased * 100))
      setPhase(Math.floor(eased * 3))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  const phases = ['🇧🇬', '💬', '✊']

  return (
    <div style={styles.overlay}>
      {/* ── Bulgarian flag background ── */}
      {/* White stripe */}
      <div style={{ ...styles.stripe, background: '#F5F4F0', top: 0, height: '33.33%' }} />
      {/* Green stripe */}
      <div style={{ ...styles.stripe, background: '#00966E', top: '33.33%', height: '33.33%' }} />
      {/* Red stripe */}
      <div style={{ ...styles.stripe, background: '#D62612', top: '66.66%', height: '33.34%' }} />

      {/* Speckle texture over the whole flag */}
      <Speckles count={160} />

      {/* Soft vignette so card pops */}
      <div style={styles.vignette} />

      {/* Card */}
      <div style={styles.card}>
        <div style={styles.emojiWrap}>
          <span style={styles.emoji}>{phases[Math.min(phase, phases.length - 1)]}</span>
        </div>

        <p style={styles.siteName}>Bulgarians Online</p>

        <div style={styles.percentWrap}>
          <span style={styles.percent}>{progress}</span>
          <span style={styles.percentSign}>%</span>
        </div>

        <div style={styles.barTrack}>
          <div style={{ ...styles.barFill, width: `${progress}%` }} />
          <div style={{ ...styles.barGlow, left: `${progress}%` }} />
        </div>

        <p style={styles.label}>Зареждане...</p>

        {/* Footnote */}
        <p style={styles.footnote}>
          💡 Знаете ли: повече от 5&nbsp;000 души вече споделиха своите мнения с Bulgarians Online!
        </p>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    overflow: 'hidden',
  },
  stripe: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.38) 100%)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 10,
    background: 'rgba(255,255,255,0.93)',
    borderRadius: 40,
    boxShadow: '0 24px 96px rgba(0,0,0,0.22), 0 4px 24px rgba(0,0,0,0.12), inset 0 2px 0 rgba(255,255,255,1)',
    border: '2.5px solid rgba(255,255,255,0.98)',
    padding: '48px 52px 36px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 320,
    maxWidth: 420,
    backdropFilter: 'blur(20px)',
  },
  emojiWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    background: 'linear-gradient(135deg, #00966E 0%, #D62612 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    boxShadow: '0 8px 32px rgba(0, 150, 110, 0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
  },
  emoji: { fontSize: 36 },
  siteName: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 800,
    fontSize: '1.25rem',
    color: '#2D2D2D',
    marginBottom: 28,
    letterSpacing: '-0.01em',
  },
  percentWrap: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: 20,
  },
  percent: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 900,
    fontSize: '4rem',
    lineHeight: 1,
    background: 'linear-gradient(135deg, #00966E 0%, #D62612 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    minWidth: 80,
    textAlign: 'right',
  },
  percentSign: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '#D62612',
    marginBottom: 8,
  },
  barTrack: {
    width: '100%',
    height: 12,
    background: 'rgba(0,0,0,0.06)',
    borderRadius: 999,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.08)',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00966E 0%, #D62612 100%)',
    borderRadius: 999,
    transition: 'width 0.05s linear',
    boxShadow: '0 2px 8px rgba(0,150,110,0.4)',
    position: 'relative',
  },
  barGlow: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.9)',
    filter: 'blur(4px)',
    pointerEvents: 'none',
    transition: 'left 0.05s linear',
  },
  label: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#aaa',
    marginTop: 16,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  footnote: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.72rem',
    fontWeight: 600,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 1.55,
    paddingTop: 16,
    borderTop: '1px solid rgba(0,0,0,0.07)',
    maxWidth: 280,
  },
}
