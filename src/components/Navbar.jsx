import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import translations from '../utils/translations.js'

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language].nav
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const links = [
    { to: '/', label: t.home },
    { to: '/surveys', label: t.survey },
    { to: '/privacy', label: t.privacy },
    { to: '/contact', label: t.contact },
  ]

  return (
    <nav style={{ ...navStyles.nav, ...(scrolled ? navStyles.navScrolled : {}) }}>
      <div style={navStyles.inner}>
        {/* Logo */}
        <Link to="/" style={navStyles.logo}>
          <span style={navStyles.logoIcon}>🇧🇬</span>
          <span style={navStyles.logoText}>Bulgarians <span style={navStyles.logoHighlight}>Online</span></span>
        </Link>

        {/* Desktop links */}
        <div style={navStyles.links}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...navStyles.link,
                ...(location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
                  ? navStyles.linkActive : {}),
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Language toggle + CTA */}
        <div style={navStyles.rightGroup}>
          <button onClick={toggleLanguage} style={navStyles.langBtn} title="Switch language">
            <span style={navStyles.langFlag}>{language === 'bg' ? '🇧🇬' : '🇬🇧'}</span>
            <span style={navStyles.langLabel}>{language === 'bg' ? 'BG' : 'EN'}</span>
          </button>

          <Link to="/surveys" className="btn btn-primary" style={navStyles.ctaBtn}>
            {t.takeSurvey}
          </Link>

          {/* Hamburger */}
          <button
            style={navStyles.hamburger}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span style={{ ...navStyles.hamLine, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ ...navStyles.hamLine, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...navStyles.hamLine, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={navStyles.mobileMenu}>
          {links.map(link => (
            <Link key={link.to} to={link.to} style={navStyles.mobileLink}>
              {link.label}
            </Link>
          ))}
          <div style={navStyles.mobileDivider} />
          <button onClick={toggleLanguage} style={navStyles.mobileLang}>
            {language === 'bg' ? '🇬🇧 Switch to English' : '🇧🇬 Смени на Български'}
          </button>
          <Link to="/surveys" className="btn btn-primary" style={{ marginTop: 8 }}>
            {t.takeSurvey}
          </Link>
        </div>
      )}
    </nav>
  )
}

const navStyles = {
  nav: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    padding: '12px 24px',
    transition: 'background 0.3s, box-shadow 0.3s, padding 0.3s',
    background: 'transparent',
  },
  navScrolled: {
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 4px 32px rgba(0,0,0,0.06), 0 1px 0 rgba(0,0,0,0.04)',
    padding: '8px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.8)',
  },
  inner: {
    maxWidth: 1160,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoIcon: {
    fontSize: '1.6rem',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  },
  logoText: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 800,
    fontSize: '1.1rem',
    color: '#2D2D2D',
    letterSpacing: '-0.01em',
  },
  logoHighlight: {
    color: '#C0182A',
    marginLeft: 2,
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '0.88rem',
    color: '#555',
    textDecoration: 'none',
    padding: '7px 14px',
    borderRadius: 999,
    transition: 'all 0.18s',
    letterSpacing: '0.01em',
  },
  linkActive: {
    color: '#C0182A',
    background: 'rgba(192, 24, 42, 0.1)',
  },
  rightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
  langBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    background: 'rgba(255,255,255,0.85)',
    border: '2px solid rgba(0,0,0,0.08)',
    borderRadius: 999,
    padding: '6px 12px',
    cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '0.78rem',
    color: '#555',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'all 0.18s',
  },
  langFlag: { fontSize: '1rem' },
  langLabel: {},
  ctaBtn: {
    padding: '8px 22px',
    fontSize: '0.85rem',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: 4,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 6,
  },
  hamLine: {
    display: 'block',
    width: 22,
    height: 2.5,
    background: '#2D2D2D',
    borderRadius: 99,
    transition: 'all 0.22s',
    transformOrigin: 'center',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '16px 0 8px',
    maxWidth: 1160,
    margin: '0 auto',
    borderTop: '1px solid rgba(0,0,0,0.06)',
    marginTop: 8,
  },
  mobileLink: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '1rem',
    color: '#2D2D2D',
    textDecoration: 'none',
    padding: '10px 4px',
    borderBottom: '1px solid rgba(0,0,0,0.04)',
  },
  mobileDivider: {
    height: 1,
    background: 'rgba(0,0,0,0.06)',
    margin: '4px 0',
  },
  mobileLang: {
    background: 'none',
    border: 'none',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '0.9rem',
    color: '#777',
    cursor: 'pointer',
    padding: '8px 4px',
    textAlign: 'left',
  },
}

// Responsive hamburger via a style tag injection
const style = document.createElement('style')
style.textContent = `
  @media (max-width: 768px) {
    [data-nav-links] { display: none !important; }
    [data-hamburger] { display: flex !important; }
  }
`
document.head.appendChild(style)
