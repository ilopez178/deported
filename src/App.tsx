// src/App.tsx
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { QUESTIONS } from '@/data/questions'
import { shuffleArray } from '@utils/helpers'
import type { Question } from '@types'
import { supabase } from '@/lib/supabase'

// ── Constants ────────────────────────────────────────────────────────────────

const QUIZ_LENGTH = 10
const PASS_SCORE = 7 // 70% — actual USCIS passing threshold
// Leaderboard is now stored in Supabase — see src/lib/supabase.ts
const PLAYER_KEY = 'deported_player'

const savePlayer = (name: string, deported: boolean) =>
  localStorage.setItem(PLAYER_KEY, JSON.stringify({ name, deported }))

const loadPlayer = (): { name: string; deported: boolean } | null => {
  try { return JSON.parse(localStorage.getItem(PLAYER_KEY) ?? 'null') } catch { return null }
}

const CORRECT_QUIPS = [
  '🦅 Freedom secured!',
  '🎩 Uncle Sam approves!',
  '⭐ Stars & stripes for you!',
  '🏛️ The Founding Fathers are smiling',
  '📖 You\'ve read the pamphlet!',
  '📜 Constitutional scholar!',
  '🇺🇸 That\'s what Americans know!',
  '🗽 Lady Liberty is pleased',
  '✅ This person stays!',
  '🍔 You\'ve earned your freedom fries',
]

const WRONG_QUIPS = [
  '☎️ ICE is dialing...',
  '🧳 Your bags are being packed',
  '😬 That\'s not very American of you',
  '🚨 Border patrol raised an eyebrow',
  '😅 Even tourists know this one',
  '🫡 Please report to your nearest embassy',
  '😰 Your visa is under review...',
  '🦅 The bald eagle weeps',
  '📋 Deportation paperwork filed',
  '✈️ One-way ticket, printing...',
]

const RESULT_TIERS: Array<{
  min: number; emoji: string; title: string; sub: string
  badge: string; pass: boolean; color: string
}> = [
  {
    min: 10, emoji: '🦅🎆', pass: true, color: '#22c55e',
    badge: 'PERFECT AMERICAN',
    title: 'Fully Certified American',
    sub: 'Perfect score. You might actually be more American than most Americans. The bald eagle shed a single patriotic tear.',
  },
  {
    min: 9, emoji: '🇺🇸🎉', pass: true, color: '#22c55e',
    badge: 'CLEARED',
    title: 'Practically American',
    sub: 'You can stay. You\'ve more than earned your freedom fries and your right to complain about traffic.',
  },
  {
    min: 8, emoji: '✅', pass: true, color: '#22c55e',
    badge: 'YOU PASS',
    title: 'American Enough',
    sub: 'You passed! Just don\'t bring up the Electoral College at Thanksgiving dinner.',
  },
  {
    min: 7, emoji: '😅', pass: true, color: '#f59e0b',
    badge: 'BARELY LEGAL',
    title: 'Squeaking By',
    sub: 'You technically passed with the minimum. Maybe put down your phone and read a history book. Just a thought.',
  },
  {
    min: 5, emoji: '⚠️', pass: false, color: '#f59e0b',
    badge: 'DEPORTATION RISK',
    title: 'On Thin Ice',
    sub: 'You needed 7 and didn\'t make it. One more right and you\'d have stayed. Consider yourself warned.',
  },
  {
    min: 3, emoji: '🧳', pass: false, color: '#ef4444',
    badge: 'PACK YOUR BAGS',
    title: 'Pack Your Bags',
    sub: 'The airline ticket is printing. We hope you enjoyed your stay. It was fun while it lasted.',
  },
  {
    min: 0, emoji: '✈️', pass: false, color: '#ef4444',
    badge: 'DEPORTED',
    title: 'Absolutely Not',
    sub: 'Immediate deportation. No appeal. No second chances. Security will escort you out. Goodbye!',
  },
]

const getTier = (score: number) =>
  RESULT_TIERS.find(t => score >= t.min) ?? RESULT_TIERS[RESULT_TIERS.length - 1]

const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

// ── Leaderboard ───────────────────────────────────────────────────────────────

interface LeaderboardEntry {
  name: string
  score: number
  timeSeconds: number
  passed: boolean
  date: number
}

const loadLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
    if (error) throw error
    type DBRow = { name: string; score: number; time_seconds: number | null; passed: boolean; date: number }
    return (data ?? []).map((row: DBRow) => ({
      name: row.name,
      score: row.score,
      timeSeconds: row.time_seconds ?? 0,
      passed: row.passed,
      date: row.date,
    }))
  } catch {
    return []
  }
}

const saveToLeaderboard = async (entry: LeaderboardEntry): Promise<void> => {
  try {
    // Always replace — each player has exactly one entry (their most recent result).
    // Requires DELETE policy on the leaderboard table for the anon role.
    const { error: deleteError } = await supabase
      .from('leaderboard')
      .delete()
      .ilike('name', entry.name)
    if (deleteError) console.error('Leaderboard delete failed (check RLS policy):', deleteError)

    const { error: insertError } = await supabase.from('leaderboard').insert({
      name: entry.name,
      score: entry.score,
      time_seconds: entry.timeSeconds ?? null,
      passed: entry.passed,
      date: entry.date,
    })
    if (insertError) console.error('Leaderboard insert failed:', insertError)
  } catch (e) {
    console.error('Failed to save to leaderboard:', e)
  }
}

const formatDate = (ts: number) => {
  const d = new Date(ts)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

// ── Confetti ─────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7','#ec4899','#06b6d4','#f97316']

const Confetti: React.FC = () => {
  const pieces = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: `${(i / 60) * 100 + (Math.random() - 0.5) * 3}%`,
    delay: `${Math.random() * 2.5}s`,
    duration: `${2.5 + Math.random() * 2}s`,
    size: `${7 + Math.random() * 9}px`,
    circle: i % 3 === 0,
  })), [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 999 }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute', top: '-24px', left: p.left,
          width: p.size, height: p.size, background: p.color,
          borderRadius: p.circle ? '50%' : '2px',
          animation: `confettiFall ${p.duration} ${p.delay} linear forwards`,
        }} />
      ))}
    </div>
  )
}

// ── Deportation-o-meter ───────────────────────────────────────────────────────

const DeportationMeter: React.FC<{ wrongCount: number }> = ({ wrongCount }) => {
  const safetyPct = ((QUIZ_LENGTH - wrongCount) / QUIZ_LENGTH) * 100

  const gradient =
    safetyPct >= 80
      ? 'linear-gradient(90deg, #059669, #10b981, #34d399, #a7f3d0)'
      : safetyPct >= 70
      ? 'linear-gradient(90deg, #16a34a, #22c55e, #84cc16, #d9f99d)'
      : safetyPct >= 50
      ? 'linear-gradient(90deg, #d97706, #f59e0b, #fbbf24, #fde68a)'
      : safetyPct >= 30
      ? 'linear-gradient(90deg, #ea580c, #f97316, #fb923c, #fdba74)'
      : 'linear-gradient(90deg, #991b1b, #dc2626, #ef4444, #fca5a5)'

  const labelColor =
    safetyPct >= 70 ? '#34d399' :
    safetyPct >= 50 ? '#fbbf24' :
                      '#f87171'

  const label =
    safetyPct === 100 ? "You're Safe 🟢" :
    safetyPct >= 90   ? 'Still Solid 🟢' :
    safetyPct >= 70   ? 'Passing... Barely 🟡' :
    safetyPct >= 50   ? 'DANGER ZONE 🟠' :
    safetyPct > 0     ? 'PACK YOUR BAGS 🔴' :
                        'DEPORTED ✈️'

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px',
      }}>
        <span>Residency Status</span>
        <span style={{ color: labelColor, transition: 'color 0.8s ease' }}>{label}</span>
      </div>
      <div style={{
        height: '14px', background: '#111', borderRadius: '99px',
        overflow: 'hidden', border: '1px solid #252525',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          height: '100%',
          width: `${safetyPct}%`,
          background: gradient,
          borderRadius: '99px',
          transition: 'width 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: `0 0 18px 2px ${safetyPct >= 70 ? '#10b98166' : safetyPct >= 50 ? '#f59e0b66' : '#ef444466'}`,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 55%)',
            borderRadius: '99px',
          }} />
        </div>
      </div>

      <div style={{ position: 'relative', height: '10px', marginTop: '4px' }}>
        <div style={{
          position: 'absolute', left: '70%',
          transform: 'translateX(-50%)',
          fontSize: '0.6rem', color: 'var(--muted)', fontWeight: 700,
          letterSpacing: '0.04em', whiteSpace: 'nowrap',
        }}>
          │ pass line
        </div>
      </div>
    </div>
  )
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const page: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: 'var(--bg)',
}

const card: React.CSSProperties = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '20px',
  padding: 'clamp(24px, 4vw, 48px)',
  width: '100%',
}

// ── Inline Leaderboard (used on home screen) ──────────────────────────────────

const InlineLeaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard().then(data => { setEntries(data); setLoading(false) })
  }, [])

  const stayed = entries
    .filter(e => e.passed)
    .sort((a, b) => b.score - a.score || (a.timeSeconds ?? 9999) - (b.timeSeconds ?? 9999))
    .slice(0, 10)

  const deported = entries
    .filter(e => !e.passed)
    .sort((a, b) => b.score - a.score || (a.timeSeconds ?? 9999) - (b.timeSeconds ?? 9999))

  const LbSection = () => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      <div style={{
        fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: 'var(--white)',
        display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
      }}>
        🏆 Federal Screening Record
      </div>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </div>
  )

  if (loading) return (
    <div style={{ marginTop: '32px' }}>
      <LbSection />
      <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.8rem', padding: '20px' }}>
        Loading records...
      </div>
    </div>
  )

  if (entries.length === 0) return (
    <div style={{ marginTop: '32px' }}>
      <LbSection />
      <div style={{
        padding: '20px',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '14px', textAlign: 'center',
      }}>
        <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
          No one has been screened yet.<br />Be the first on the board.
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ marginTop: '32px', textAlign: 'left' }}>
      <LbSection />

      {stayed.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#22c55e', marginBottom: '8px',
          }}>🇺🇸 Stayed!</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {stayed.map((e, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 12px',
                background: i === 0 ? '#052e16' : 'var(--surface)',
                border: `1px solid ${i === 0 ? '#16a34a44' : 'var(--border)'}`,
                borderRadius: '8px',
              }}>
                <span style={{ fontSize: '0.75rem', minWidth: '20px', flexShrink: 0, color: 'var(--muted)' }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                </span>
                <span style={{ flex: 1, fontWeight: 700, color: 'var(--white)', fontSize: '0.875rem', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#22c55e', flexShrink: 0 }}>{e.score}/10</span>
                {e.timeSeconds != null && <span style={{ fontSize: '0.68rem', color: 'var(--accent)', fontWeight: 600, flexShrink: 0 }}>⏱ {formatTime(e.timeSeconds)}</span>}
                <span className="lb-date" style={{ fontSize: '0.68rem', color: 'var(--muted)', flexShrink: 0 }}>{formatDate(e.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {deported.length > 0 && (
        <div>
          <div style={{
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#ef4444', marginBottom: '8px',
          }}>✈️ Deported!</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {deported.map((e, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 12px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '8px', opacity: 0.75,
              }}>
                <span style={{ fontSize: '0.8rem', flexShrink: 0 }}>🧳</span>
                <span style={{ flex: 1, fontWeight: 600, color: 'var(--text)', fontSize: '0.875rem', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444', flexShrink: 0 }}>{e.score}/10</span>
                {e.timeSeconds != null && <span style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 600, flexShrink: 0 }}>⏱ {formatTime(e.timeSeconds)}</span>}
                <span className="lb-date" style={{ fontSize: '0.68rem', color: 'var(--muted)', flexShrink: 0 }}>{formatDate(e.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Menu Screen ───────────────────────────────────────────────────────────────

const MenuScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div style={{ ...page, alignItems: 'flex-start', paddingTop: '40px', paddingBottom: '40px' }}>
    <div style={{ ...card, maxWidth: '520px', textAlign: 'center' }} className="slide-in">

      <div style={{ fontSize: '3.5rem', marginBottom: '16px' }} className="floating">🚨</div>

      <div style={{
        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em',
        color: '#ef4444', marginBottom: '16px', textTransform: 'uppercase',
      }} className="siren">
        ⚠ U.S. Citizenship Screening System ⚠
      </div>

      <h1 style={{
        fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontWeight: 900,
        color: 'var(--white)', marginBottom: '8px', lineHeight: 1.1,
        letterSpacing: '-0.02em',
      }}>
        Should You Get<br />
        <span style={{ color: '#ef4444' }}>Deported?</span>
      </h1>

      <p style={{
        color: 'var(--text)', fontSize: '1.05rem', lineHeight: 1.7,
        maxWidth: '380px', margin: '0 auto 4px',
      }}>
        {QUIZ_LENGTH} random citizenship test questions.{' '}
        You need <strong style={{ color: 'var(--white)' }}>{PASS_SCORE} right</strong> to stay in America.
      </p>
      <p style={{
        color: 'var(--muted)', fontSize: '0.9375rem', lineHeight: 1.5,
        maxWidth: '380px', margin: '0 auto 28px',
      }}>
        How American are <em style={{ color: 'var(--white)', fontStyle: 'italic' }}>you</em>, really?
      </p>

      <button onClick={onStart} className="primary-btn" style={{ maxWidth: '320px', margin: '0 auto', display: 'block' }}>
        Begin Screening →
      </button>

      <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '20px', lineHeight: 1.5 }}>
        Based on actual USCIS naturalization test questions.<br />
        No lawyers were harmed in the making of this quiz.
      </p>

      <InlineLeaderboard />
    </div>
  </div>
)

// ── Name Screen ───────────────────────────────────────────────────────────────

const NameScreen: React.FC<{ onSubmit: (name: string) => void; onBack: () => void; defaultName?: string }> = ({ onSubmit, onBack, defaultName = '' }) => {
  const [name, setName] = useState(defaultName)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed) onSubmit(trimmed)
  }

  // When the keyboard opens on mobile it shrinks the viewport — scroll the
  // input into view so it's not hidden behind the keyboard.
  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 320)
  }

  return (
    <div style={{ ...page, alignItems: 'flex-start', paddingTop: '32px', paddingBottom: '32px' }}>
      <div style={{ ...card, maxWidth: '480px', textAlign: 'center', width: '100%' }} className="slide-in">

        <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🪪</div>

        <div style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em',
          color: '#ef4444', marginBottom: '16px', textTransform: 'uppercase',
        }} className="siren">
          Identity Verification Required
        </div>

        <h2 style={{
          fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 900,
          color: 'var(--white)', marginBottom: '8px', lineHeight: 1.15,
        }}>
          State Your Name,<br />
          <span style={{ color: '#ef4444' }}>Citizen.</span>
        </h2>

        <p style={{
          color: 'var(--text)', fontSize: '0.9375rem', lineHeight: 1.6,
          marginBottom: '28px',
        }}>
          Your full name will be logged in the federal screening database.<br />
          <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>(And the leaderboard.)</span>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
            onFocus={handleFocus}
            placeholder="First and last name"
            maxLength={50}
            autoFocus
            style={{
              display: 'block', width: '100%',
              padding: '16px 18px', marginBottom: '12px',
              background: 'var(--surface)',
              border: `1px solid ${name.trim() ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '12px',
              color: 'var(--white)', fontSize: '1.0625rem',
              fontFamily: 'inherit', fontWeight: 600,
              outline: 'none',
              transition: 'border-color 0.15s',
              textAlign: 'center',
            }}
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="primary-btn safe-btn"
            style={{ opacity: name.trim() ? 1 : 0.4, transition: 'opacity 0.2s' }}
          >
            Submit for Processing →
          </button>
        </form>

        <button
          onClick={onBack}
          style={{
            marginTop: '16px', background: 'none', border: 'none',
            color: 'var(--muted)', fontSize: '0.8rem', cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

// ── Quiz Screen ───────────────────────────────────────────────────────────────

interface QuizScreenProps {
  question: Question
  questionNumber: number
  total: number
  score: number
  wrongCount: number
  selectedAnswer: string | null
  isCorrect: boolean | null
  quip: string
  startTime: number
  onAnswer: (a: string) => void
  onNext: () => void
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  question, questionNumber, total, score, wrongCount,
  selectedAnswer, isCorrect, quip, startTime, onAnswer, onNext,
}) => {
  const answered = selectedAnswer !== null
  const progressPct = ((questionNumber - 1) / total) * 100

  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [startTime])

  return (
    <div style={page}>
      <div style={{ ...card, maxWidth: '640px' }}>

        {/* Quip banner — top of card, only shows after answering */}
        {answered && (
          <div className="pop-in" style={{
            marginBottom: '20px',
            padding: '18px 20px',
            background: isCorrect
              ? 'linear-gradient(135deg, #052e16 0%, #0a3d1f 100%)'
              : 'linear-gradient(135deg, #1f0808 0%, #3a0d0d 100%)',
            border: `2px solid ${isCorrect ? '#16a34a' : '#dc2626'}`,
            borderRadius: '14px',
            textAlign: 'center',
            boxShadow: isCorrect
              ? '0 0 28px rgba(22, 163, 74, 0.25)'
              : '0 0 28px rgba(220, 38, 38, 0.25)',
          }}>
            <div style={{
              fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
              fontWeight: 900,
              color: isCorrect ? '#4ade80' : '#f87171',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
            }}>
              {quip}
            </div>
          </div>
        )}

        <DeportationMeter wrongCount={wrongCount} />

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '8px',
        }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em',
          }}>
            Interrogation {questionNumber} of {total}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              fontSize: '0.78rem', fontWeight: 700,
              color: elapsed >= 120 ? '#f87171' : elapsed >= 60 ? '#fbbf24' : 'var(--accent)',
              fontVariantNumeric: 'tabular-nums',
              transition: 'color 0.5s ease',
            }}>
              ⏱ {formatTime(elapsed)}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 700 }}>
              ✓ {score}
            </span>
          </div>
        </div>

        <div style={{ height: '4px', background: 'var(--surface)', borderRadius: '99px', overflow: 'hidden', marginBottom: '32px', border: '1px solid var(--border)' }}>
          <div style={{
            height: '100%', width: `${progressPct}%`,
            background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
            borderRadius: '99px', transition: 'width 0.4s ease',
          }} />
        </div>

        <div key={questionNumber} className="slide-in">
          <div style={{
            fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px',
          }}>
            {question.category}
          </div>

          <h2 style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)', fontWeight: 700,
            color: 'var(--white)', marginBottom: '24px', lineHeight: 1.45,
          }}>
            {question.q}
          </h2>

          {question.options.map((opt) => {
            const isThisCorrect = opt === question.correct
            const isThisSelected = opt === selectedAnswer

            let cls = 'option-btn'
            let style: React.CSSProperties = {}

            if (answered) {
              if (isThisCorrect) {
                cls += ' pop-in'
                style = { background: '#052e16', borderColor: '#16a34a', color: '#86efac', fontWeight: 600 }
              } else if (isThisSelected) {
                cls += ' shake'
                style = { background: '#3f0808', borderColor: '#dc2626', color: '#fca5a5', fontWeight: 600 }
              } else {
                style = { opacity: 0.28 }
              }
            }

            return (
              <button
                key={opt}
                className={cls}
                style={style}
                onClick={() => !answered && onAnswer(opt)}
                disabled={answered}
              >
                {answered && isThisCorrect && '✓  '}
                {answered && isThisSelected && !isThisCorrect && '✗  '}
                {opt}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="fade-up" style={{ marginTop: '20px' }}>
            <button
              onClick={onNext}
              className="primary-btn safe-btn"
            >
              {questionNumber >= total ? 'See Your Verdict  →' : 'Next Question  →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Result Screen ─────────────────────────────────────────────────────────────

const ResultScreen: React.FC<{
  score: number
  playerName: string
  wasDeportedRetry: boolean
  onRestart: () => void
  onLeaderboard: () => void
}> = ({ score, playerName, wasDeportedRetry, onRestart, onLeaderboard }) => {
  const tier = getTier(score)
  const pct = Math.round((score / QUIZ_LENGTH) * 100)
  const wrongCount = QUIZ_LENGTH - score

  const [allEntries, setAllEntries] = useState<LeaderboardEntry[]>([])
  useEffect(() => { loadLeaderboard().then(setAllEntries) }, [])

  const deportedList = allEntries
    .filter(e => !e.passed)
    .sort((a, b) => b.score - a.score || (a.timeSeconds ?? 9999) - (b.timeSeconds ?? 9999))
  const stayedList = allEntries
    .filter(e => e.passed)
    .sort((a, b) => b.score - a.score || (a.timeSeconds ?? 9999) - (b.timeSeconds ?? 9999))
    .slice(0, 10)

  const myDeportedIdx = (() => { let r = -1; deportedList.forEach((e, i) => { if (e.name.toLowerCase() === playerName.toLowerCase()) r = i }); return r })()
  const myStayedIdx  = (() => { let r = -1; stayedList.forEach((e, i) => { if (e.name.toLowerCase() === playerName.toLowerCase()) r = i }); return r })()

  return (
    <>
      {tier.pass && <Confetti />}
      <div style={{ ...page, alignItems: 'flex-start', paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{ ...card, maxWidth: '520px', textAlign: 'center' }} className="fade-up">

          <div style={{
            display: 'inline-block',
            border: `3px solid ${tier.color}`,
            borderRadius: '8px',
            padding: '4px 14px',
            fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em',
            color: tier.color, textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }} className="stamp-in">
            {tier.badge}
          </div>

          <div style={{
            fontSize: '5rem', marginBottom: '1rem',
            animation: tier.pass ? 'float 2.5s ease-in-out infinite' : 'none',
          }}>
            {tier.emoji}
          </div>

          <div style={{
            fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px',
          }}>
            Verdict for
          </div>
          <div style={{
            fontSize: '1.5rem', fontWeight: 900, color: 'var(--white)',
            marginBottom: '8px', letterSpacing: '-0.01em',
          }}>
            {playerName}
          </div>

          <h1 style={{
            fontSize: 'clamp(1.2rem, 3.5vw, 1.7rem)', fontWeight: 900,
            color: tier.pass ? 'var(--white)' : '#ef4444',
            marginBottom: '8px', lineHeight: 1.15,
          }}>
            {tier.title}
          </h1>

          <p style={{ color: 'var(--text)', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '24px' }}>
            {tier.sub}
          </p>

          {/* Redemption banner for paid retries */}
          {wasDeportedRetry && tier.pass && (
            <div className="pop-in" style={{
              background: 'linear-gradient(135deg, #052e16 0%, #0a3d1f 100%)',
              border: '2px solid #16a34a',
              borderRadius: '14px', padding: '18px 20px',
              textAlign: 'center', marginBottom: '20px',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🎉</div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#4ade80', marginBottom: '4px' }}>
                You're Off the Shame Wall!
              </div>
              <div style={{ fontSize: '0.825rem', color: '#86efac', lineHeight: 1.5 }}>
                Your deportation record has been wiped. You paid your debt to society
                and proved you belong here. Welcome back, citizen.
              </div>
            </div>
          )}

          {wasDeportedRetry && !tier.pass && (
            <div className="pop-in" style={{
              background: 'linear-gradient(135deg, #1f0808 0%, #3a0d0d 100%)',
              border: '2px solid #dc2626',
              borderRadius: '14px', padding: '18px 20px',
              textAlign: 'center', marginBottom: '20px',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>✈️</div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#f87171', marginBottom: '4px' }}>
                Still Deported. Again.
              </div>
              <div style={{ fontSize: '0.825rem', color: '#fca5a5', lineHeight: 1.5 }}>
                You paid $1, took the test again, and still got deported.
                Your shame record has been updated. No refunds.
              </div>
            </div>
          )}

          {/* Score card */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px',
            padding: '24px', marginBottom: '16px',
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px',
          }}>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: tier.color }}>{score}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Correct</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: wrongCount > (QUIZ_LENGTH - PASS_SCORE) ? '#ef4444' : '#f59e0b' }}>{wrongCount}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Wrong</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: tier.color }}>{pct}%</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Score</div>
            </div>
          </div>

          <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '20px' }}>
            USCIS passing score is 7/10 · {tier.pass
              ? score === PASS_SCORE ? 'Minimum pass — cutting it close!'
              : `You beat it by ${score - PASS_SCORE} ${score - PASS_SCORE === 1 ? 'question' : 'questions'}`
              : `You missed by ${PASS_SCORE - score} ${PASS_SCORE - score === 1 ? 'question' : 'questions'}`}
          </p>

          {/* Inline leaderboard position */}
          {tier.pass && stayedList.length > 0 && (
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#22c55e', marginBottom: '8px' }}>
                🇺🇸 Your Rank — Stayed!
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {stayedList.map((e, i) => {
                  const isMe = i === myStayedIdx
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '9px 13px',
                      background: isMe ? '#052e16' : 'var(--surface)',
                      border: `1px solid ${isMe ? '#16a34a' : 'var(--border)'}`,
                      borderRadius: '8px',
                      transform: isMe ? 'scale(1.02)' : 'none',
                      transition: 'transform 0.2s',
                    }}>
                      <span style={{ fontSize: '0.75rem', minWidth: '18px', color: isMe ? '#f59e0b' : 'var(--muted)' }}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                      </span>
                      <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: isMe ? 800 : 600, color: isMe ? 'var(--white)' : 'var(--text)', fontSize: '0.875rem' }}>{e.name}{isMe ? ' ← you' : ''}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#22c55e', flexShrink: 0 }}>{e.score}/10</span>
                      {e.timeSeconds != null && <span style={{ fontSize: '0.68rem', color: 'var(--accent)', flexShrink: 0 }}>⏱ {formatTime(e.timeSeconds)}</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {!tier.pass && deportedList.length > 0 && (
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ef4444', marginBottom: '8px' }}>
                ✈️ Your Spot — The Shame Wall
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {deportedList.map((e, i) => {
                  const isMe = i === myDeportedIdx
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '9px 13px',
                      background: isMe ? '#1f0808' : 'var(--surface)',
                      border: `1px solid ${isMe ? '#dc2626' : 'var(--border)'}`,
                      borderRadius: '8px',
                      transform: isMe ? 'scale(1.02)' : 'none',
                      opacity: isMe ? 1 : 0.65,
                    }}>
                      <span style={{ fontSize: '0.8rem' }}>🧳</span>
                      <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: isMe ? 800 : 600, color: isMe ? '#fca5a5' : 'var(--text)', fontSize: '0.875rem' }}>{e.name}{isMe ? ' ← you' : ''}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444', flexShrink: 0 }}>{e.score}/10</span>
                      {e.timeSeconds != null && <span style={{ fontSize: '0.68rem', color: 'var(--muted)', flexShrink: 0 }}>⏱ {formatTime(e.timeSeconds)}</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* CTAs */}
          <button onClick={onRestart} className={`primary-btn${tier.pass ? ' safe-btn' : ''}`} style={{
            background: tier.pass ? undefined : '#ef4444',
            marginBottom: '10px',
          }}>
            Try Again {tier.pass ? '' : '→'}
          </button>

          {tier.pass && (
            <button onClick={onLeaderboard} style={{
              display: 'block', width: '100%', padding: '13px',
              background: 'transparent', border: '1px solid #16a34a55',
              borderRadius: '12px', color: '#16a34a', fontSize: '0.875rem',
              fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
            }}>
              🏆 View Full Leaderboard
            </button>
          )}
        </div>
      </div>
    </>
  )
}

// ── Leaderboard Screen ────────────────────────────────────────────────────────

const LeaderboardScreen: React.FC<{ onBack: () => void; onPlay: () => void }> = ({ onBack, onPlay }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    loadLeaderboard().then(setEntries)
  }, [])

  const stayed = entries
    .filter(e => e.passed)
    .sort((a, b) => b.score - a.score || (a.timeSeconds ?? 9999) - (b.timeSeconds ?? 9999))
    .slice(0, 10)

  const deported = entries
    .filter(e => !e.passed)
    .sort((a, b) => b.score - a.score || (a.timeSeconds ?? 9999) - (b.timeSeconds ?? 9999))

  return (
    <div style={{ ...page, alignItems: 'flex-start', paddingTop: '40px', paddingBottom: '40px' }}>
      <div style={{ ...card, maxWidth: '600px' }} className="slide-in">

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏆</div>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900,
            color: 'var(--white)', letterSpacing: '-0.02em',
          }}>
            Screening Results
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '6px' }}>
            The official federal record of who stays and who goes
          </p>
        </div>

        {/* Stayed section */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '12px',
          }}>
            <span style={{ fontSize: '1.1rem' }}>🇺🇸</span>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#22c55e',
            }}>
              Stayed! — Top 10
            </span>
          </div>

          {stayed.length === 0 ? (
            <div style={{
              padding: '20px', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: '12px',
              color: 'var(--muted)', fontSize: '0.875rem', textAlign: 'center',
            }}>
              No survivors yet. Be the first to pass!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {stayed.map((e, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px',
                  background: i === 0 ? '#052e16' : 'var(--surface)',
                  border: `1px solid ${i === 0 ? '#16a34a' : 'var(--border)'}`,
                  borderRadius: '10px',
                }}>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 900, color: i < 3 ? '#f59e0b' : 'var(--muted)',
                    minWidth: '20px', textAlign: 'center',
                  }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </span>
                  <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 700, color: 'var(--white)', fontSize: '0.9375rem' }}>
                    {e.name}
                  </span>
                  <span style={{
                    fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
                    color: '#22c55e', minWidth: '44px', textAlign: 'right',
                  }}>
                    {e.score}/10
                  </span>
                  {e.timeSeconds != null && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, flexShrink: 0, minWidth: '48px', textAlign: 'right' }}>
                      ⏱ {formatTime(e.timeSeconds)}
                    </span>
                  )}
                  <span className="lb-date" style={{ fontSize: '0.72rem', color: 'var(--muted)', flexShrink: 0, minWidth: '40px', textAlign: 'right' }}>
                    {formatDate(e.date)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deported section */}
        {deported.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: '12px',
            }}>
              <span style={{ fontSize: '1.1rem' }}>✈️</span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#ef4444',
              }}>
                Deported! — The Shame Wall
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {deported.map((e, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 16px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  opacity: 0.8,
                }}>
                  <span style={{ fontSize: '0.85rem' }}>🧳</span>
                  <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>
                    {e.name}
                  </span>
                  <span style={{
                    fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
                    color: '#ef4444', minWidth: '44px', textAlign: 'right',
                  }}>
                    {e.score}/10
                  </span>
                  {e.timeSeconds != null && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, flexShrink: 0, minWidth: '48px', textAlign: 'right' }}>
                      ⏱ {formatTime(e.timeSeconds)}
                    </span>
                  )}
                  <span className="lb-date" style={{ fontSize: '0.72rem', color: 'var(--muted)', flexShrink: 0, minWidth: '40px', textAlign: 'right' }}>
                    {formatDate(e.date)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={onPlay} className="primary-btn safe-btn" style={{ marginBottom: '10px' }}>
          Take the Test →
        </button>

        <button onClick={onBack} style={{
          width: '100%', padding: '12px', background: 'transparent',
          border: '1px solid var(--border)', borderRadius: '12px',
          color: 'var(--muted)', fontSize: '0.875rem', fontWeight: 600,
          fontFamily: 'inherit', cursor: 'pointer',
        }}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

// ── Paywall Screen ────────────────────────────────────────────────────────────

const PaywallScreen: React.FC<{
  playerName: string
  score: number
  onPay: () => void
  onDecline: () => void
}> = ({ playerName, score, onPay, onDecline }) => {
  const [clicked, setClicked] = useState(false)

  const handlePay = () => {
    setClicked(true)
    setTimeout(() => onPay(), 1600)
  }

  return (
    <div style={page}>
      <div style={{ ...card, maxWidth: '500px', textAlign: 'center' }} className="slide-in">

        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⛓️</div>

        <div style={{
          display: 'inline-block',
          border: '2px solid #ef4444',
          borderRadius: '6px',
          padding: '3px 12px',
          fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.2em',
          color: '#ef4444', textTransform: 'uppercase',
          marginBottom: '20px',
        }} className="stamp-in">
          Federal Record Locked
        </div>

        <h2 style={{
          fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 900,
          color: 'var(--white)', marginBottom: '12px', lineHeight: 1.15,
        }}>
          Your name is on<br />
          <span style={{ color: '#ef4444' }}>The Shame Wall.</span>
        </h2>

        <p style={{
          color: 'var(--text)', fontSize: '0.9375rem', lineHeight: 1.65,
          marginBottom: '24px',
        }}>
          <strong style={{ color: 'var(--white)' }}>{playerName}</strong>, you scored{' '}
          <strong style={{ color: '#ef4444' }}>{score}/10</strong> and got deported.
          That record is now public, permanent, and very embarrassing.{' '}
          The only way to clear your name is to retake the test and pass.
        </p>

        {!clicked ? (
          <>
            {/* Step 1 */}
            <div style={{ textAlign: 'left', marginBottom: '8px' }}>
              <div style={{
                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
                color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px',
              }}>
                Step 1 — Send <strong style={{ color: '#f59e0b' }}>$1</strong> on Venmo
              </div>
              <a
                href="https://venmo.com/u/irvinglopez"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  background: 'var(--surface)', border: '1px solid #3b82f6',
                  borderRadius: '12px', padding: '14px 16px',
                  textDecoration: 'none', cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>💸</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ color: 'var(--white)', fontWeight: 800, fontSize: '1rem' }}>
                    @irvinglopez
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.78rem', marginTop: '3px' }}>
                    Note: <span style={{ color: '#93c5fd', fontWeight: 600 }}>"$1 deportation override"</span>
                  </div>
                </div>
                <span style={{
                  fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6',
                  flexShrink: 0, border: '1px solid #3b82f633',
                  borderRadius: '6px', padding: '4px 8px',
                }}>
                  Open →
                </span>
              </a>
            </div>

            {/* Step 2 */}
            <div style={{ textAlign: 'left', marginBottom: '20px', marginTop: '20px' }}>
              <div style={{
                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
                color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px',
              }}>
                Step 2 — Come back and tap below
              </div>
              <button onClick={handlePay} className="primary-btn safe-btn">
                I Paid — Let Me Try Again
              </button>
            </div>

            <button onClick={onDecline} style={{
              display: 'block', width: '100%', padding: '13px',
              background: 'transparent', border: '1px solid #16a34a55',
              borderRadius: '12px', color: '#16a34a', fontSize: '0.875rem',
              fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
            }}>
              ✈️ Accept My Deportation
            </button>
          </>
        ) : (
          <div className="fade-up" style={{
            padding: '20px',
            background: '#0a2515', border: '1px solid #16a34a',
            borderRadius: '12px',
            color: '#4ade80', fontSize: '1rem', fontWeight: 700,
          }}>
            Verifying payment... clearing your record.<br />
            <span style={{ fontSize: '0.8rem', color: '#86efac', fontWeight: 400 }}>
              Don't mess it up this time.
            </span>
          </div>
        )}

        <p style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '20px', lineHeight: 1.5 }}>
          No refunds if you get deported again.
        </p>
      </div>
    </div>
  )
}

// ── App state ─────────────────────────────────────────────────────────────────

interface QuizState {
  questions: Question[]
  currentIndex: number
  score: number
  wrongCount: number
  selectedAnswer: string | null
  isCorrect: boolean | null
  quip: string
  startTime: number
}

type Screen = 'menu' | 'name' | 'quiz' | 'result' | 'leaderboard' | 'paywall'

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [playerName, setPlayerName] = useState('')
  const [quiz, setQuiz] = useState<QuizState | null>(null)
  const [finalScore, setFinalScore] = useState(0)
  const [wasDeportedRetry, setWasDeportedRetry] = useState(false)
  // Persisted across sessions via localStorage
  const [sessionDeported, setSessionDeported] = useState(() => loadPlayer()?.deported ?? false)

  // Restore name + deported status on load
  useEffect(() => {
    const player = loadPlayer()
    if (player) {
      setPlayerName(player.name)
      setSessionDeported(player.deported)
    }
  }, [])

  const goToMenu = useCallback(() => setScreen('menu'), [])
  const goToLeaderboard = useCallback(() => setScreen('leaderboard'), [])

  const launchQuiz = useCallback((name: string) => {
    setPlayerName(name)
    setQuiz({
      questions: shuffleArray(QUESTIONS).slice(0, QUIZ_LENGTH).map(q => ({
        ...q,
        options: shuffleArray([...q.options]),
      })),
      currentIndex: 0,
      score: 0,
      wrongCount: 0,
      selectedAnswer: null,
      isCorrect: null,
      quip: '',
      startTime: Date.now(),
    })
    setScreen('quiz')
  }, [])

  // "I paid" — skip name screen, reuse existing name, override their record
  const handlePaidRetry = useCallback(() => {
    setSessionDeported(false)
    setWasDeportedRetry(true)
    savePlayer(playerName, false)
    launchQuiz(playerName)
  }, [playerName, launchQuiz])

  const startQuiz = useCallback((name: string) => {
    setWasDeportedRetry(false)
    launchQuiz(name)
  }, [launchQuiz])

  const handleRetry = useCallback(() => {
    const passed = getTier(finalScore).pass
    if (passed) {
      setWasDeportedRetry(false)
      setScreen('name')
    } else {
      setScreen('paywall')
    }
  }, [finalScore])

  const handleAnswer = useCallback((answer: string) => {
    setQuiz(prev => {
      if (!prev || prev.selectedAnswer !== null) return prev
      const correct = answer === prev.questions[prev.currentIndex].correct
      return {
        ...prev,
        selectedAnswer: answer,
        isCorrect: correct,
        score: correct ? prev.score + 1 : prev.score,
        wrongCount: correct ? prev.wrongCount : prev.wrongCount + 1,
        quip: getRandom(correct ? CORRECT_QUIPS : WRONG_QUIPS),
      }
    })
  }, [])

  const handleNext = useCallback(async () => {
    if (!quiz) return
    if (quiz.currentIndex + 1 >= QUIZ_LENGTH) {
      const tier = getTier(quiz.score)
      const timeSeconds = Math.round((Date.now() - quiz.startTime) / 1000)
      await saveToLeaderboard({
        name: playerName,
        score: quiz.score,
        timeSeconds,
        passed: tier.pass,
        date: Date.now(),
      })
      setSessionDeported(!tier.pass)
      savePlayer(playerName, !tier.pass)
      setFinalScore(quiz.score)
      setScreen('result')
    } else {
      setQuiz(prev => prev ? {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
        isCorrect: null,
        quip: '',
      } : null)
    }
  }, [quiz, playerName])

  if (screen === 'menu') return <MenuScreen onStart={() => sessionDeported ? setScreen('paywall') : setScreen('name')} />
  if (screen === 'name') return <NameScreen onSubmit={startQuiz} onBack={goToMenu} defaultName={playerName} />
  if (screen === 'leaderboard') return <LeaderboardScreen onBack={goToMenu} onPlay={() => sessionDeported ? setScreen('paywall') : setScreen('name')} />
  if (screen === 'paywall') return (
    <PaywallScreen
      playerName={playerName}
      score={finalScore}
      onPay={handlePaidRetry}
      onDecline={goToMenu}
    />
  )

  if (screen === 'result') {
    return (
      <ResultScreen
        score={finalScore}
        playerName={playerName}
        wasDeportedRetry={wasDeportedRetry}
        onRestart={handleRetry}
        onLeaderboard={goToLeaderboard}
      />
    )
  }

  if (!quiz) return null

  const q = quiz.questions[quiz.currentIndex]

  return (
    <QuizScreen
      question={q}
      questionNumber={quiz.currentIndex + 1}
      total={QUIZ_LENGTH}
      score={quiz.score}
      wrongCount={quiz.wrongCount}
      selectedAnswer={quiz.selectedAnswer}
      isCorrect={quiz.isCorrect}
      quip={quiz.quip}
      startTime={quiz.startTime}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />
  )
}
