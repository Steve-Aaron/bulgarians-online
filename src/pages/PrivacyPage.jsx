import React from 'react'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import translations from '../utils/translations.js'

export default function PrivacyPage() {
  const { language } = useLanguage()
  const t = translations[language].privacy

  return (
    <div style={pageStyles.page}>
      {/* Header */}
      <div style={pageStyles.header}>
        <div style={pageStyles.blob1} />
        <div style={pageStyles.blob2} />
        <div style={pageStyles.headerInner}>
          <span className="badge badge-lavender" style={{ position: 'relative', zIndex: 2 }}>
            🔒 {language === 'bg' ? 'Поверителност' : 'Privacy'}
          </span>
          <h1 style={pageStyles.title}>{t.title}</h1>
          <p style={pageStyles.lastUpdated}>{t.lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div style={pageStyles.content}>
        <div style={pageStyles.intro} className="clay-card">
          <p style={pageStyles.introText}>{t.intro}</p>
        </div>

        <div style={pageStyles.sections}>
          {t.sections.map((section, i) => (
            <div key={i} style={pageStyles.sectionBlock}>
              <div style={pageStyles.sectionNumber}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={pageStyles.sectionBody}>
                <h2 style={pageStyles.sectionHeading}>{section.heading}</h2>
                <p style={pageStyles.sectionText}>{section.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const pageStyles = {
  page: {
    minHeight: '100vh',
    background: '#FAFAFA',
  },
  header: {
    background: 'linear-gradient(135deg, #F5F2FF 0%, #EAE4FF 60%, #FFF2F2 100%)',
    padding: '140px 24px 64px',
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: '60% 40% 70% 30% / 50% 60% 40% 70%',
    background: '#D4C6FF',
    filter: 'blur(80px)',
    opacity: 0.3,
    top: -100,
    right: -60,
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    width: 300,
    height: 300,
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
  lastUpdated: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.85rem',
    color: '#aaa',
    fontWeight: 500,
  },
  content: {
    maxWidth: 760,
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  intro: {
    padding: '32px 36px',
    marginBottom: 40,
    background: 'linear-gradient(135deg, #F5F2FF 0%, #FFFFFF 100%)',
    border: '2px solid rgba(155,127,255,0.2)',
  },
  introText: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.05rem',
    color: '#555',
    lineHeight: 1.8,
    fontWeight: 500,
  },
  sections: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  sectionBlock: {
    display: 'flex',
    gap: 24,
    padding: '28px 0',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    alignItems: 'flex-start',
  },
  sectionNumber: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 900,
    fontSize: '1.4rem',
    background: 'linear-gradient(135deg, #9B7FFF 0%, #C0182A 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    minWidth: 40,
    flexShrink: 0,
    paddingTop: 2,
  },
  sectionBody: {
    flex: 1,
  },
  sectionHeading: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 800,
    fontSize: '1.05rem',
    color: '#2D2D2D',
    marginBottom: 10,
    letterSpacing: '-0.01em',
  },
  sectionText: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: 1.75,
  },
}
