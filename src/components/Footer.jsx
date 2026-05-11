import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import translations from '../utils/translations.js'

const SOCIALS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61566076958479#',
    color: '#1877F2',
    bg: '#E7F0FD',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/bulgariansonline',
    color: '#E1306C',
    bg: '#FFE0E2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@bulgariansonline',
    color: '#FF0000',
    bg: '#FFE5E5',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@bulgariansonline',
    color: '#010101',
    bg: '#F0F0F0',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
]

export default function Footer({ socialLinks = SOCIALS }) {
  const { language } = useLanguage()
  const t = translations[language].footer
  const tNav = translations[language].nav

  return (
    <footer style={footerStyles.footer}>
      {/* Wave top */}
      <div style={footerStyles.wave}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FFF2F2" />
        </svg>
      </div>

      <div style={footerStyles.inner}>
        {/* Brand */}
        <div style={footerStyles.brand}>
          <div style={footerStyles.brandLogo}>
            <span style={{ fontSize: '2rem' }}>🇧🇬</span>
            <span style={footerStyles.brandName}>Bulgarians <span style={{ color: '#C0182A' }}>Online</span></span>
          </div>
          <p style={footerStyles.tagline}>{t.tagline}</p>

          {/* Social icons */}
          <div style={footerStyles.socials}>
            {socialLinks.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...footerStyles.socialBtn, background: s.bg, color: s.color }}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Survey CTA */}
        <div style={footerStyles.ctaCol}>
          <div style={footerStyles.ctaCard}>
            <p style={footerStyles.ctaText}>
              {language === 'bg'
                ? 'Вземете участие в нашата анкета!'
                : 'Take part in our survey!'}
            </p>
            <Link to="/survey" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '10px 24px' }}>
              {tNav.takeSurvey}
            </Link>
          </div>
        </div>
      </div>

      <div style={footerStyles.bottom}>
        <p style={footerStyles.rights}>{t.rights}</p>
      </div>
    </footer>
  )
}

const footerStyles = {
  footer: {
    background: 'linear-gradient(180deg, #FFF2F2 0%, #F5F2FF 100%)',
    paddingBottom: 40,
  },
  wave: { marginBottom: 0 },
  inner: {
    maxWidth: 1160,
    margin: '0 auto',
    padding: '48px 24px 32px',
    display: 'grid',
    gridTemplateColumns: '2fr 1.5fr',
    gap: 48,
    alignItems: 'start',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  brandLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  brandName: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 800,
    fontSize: '1.2rem',
    color: '#2D2D2D',
  },
  tagline: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.9rem',
    color: '#888',
    maxWidth: 280,
    lineHeight: 1.6,
  },
  socials: {
    display: 'flex',
    gap: 10,
    marginTop: 8,
  },
  socialBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    flexShrink: 0,
  },
  ctaCol: {},
  ctaCard: {
    background: 'rgba(255,255,255,0.8)',
    borderRadius: 24,
    padding: '28px 24px',
    boxShadow: '0 8px 32px rgba(192,24,42,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
    border: '2px solid rgba(255,255,255,0.9)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-start',
  },
  ctaText: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#2D2D2D',
    lineHeight: 1.5,
  },
  bottom: {
    maxWidth: 1160,
    margin: '0 auto',
    padding: '20px 24px 0',
    borderTop: '1px solid rgba(0,0,0,0.06)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  rights: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.8rem',
    color: '#aaa',
  },
}
