import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import translations from '../utils/translations.js'

const WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL || import.meta.env.VITE_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/'

const SOCIALS = [
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61566076958479#', emoji: '📘', color: '#1877F2' },
  { name: 'Instagram', url: 'https://www.instagram.com/bulgariansonline', emoji: '📸', color: '#E1306C' },
  { name: 'YouTube', url: 'https://www.youtube.com/@bulgariansonline', emoji: '▶️', color: '#FF0000' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@bulgariansonline', emoji: '🎵', color: '#010101' },
]

export default function ContactPage() {
  const { language } = useLanguage()
  const t = translations[language].contact

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString(), type: 'contact', language }),
        mode: 'no-cors',
      })
      setSubmitted(true)
    } catch {
      setError(t.errorBody)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={styles.successWrap}>
        <div style={styles.successCard} className="float-slow">
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: 20 }}>💌</span>
          <h2 style={styles.successTitle}>{t.successTitle}</h2>
          <p style={styles.successBody}>{t.successBody}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.blob1} />
        <div style={styles.blob2} />
        <div style={styles.headerInner}>
          <span className="badge badge-mint" style={{ position: 'relative', zIndex: 2 }}>
            ✉️ {language === 'bg' ? 'Контакти' : 'Contact'}
          </span>
          <h1 style={styles.title}>{t.title}</h1>
          <p style={styles.subtitle}>{t.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        <div style={styles.grid}>
          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form} className="clay-card">
            <div style={styles.formGroup}>
              <input
                type="text"
                className="form-input"
                placeholder={t.namePlaceholder}
                value={form.name}
                onChange={set('name')}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="email"
                className="form-input"
                placeholder={t.emailPlaceholder}
                value={form.email}
                onChange={set('email')}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <textarea
                className="form-textarea"
                placeholder={t.messagePlaceholder}
                value={form.message}
                onChange={set('message')}
                rows={6}
                required
              />
            </div>

            {error && (
              <div style={styles.errorBanner}>
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={styles.submitBtn}
              disabled={submitting}
            >
              {submitting ? t.submitting : `${t.submitBtn} →`}
            </button>
          </form>

          {/* Sidebar */}
          <div style={styles.sidebar}>
            {/* Follow us */}
            <div className="clay-card" style={styles.socialsCard}>
              <h3 style={styles.socialsHeading}>{t.followUs}</h3>
              <div style={styles.socialsGrid}>
                {SOCIALS.map(s => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.socialLink, color: s.color }}
                  >
                    <span style={styles.socialEmoji}>{s.emoji}</span>
                    <div>
                      <p style={styles.socialName}>{s.name}</p>
                      <p style={{ ...styles.socialHandle, color: s.color }}>@bulgariansonline</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div style={styles.infoCard} className="bubble-card">
              <span style={{ fontSize: '2rem' }}>📍</span>
              <p style={styles.infoText}>
                {language === 'bg'
                  ? 'Ние сме онлайн медия, посветена на гласовете на обикновените българи. Следете ни в социалните мрежи за последни новини.'
                  : "We're an online media outlet dedicated to the voices of ordinary Bulgarians. Follow us on social media for the latest news."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#FAFAFA',
  },
  header: {
    background: 'linear-gradient(135deg, #F0FBF6 0%, #DCF5E9 40%, #FFF2F2 100%)',
    padding: '140px 24px 64px',
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: '60% 40% 70% 30% / 50% 60% 40% 70%',
    background: '#B3EDD6',
    filter: 'blur(80px)',
    opacity: 0.3,
    top: -120,
    right: -80,
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: '40% 60% 30% 70% / 60% 40% 70% 50%',
    background: '#F4ABAF',
    filter: 'blur(80px)',
    opacity: 0.2,
    bottom: -60,
    left: -40,
    pointerEvents: 'none',
  },
  headerInner: {
    maxWidth: 760,
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  title: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    color: '#2D2D2D',
    letterSpacing: '-0.02em',
    marginBottom: 12,
    lineHeight: 1.15,
  },
  subtitle: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1rem',
    color: '#777',
    lineHeight: 1.7,
  },
  body: {
    maxWidth: 1000,
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: 32,
    alignItems: 'start',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: '36px 32px',
  },
  formGroup: {},
  submitBtn: {
    alignSelf: 'flex-start',
    fontSize: '0.95rem',
    padding: '14px 36px',
    marginTop: 8,
  },
  errorBanner: {
    background: '#FFF2F2',
    border: '2px solid #C0182A',
    borderRadius: 14,
    padding: '14px 18px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '0.88rem',
    color: '#850011',
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  socialsCard: {
    padding: '28px 24px',
  },
  socialsHeading: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 800,
    fontSize: '0.78rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#aaa',
    marginBottom: 16,
  },
  socialsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    textDecoration: 'none',
    padding: '10px 14px',
    borderRadius: 14,
    background: 'rgba(0,0,0,0.02)',
    transition: 'background 0.18s',
  },
  socialEmoji: { fontSize: '1.5rem', flexShrink: 0 },
  socialName: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '0.88rem',
    color: '#2D2D2D',
  },
  socialHandle: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '0.75rem',
  },
  infoCard: {
    padding: '24px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    background: 'linear-gradient(135deg, #F0FBF6 0%, rgba(255,255,255,0.85) 100%)',
    border: '2px solid rgba(78,205,164,0.2)',
  },
  infoText: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.88rem',
    color: '#777',
    lineHeight: 1.7,
  },
  successWrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F0FBF6 0%, #FFF2F2 100%)',
    padding: 24,
  },
  successCard: {
    background: 'rgba(255,255,255,0.9)',
    borderRadius: 40,
    padding: '64px 56px',
    textAlign: 'center',
    maxWidth: 480,
    boxShadow: '0 20px 80px rgba(0,0,0,0.07), inset 0 2px 0 rgba(255,255,255,1)',
    border: '2.5px solid rgba(255,255,255,0.95)',
  },
  successTitle: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 900,
    fontSize: '2rem',
    color: '#2D2D2D',
    marginBottom: 12,
    letterSpacing: '-0.02em',
  },
  successBody: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1rem',
    color: '#777',
    lineHeight: 1.7,
  },
}
