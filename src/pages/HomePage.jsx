import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import translations from '../utils/translations.js'
import radevHero from '/radev_hero.jpg'

// ─── NOTE ─────────────────────────────────────────────────────────────────────
// Save the uploaded claymation image to:
//   bulgaria_online/public/claymation_crowd.jpg
// It will then appear automatically in the About and CTA sections.
// ─────────────────────────────────────────────────────────────────────────────

const CLAYMATION_IMG = '/claymation_crowd.svg'

const SOCIALS = [
  { name: 'Facebook',  url: 'https://www.facebook.com/profile.php?id=61566076958479#', gradient: 'linear-gradient(135deg,#E7F0FD 0%,#C5D9F9 100%)', emoji: '📘', color: '#1877F2' },
  { name: 'Instagram', url: 'https://www.instagram.com/bulgariansonline',               gradient: 'linear-gradient(135deg,#FFE0E2 0%,#F5B0B5 100%)', emoji: '📸', color: '#E1306C' },
  { name: 'YouTube',   url: 'https://www.youtube.com/@bulgariansonline',                gradient: 'linear-gradient(135deg,#FFE5E5 0%,#FFC4C4 100%)', emoji: '▶️', color: '#FF0000' },
  { name: 'TikTok',    url: 'https://www.tiktok.com/@bulgariansonline',                 gradient: 'linear-gradient(135deg,#F0F0F0 0%,#D8D8D8 100%)', emoji: '🎵', color: '#010101' },
]

// ─── Intersection-observer hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ t }) {
  return (
    <section style={hero.wrap}>
      <div style={{ ...hero.imgOverlay, backgroundImage: `url(${radevHero})` }} />
      <div style={hero.gradient} />

      {/* Floating circles */}
      <div style={{ ...hero.bubble, width: 200, height: 200, top: '12%', right: '10%' }} className="float-slow" />
      <div style={{ ...hero.bubble, width: 130, height: 130, top: '60%', right: '22%' }} className="float" />
      <div style={{ ...hero.bubble, width: 80,  height: 80,  top: '28%', right: '38%' }} className="float-delay" />

      <div style={hero.content}>
        <div className="badge badge-pink fade-up fade-up-1" style={{ fontSize: '0.7rem' }}>
          🇧🇬 Bulgarians Online
        </div>
        <h1 style={hero.h1} className="fade-up fade-up-2">{t.hero.heading}</h1>
        <p style={hero.sub} className="fade-up fade-up-3">{t.hero.subheading}</p>
        <div className="fade-up fade-up-4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/survey" className="btn btn-primary" style={hero.cta}>{t.hero.cta} →</Link>
        </div>
      </div>

      <div style={hero.waveBottom}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
          <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────────
// Cards fan out left-to-right on scroll. Each card's `finalLeft` is its resting
// x-position; the animation origin is the left edge for all, so the rightmost
// card travels the furthest distance.
const ABOUT_CARDS = [
  {
    'data-card': 'opinion',
    emoji: '💬',
    bgBg: 'linear-gradient(135deg,#FFF2F2 0%,#FFDADB 100%)',
    rotate: '-4deg',
    finalLeft: 0,
    top: 50,
    keyBG: 'Вашето мнение',
    keyEN: 'Your opinion',
  },
  {
    'data-card': 'amplify',
    emoji: '📢',
    bgBg: 'linear-gradient(135deg,#F0F7FF 0%,#E0EDFF 100%)',
    rotate: '3deg',
    finalLeft: 115,
    top: 20,
    keyBG: 'Усилваме гласа',
    keyEN: 'We amplify',
  },
  {
    'data-card': 'bulgaria',
    emoji: '🇧🇬',
    bgBg: 'linear-gradient(135deg,#F5F2FF 0%,#EAE4FF 100%)',
    rotate: '-2deg',
    finalLeft: 230,
    top: 60,
    keyBG: 'За България',
    keyEN: 'For Bulgaria',
  },
  {
    'data-card': 'together',
    emoji: '✊',
    bgBg: 'linear-gradient(135deg,#F0FBF6 0%,#DCF5E9 100%)',
    rotate: '4deg',
    finalLeft: 345,
    top: 10,
    keyBG: 'Заедно сме',
    keyEN: 'Together',
  },
]

function AboutSection({ t, language }) {
  const [sectionRef, inView] = useInView(0.12)

  return (
    <section className="section" style={{ background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      {/* blob deco */}
      <div className="blob" style={{ background: '#F4ABAF', width: 400, height: 400, top: -100, right: -80, opacity: 0.16 }} />
      <div className="blob" style={{ background: '#B3D9FF', width: 300, height: 300, bottom: -60, left: -60, opacity: 0.14 }} />

      <div className="section-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        {/* Text */}
        <div>
          <span className="badge badge-mint">{t.about.badge}</span>
          <h2 className="section-heading">{t.about.heading}</h2>
          <p className="section-body" style={{ marginBottom: 20 }}>{t.about.body}</p>
          <p className="section-body">{t.about.body2}</p>
        </div>

        {/* Fan-out cards — all start at the left edge, spread right on scroll */}
        <div ref={sectionRef} style={{ position: 'relative', height: 280, overflow: 'visible' }}>
          {ABOUT_CARDS.map((card, i) => {
            // Each card starts collapsed at x=0 (left edge). The travel distance
            // equals finalLeft + a shared base offset, so the rightmost card (i=3)
            // travels the furthest.
            const travelDistance = card.finalLeft + 48
            const delay = i * 100
            const label = language === 'bg' ? card.keyBG : card.keyEN

            return (
              <div
                key={i}
                data-card={card['data-card']}
                style={{
                  ...aboutCardBase,
                  background: card.bgBg,
                  top: card.top,
                  left: card.finalLeft,
                  zIndex: i + 1,
                  transform: inView
                    ? `rotate(${card.rotate}) translateX(0) scale(1)`
                    : `rotate(${card.rotate}) translateX(-${travelDistance}px) scale(0.82)`,
                  opacity: inView ? 1 : 0,
                  transition: `transform 0.62s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, opacity 0.42s ease ${delay}ms`,
                }}
              >
                <span style={{ fontSize: '2.2rem' }}>{card.emoji}</span>
                <p style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: '0.82rem', color: '#2D2D2D', lineHeight: 1.35 }}>{label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Claymation crowd image strip below text */}
      <div style={aboutImgStrip.wrap}>
        <img
          src={CLAYMATION_IMG}
          alt="Ordinary Bulgarians"
          style={aboutImgStrip.img}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div style={aboutImgStrip.overlay} />
      </div>
    </section>
  )
}

// ─── Mid CTA ──────────────────────────────────────────────────────────────────
function SurveyCtaSection({ t, language }) {
  return (
    <section style={midCta.wrap}>
      {/* Bulgarian flag gradient background */}
      <div style={midCta.flagBg} />
      {/* Dark overlay for text readability */}
      <div style={midCta.flagOverlay} />

      <div className="section-inner text-center" style={{ position: 'relative', zIndex: 2, padding: '96px 24px' }}>
        <span className="badge badge-lavender">{t.surveyCta.badge}</span>
        <h2 className="section-heading" style={{ maxWidth: 600, margin: '0 auto 20px', fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}>
          {t.surveyCta.heading}
        </h2>
        <p style={{ ...midCta.body, color: 'rgba(255,255,255,0.88)' }}>{t.surveyCta.body}</p>
        <Link to="/survey" className="btn btn-secondary" style={{ fontSize: '1.05rem', padding: '16px 40px' }}>
          {t.surveyCta.cta} →
        </Link>

        <div style={midCta.stats}>
          {[
            { emoji: '🗳️', value: '5,200+', label: language === 'bg' ? 'гласа' : 'voices' },
            { emoji: '💬', value: '12+',    label: language === 'bg' ? 'теми'  : 'topics' },
          ].map((stat, i) => (
            <div key={i} className="bubble-card" style={midCta.statCard}>
              <span style={{ fontSize: '2rem' }}>{stat.emoji}</span>
              <p style={midCta.statValue}>{stat.value}</p>
              <p style={midCta.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Team ─────────────────────────────────────────────────────────────────────
function TeamSection({ t }) {
  const members = [
    {
      name: t.team.member1Name,
      role: t.team.member1Role,
      bio: t.team.member1Bio,
      img: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Hristo&backgroundColor=b6e3f4',
      accentBg: 'linear-gradient(135deg,#B3D9FF 0%,#87CEEB 100%)',
    },
    {
      name: t.team.member2Name,
      role: t.team.member2Role,
      bio: t.team.member2Bio,
      img: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Marina&backgroundColor=ffb3cc',
      accentBg: 'linear-gradient(135deg,#F4ABAF 0%,#D42038 100%)',
    },
  ]

  return (
    <section className="section" style={{ background: '#FAFAFA', position: 'relative', overflow: 'hidden' }}>
      <div className="blob" style={{ background: '#B3EDD6', width: 350, height: 350, top: -80,  right: -60, opacity: 0.2 }} />
      <div className="blob" style={{ background: '#FFE5A0', width: 280, height: 280, bottom: -60, left: -40, opacity: 0.2 }} />

      <div className="section-inner">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <span className="badge badge-blue">{t.team.badge}</span>
          <h2 className="section-heading">{t.team.heading}</h2>
        </div>

        <div className="grid-2" style={{ maxWidth: 800, margin: '0 auto' }}>
          {members.map((m, i) => (
            <div key={i} className="clay-card" style={teamStyles.card}>
              <div style={{ ...teamStyles.avatarWrap, background: m.accentBg }}>
                <img src={m.img} alt={m.name} style={teamStyles.avatar} />
              </div>
              <h3 style={teamStyles.name}>{m.name}</h3>
              <p style={teamStyles.role}>{m.role}</p>
              <p style={teamStyles.bio}>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Socials ──────────────────────────────────────────────────────────────────
function SocialsSection({ t, language }) {
  return (
    <section className="section" style={{ background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      <div className="blob" style={{ background: '#D4C6FF', width: 400, height: 400, bottom: -100, right: -80, opacity: 0.18 }} />

      <div className="section-inner">
        {/* CSS-only flag banner — no image dependency */}
        <div style={socialsImg.banner}>
          <div style={socialsImg.flagStrip} />
          <div style={socialsImg.overlay}>
            <span style={socialsImg.flagEmoji}>🇧🇬</span>
            <p style={socialsImg.overlayText}>
              {language === 'bg' ? 'Присъединете се към разговора' : 'Join the conversation'}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <span className="badge badge-yellow">{t.socials.badge}</span>
          <h2 className="section-heading">{t.socials.heading}</h2>
          <p className="section-body">{t.socials.body}</p>
        </div>

        <div className="grid-4">
          {SOCIALS.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ ...socStyles.card, background: s.gradient }}>
              <span style={socStyles.emoji}>{s.emoji}</span>
              <p style={socStyles.platform}>{s.name}</p>
              <p style={{ ...socStyles.handle, color: s.color }}>@bulgariansonline</p>
              <div style={{ ...socStyles.followBtn, borderColor: s.color, color: s.color }}>
                {language === 'bg' ? 'Последвай' : 'Follow'} →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCtaSection({ t }) {
  return (
    <section style={finalCta.wrap}>
      <div className="blob" style={{ background: '#C0182A', width: 600, height: 400, top: -100, left: '50%', transform: 'translateX(-60%)', opacity: 0.18 }} />
      <div className="blob" style={{ background: '#9B7FFF', width: 400, height: 400, bottom: -80, right: -60, opacity: 0.15 }} />

      <div style={finalCta.inner}>
        <div style={finalCta.card} className="float-slow">
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: 20 }}>✉️</span>
          <h2 style={finalCta.heading}>{t.finalCta.heading}</h2>
          <p style={finalCta.body}>{t.finalCta.body}</p>
          <Link to="/contact" className="btn btn-outline" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            {t.finalCta.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <>
      <HeroSection t={t} />
      <AboutSection t={t} language={language} />
      <SurveyCtaSection t={t} language={language} />
      <TeamSection t={t} />
      <SocialsSection t={t} language={language} />
      <FinalCtaSection t={t} />
    </>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const hero = {
  wrap: { position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' },
  imgOverlay: { position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', filter: 'brightness(0.55) saturate(0.8)' },
  gradient:   { position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(20,0,40,0.70) 0%,rgba(10,0,60,0.40) 60%,rgba(192,24,42,0.15) 100%)' },
  bubble:     { position: 'absolute', borderRadius: '50%', background: 'rgba(255,179,204,0.18)', pointerEvents: 'none' },
  content:    { position: 'relative', zIndex: 10, maxWidth: 1160, margin: '0 auto', padding: '140px 24px 120px', width: '100%' },
  h1: { fontFamily: 'Montserrat,sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem,6vw,4.8rem)', lineHeight: 1.1, color: '#FFF', maxWidth: 780, marginBottom: 24, letterSpacing: '-0.02em', textShadow: '0 4px 32px rgba(0,0,0,0.4)' },
  sub: { fontFamily: 'Montserrat,sans-serif', fontWeight: 500, fontSize: 'clamp(1rem,2vw,1.25rem)', color: 'rgba(255,255,255,0.85)', maxWidth: 560, lineHeight: 1.7, marginBottom: 40 },
  cta: { fontSize: '1.05rem', padding: '16px 40px' },
  waveBottom: { position: 'absolute', bottom: 0, left: 0, right: 0 },
}

const aboutCardBase = {
  position: 'absolute',
  width: 148,
  padding: '20px 16px',
  borderRadius: 22,
  boxShadow: '0 10px 36px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.95)',
  border: '2px solid rgba(255,255,255,0.92)',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  backdropFilter: 'blur(8px)',
  willChange: 'transform, opacity',
}

const aboutImgStrip = {
  wrap: {
    position: 'relative',
    height: 260,
    overflow: 'hidden',
    marginTop: 56,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 40%',
    display: 'block',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.8) 100%)',
  },
}

const midCta = {
  wrap: { position: 'relative', overflow: 'hidden' },
  // Bulgarian flag: white / green / red horizontal stripes
  flagBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 33.33%, #00966E 33.33%, #00966E 66.66%, #D62612 66.66%, #D62612 100%)',
  },
  flagOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(15,0,50,0.84) 0%, rgba(192,24,42,0.68) 100%)',
  },
  body: { fontFamily: 'Montserrat,sans-serif', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto 36px', lineHeight: 1.75 },
  stats: { display: 'flex', justifyContent: 'center', gap: 24, marginTop: 56, flexWrap: 'wrap' },
  statCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '28px 32px', minWidth: 140 },
  statValue: { fontFamily: 'Montserrat,sans-serif', fontWeight: 900, fontSize: '2rem', background: 'linear-gradient(135deg,#C0182A 0%,#9B7FFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  statLabel: { fontFamily: 'Montserrat,sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' },
}

const teamStyles = {
  card:       { padding: '40px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  avatarWrap: { width: 120, height: 120, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', overflow: 'hidden' },
  avatar:     { width: '100%', height: '100%', objectFit: 'cover' },
  name:       { fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#2D2D2D' },
  role:       { fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '0.8rem', color: '#C0182A', textTransform: 'uppercase', letterSpacing: '0.06em' },
  bio:        { fontFamily: 'Montserrat,sans-serif', fontSize: '0.88rem', color: '#777', lineHeight: 1.65 },
}

const socialsImg = {
  banner: { position: 'relative', height: 160, borderRadius: 32, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.1)', marginBottom: 48 },
  // Bulgarian flag stripes as banner background
  flagStrip: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 33%, #00966E 33%, #00966E 66%, #D62612 66%, #D62612 100%)' },
  overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(15,0,50,0.78) 0%, rgba(192,24,42,0.58) 100%)', display: 'flex', alignItems: 'center', gap: 20, padding: '24px 40px' },
  flagEmoji: { fontSize: '2.8rem', flexShrink: 0 },
  overlayText: { fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(1.3rem,3vw,2rem)', color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.4)' },
}

const socStyles = {
  card:      { display: 'flex', flexDirection: 'column', gap: 8, padding: '28px 24px', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)', border: '2px solid rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'transform 0.2s,box-shadow 0.2s', cursor: 'pointer' },
  emoji:     { fontSize: '2.5rem' },
  platform:  { fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#2D2D2D' },
  handle:    { fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '0.78rem' },
  followBtn: { display: 'inline-block', marginTop: 8, padding: '6px 14px', borderRadius: 999, border: '2px solid', fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: '0.78rem', width: 'fit-content' },
}

const finalCta = {
  wrap:    { position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg,#F5F2FF 0%,#FFF2F2 100%)', padding: '96px 24px' },
  inner:   { maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 },
  card:    { background: 'rgba(255,255,255,0.85)', borderRadius: 40, padding: '56px 48px', boxShadow: '0 20px 80px rgba(0,0,0,0.07),inset 0 2px 0 rgba(255,255,255,1)', border: '2.5px solid rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 },
  heading: { fontFamily: 'Montserrat,sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem,4vw,2.4rem)', color: '#2D2D2D', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 4 },
  body:    { fontFamily: 'Montserrat,sans-serif', fontSize: '1rem', color: '#777', lineHeight: 1.7, marginBottom: 8 },
}
