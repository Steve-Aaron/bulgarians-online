import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import translations from '../utils/translations.js'

// ─── Webhook config ───────────────────────────────────────────────────────────
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/'

// ─── Pill tags — Q1 multi-choice (max 3) ─────────────────────────────────────
const PILL_MAX = 3

function PillTags({ options, values, onChange }) {
  const atLimit = values.length >= PILL_MAX

  const toggle = (opt) => {
    if (values.includes(opt)) {
      onChange(values.filter(v => v !== opt))
    } else if (!atLimit) {
      onChange([...values, opt])
    }
    // silently block selection beyond the limit
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
        {options.map((opt, i) => {
          const sel = values.includes(opt)
          const disabled = !sel && atLimit
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(opt)}
              style={{
                padding: '9px 18px',
                borderRadius: 999,
                border: sel ? '2.5px solid #C0182A' : '2px solid rgba(0,0,0,0.1)',
                background: sel
                  ? 'linear-gradient(135deg, #FFF2F2 0%, #FFFFFF 100%)'
                  : disabled ? 'rgba(0,0,0,0.03)' : '#FFFFFF',
                color: sel ? '#C0182A' : disabled ? '#bbb' : '#555',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: sel ? 700 : 500,
                fontSize: '0.88rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s',
                boxShadow: sel
                  ? '0 3px 12px rgba(192,24,42,0.2)'
                  : '0 2px 6px rgba(0,0,0,0.05)',
                opacity: disabled ? 0.55 : 1,
              }}
            >
              {sel ? '✓ ' : ''}{opt}
            </button>
          )
        })}
      </div>
      {/* Selection counter */}
      <p style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '0.78rem',
        fontWeight: 600,
        color: atLimit ? '#C0182A' : '#aaa',
        marginTop: 14,
      }}>
        {values.length} / {PILL_MAX} selected
      </p>
    </div>
  )
}

// ─── Single-choice chips ──────────────────────────────────────────────────────
function SingleChoice({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          className={`choice-chip${value === opt ? ' selected' : ''}`}
          onClick={() => onChange(opt)}
        >
          <span className="chip-indicator" />
          {opt}
        </button>
      ))}
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div style={prog.wrap}>
      <div style={prog.track}>
        <div style={{ ...prog.fill, width: `${pct}%` }} />
      </div>
      <span style={prog.label}>{pct}%</span>
    </div>
  )
}

// ─── Survey Page ──────────────────────────────────────────────────────────────
export default function SurveyPage() {
  const { language } = useLanguage()
  const t = translations[language].survey

  // Derive question list dynamically so adding/removing questions in translations
  // automatically adjusts step count and progress.
  const questionKeys = Object.keys(t.questions)     // ['q1', 'q2', ..., 'q7']
  const totalSteps   = questionKeys.length + 1       // questions + personal details

  const [step,      setStep]      = useState(0)
  const [direction, setDirection] = useState('forward')
  const [animKey,   setAnimKey]   = useState(0)

  const [answers, setAnswers] = useState(() =>
    Object.fromEntries(questionKeys.map(k => [k, k === 'q1' ? [] : '']))
  )
  const [details,    setDetails]    = useState({ name: '', email: '', city: '', consent: false })
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [error,      setError]      = useState(null)

  const setAnswer = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }))

  const goNext = () => {
    setDirection('forward')
    setAnimKey(k => k + 1)
    setStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setDirection('back')
    setAnimKey(k => k + 1)
    setStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // Map question keys to readable payload field names
    const keyLabels = {
      q1: 'q1_priorities',
      q2: 'q2_good_job',
      q3: 'q3_unemployment',
      q4: 'q4_inflation',
      q5: 'q5_russia',
      q6: 'q6_eu',
      q7: 'q7_country_direction',
    }

    const payload = {
      timestamp: new Date().toISOString(),
      language,
      ...Object.fromEntries(
        questionKeys.map(k => [keyLabels[k] || k, answers[k]])
      ),
      name:  details.name,
      email: details.email,
      city:  details.city,
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors', // required for Zapier / Make.com
      })
      setSubmitted(true)
    } catch (err) {
      setError(t.errorBody)
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={pageStyles.successWrap}>
        <div style={pageStyles.successCard} className="float-slow">
          <span style={{ fontSize: '5rem', display: 'block', marginBottom: 24 }}>🎉</span>
          <h2 style={pageStyles.successTitle}>{t.successTitle}</h2>
          <p style={pageStyles.successBody}>{t.successBody}</p>
        </div>
      </div>
    )
  }

  const slideClass     = direction === 'forward' ? 'slide-in-right' : 'slide-in-left'
  const isPersonalStep = step === questionKeys.length
  const currentQKey    = !isPersonalStep ? questionKeys[step] : null
  const currentQ       = currentQKey ? t.questions[currentQKey] : null

  return (
    <div style={pageStyles.page}>

      {/* ── Hero banner ──────────────────────────────────────────────────────── */}
      <div style={pageStyles.heroBanner}>
        <div style={pageStyles.heroBannerBlob1} />
        <div style={pageStyles.heroBannerBlob2} />
        <div style={pageStyles.heroBannerInner}>
          <span className="badge badge-pink" style={{ position: 'relative', zIndex: 2 }}>
            {t.pageTitle}
          </span>
          <h1 style={pageStyles.heroTitle}>{t.pageTitle}</h1>
          <p style={pageStyles.heroSub}>{t.pageSubtitle}</p>
          <ProgressBar current={step + 1} total={totalSteps} />
          <p style={pageStyles.stepCount}>
            {isPersonalStep
              ? (language === 'bg' ? 'Последна стъпка' : 'Final step')
              : `${language === 'bg' ? 'Въпрос' : 'Question'} ${step + 1} / ${questionKeys.length}`
            }
          </p>
        </div>
      </div>

      {/* ── Question / details card ───────────────────────────────────────────── */}
      <div style={pageStyles.formWrap}>
        <div key={animKey} className={slideClass} style={pageStyles.stepWrap}>

          {!isPersonalStep ? (
            /* ── Regular question ──────────────────────────────────────────── */
            <div className="clay-card" style={qStyles.card}>
              <div style={qStyles.numberBadge}>
                <span style={qStyles.number}>{String(step + 1).padStart(2, '0')}</span>
              </div>
              <div style={qStyles.qBody}>
                <h3 style={qStyles.qText}>{currentQ.text}</h3>
                {currentQ.hint && <p style={qStyles.hint}>{currentQ.hint}</p>}

                {currentQKey === 'q1' ? (
                  <PillTags
                    options={currentQ.options}
                    values={answers.q1}
                    onChange={v => setAnswer('q1', v)}
                  />
                ) : currentQ.options ? (
                  <SingleChoice
                    options={currentQ.options}
                    value={answers[currentQKey]}
                    onChange={v => setAnswer(currentQKey, v)}
                  />
                ) : (
                  <textarea
                    className="form-textarea"
                    placeholder={t.freeText}
                    value={answers[currentQKey]}
                    onChange={e => setAnswer(currentQKey, e.target.value)}
                    rows={5}
                    style={{ fontSize: '0.95rem', marginTop: 20 }}
                  />
                )}
              </div>
            </div>
          ) : (
            /* ── Personal details ──────────────────────────────────────────── */
            <form onSubmit={handleSubmit}>
              <div className="clay-card" style={{ ...qStyles.card, flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>
                <h3 style={{ ...qStyles.qText, fontSize: '1.15rem', marginBottom: 8 }}>
                  {t.personalTitle}
                </h3>
                <p style={qStyles.hint}>{t.personalSubtitle}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
                  <input
                    className="form-input"
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={details.name}
                    onChange={e => setDetails(d => ({ ...d, name: e.target.value }))}
                  />
                  <input
                    className="form-input"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={details.email}
                    onChange={e => setDetails(d => ({ ...d, email: e.target.value }))}
                    required
                  />
                  <input
                    className="form-input"
                    type="text"
                    placeholder={t.cityPlaceholder}
                    value={details.city}
                    onChange={e => setDetails(d => ({ ...d, city: e.target.value }))}
                  />
                  <label style={qStyles.consentRow}>
                    <input
                      type="checkbox"
                      checked={details.consent}
                      onChange={e => setDetails(d => ({ ...d, consent: e.target.checked }))}
                      required
                      style={{ width: 18, height: 18, accentColor: '#C0182A', flexShrink: 0, cursor: 'pointer' }}
                    />
                    <span style={qStyles.consentText}>{t.consentLabel}</span>
                  </label>
                </div>

                {error && (
                  <div style={pageStyles.errorBanner}>
                    <span>⚠️</span> {error}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ fontSize: '1.05rem', padding: '16px 48px', minWidth: 220 }}
                    disabled={submitting || !details.consent}
                  >
                    {submitting ? t.submitting : `${t.submit} →`}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* ── Navigation row ────────────────────────────────────────────────── */}
        <div style={pageStyles.navRow}>
          {step > 0 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={goBack}
              style={{ padding: '12px 28px', fontSize: '0.9rem' }}
            >
              ← {t.backBtn}
            </button>
          )}
          <div style={{ flex: 1 }} />
          {!isPersonalStep && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={goNext}
              style={{ padding: '14px 36px' }}
            >
              {t.nextBtn} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const pageStyles = {
  page: {
    minHeight: '100vh',
    background: '#FAFAFA',
  },
  heroBanner: {
    background: 'linear-gradient(135deg, #FFF2F2 0%, #F5F2FF 60%, #F0F7FF 100%)',
    padding: '140px 24px 64px',
    position: 'relative',
    overflow: 'hidden',
  },
  heroBannerBlob1: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: '60% 40% 70% 30% / 50% 60% 40% 70%',
    background: '#F4ABAF',
    filter: 'blur(80px)',
    opacity: 0.2,
    top: -150,
    right: -100,
    pointerEvents: 'none',
  },
  heroBannerBlob2: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: '40% 60% 30% 70% / 60% 40% 70% 50%',
    background: '#B3D9FF',
    filter: 'blur(80px)',
    opacity: 0.18,
    bottom: -80,
    left: -60,
    pointerEvents: 'none',
  },
  heroBannerInner: {
    maxWidth: 760,
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  heroTitle: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    color: '#2D2D2D',
    letterSpacing: '-0.02em',
    marginBottom: 16,
    lineHeight: 1.15,
  },
  heroSub: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1rem',
    color: '#777',
    marginBottom: 32,
    lineHeight: 1.7,
  },
  stepCount: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '0.8rem',
    color: '#aaa',
    marginTop: 10,
  },
  formWrap: {
    maxWidth: 760,
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  stepWrap: {
    marginBottom: 0,
  },
  navRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 28,
    gap: 16,
  },
  errorBanner: {
    background: '#FFF2F2',
    border: '2px solid #C0182A',
    borderRadius: 16,
    padding: '16px 20px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    color: '#850011',
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  successWrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #FFF2F2 0%, #F5F2FF 100%)',
    padding: 24,
  },
  successCard: {
    background: 'rgba(255,255,255,0.9)',
    borderRadius: 40,
    padding: '64px 56px',
    textAlign: 'center',
    maxWidth: 500,
    boxShadow: '0 20px 80px rgba(0,0,0,0.07), inset 0 2px 0 rgba(255,255,255,1)',
    border: '2.5px solid rgba(255,255,255,0.95)',
  },
  successTitle: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 900,
    fontSize: '2.2rem',
    color: '#2D2D2D',
    marginBottom: 16,
    letterSpacing: '-0.02em',
  },
  successBody: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1rem',
    color: '#777',
    lineHeight: 1.7,
  },
}

const qStyles = {
  card: {
    padding: '36px 32px',
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
  },
  numberBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    background: 'linear-gradient(135deg, #C0182A 0%, #9B7FFF 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
  },
  number: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 900,
    fontSize: '1rem',
    color: 'white',
    letterSpacing: '0.02em',
  },
  qBody: {
    flex: 1,
  },
  qText: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '1.05rem',
    color: '#2D2D2D',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  hint: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.82rem',
    color: '#aaa',
    fontWeight: 500,
    fontStyle: 'italic',
    marginTop: 4,
  },
  consentRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    cursor: 'pointer',
    padding: '14px 16px',
    borderRadius: 14,
    background: 'rgba(0,0,0,0.02)',
    border: '1.5px solid rgba(0,0,0,0.07)',
  },
  consentText: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.88rem',
    color: '#555',
    lineHeight: 1.55,
  },
}

const prog = {
  wrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    maxWidth: 500,
  },
  track: {
    flex: 1,
    height: 10,
    background: 'rgba(0,0,0,0.08)',
    borderRadius: 999,
    overflow: 'hidden',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
  },
  fill: {
    height: '100%',
    background: 'linear-gradient(90deg, #C0182A 0%, #9B7FFF 50%, #5BADFF 100%)',
    borderRadius: 999,
    transition: 'width 0.5s cubic-bezier(0.34,1.56,0.64,1)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
  label: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '0.85rem',
    color: '#C0182A',
    minWidth: 36,
  },
}
