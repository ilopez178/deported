// src/App.tsx
import React, { useState, useCallback, useMemo } from 'react'
import { QUESTIONS } from '@/data/questions'
import { shuffleArray } from '@utils/helpers'
import type { Question } from '@types'

// ── Constants ────────────────────────────────────────────────────────────────

const QUIZ_LENGTH = 10
const PASS_SCORE = 7 // 70% — actual USCIS passing threshold

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
  // 10 correct = 100%, miss 1 = 90%, miss 2 = 80%, etc.
  const safetyPct = ((QUIZ_LENGTH - wrongCount) / QUIZ_LENGTH) * 100

  // Gradient tiers — vivid, fun colors
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
        fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#555', marginBottom: '8px',
      }}>
        <span>Residency Status</span>
        <span style={{ color: labelColor, transition: 'color 0.8s ease' }}>{label}</span>
      </div>
      <div style={{
        height: '14px', background: '#111', borderRadius: '99px',
        overflow: 'hidden', border: '1px solid #252525',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
      }}>
        {/* Animated bar — width drops 10% per missed question */}
        <div style={{
          height: '100%',
          width: `${safetyPct}%`,
          background: gradient,
          borderRadius: '99px',
          // Slow, weighted drop — the star of the show
          transition: 'width 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: `0 0 18px 2px ${safetyPct >= 70 ? '#10b98166' : safetyPct >= 50 ? '#f59e0b66' : '#ef444466'}`,
          position: 'relative',
        }}>
          {/* Gloss shine on top of bar */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 55%)',
            borderRadius: '99px',
          }} />
        </div>
      </div>

      {/* Tick marks at 70% (pass line) */}
      <div style={{ position: 'relative', height: '10px', marginTop: '4px' }}>
        <div style={{
          position: 'absolute', left: '70%',
          transform: 'translateX(-50%)',
          fontSize: '0.6rem', color: '#444', fontWeight: 700,
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
  padding: '1.5rem',
  background: '#0f0f0f',
}

const card: React.CSSProperties = {
  background: '#141414',
  border: '1px solid #242424',
  borderRadius: '20px',
  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
  width: '100%',
}

// ── Menu Screen ───────────────────────────────────────────────────────────────

const MenuScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div style={page}>
    <div style={{ ...card, maxWidth: '520px', textAlign: 'center' }} className="slide-in">

      {/* Animated siren */}
      <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }} className="floating">🚨</div>

      <div style={{
        fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em',
        color: '#ef4444', marginBottom: '0.75rem', textTransform: 'uppercase',
      }} className="siren">
        ⚠ U.S. Citizenship Screening System ⚠
      </div>

      <h1 style={{
        fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontWeight: 900,
        color: '#f5f5f5', marginBottom: '0.6rem', lineHeight: 1.1,
        letterSpacing: '-0.02em',
      }}>
        Should You Get<br />
        <span style={{ color: '#ef4444' }}>Deported?</span>
      </h1>

      <p style={{
        color: '#777', fontSize: '1rem', lineHeight: 1.65,
        marginBottom: '2rem', maxWidth: '380px', margin: '0 auto 2rem',
      }}>
        {QUIZ_LENGTH} random USCIS civics questions. You need {PASS_SCORE} right to stay.
        How American are <em style={{ color: '#aaa' }}>you</em>, really?
      </p>

      <button onClick={onStart} className="primary-btn" style={{ maxWidth: '320px', margin: '0 auto 1rem', display: 'block' }}>
        Begin Screening →
      </button>

      <p style={{ fontSize: '0.72rem', color: '#444', marginTop: '1.25rem', lineHeight: 1.5 }}>
        Based on actual USCIS naturalization test questions.<br />
        No lawyers were harmed in the making of this quiz.
      </p>
    </div>
  </div>
)

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
  onAnswer: (a: string) => void
  onNext: () => void
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  question, questionNumber, total, score, wrongCount,
  selectedAnswer, isCorrect, quip, onAnswer, onNext,
}) => {
  const answered = selectedAnswer !== null
  const progressPct = ((questionNumber - 1) / total) * 100

  return (
    <div style={page}>
      <div style={{ ...card, maxWidth: '640px' }}>

        {/* Deportation meter */}
        <DeportationMeter wrongCount={wrongCount} />

        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '0.75rem',
        }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 800, color: '#555',
            textTransform: 'uppercase', letterSpacing: '0.12em',
          }}>
            Interrogation {questionNumber} of {total}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 700 }}>
            ✓ {score} correct
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: '4px', background: '#1e1e1e', borderRadius: '99px', overflow: 'hidden', marginBottom: '1.75rem', border: '1px solid #252525' }}>
          <div style={{
            height: '100%', width: `${progressPct}%`,
            background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
            borderRadius: '99px', transition: 'width 0.4s ease',
          }} />
        </div>

        {/* Question card — key forces re-mount → triggers slideIn */}
        <div key={questionNumber} className="slide-in">
          <div style={{
            fontSize: '0.68rem', fontWeight: 800, color: '#3b82f6',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem',
          }}>
            {question.category}
          </div>

          <h2 style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)', fontWeight: 700,
            color: '#f5f5f5', marginBottom: '1.5rem', lineHeight: 1.45,
          }}>
            {question.q}
          </h2>

          {/* Answer options */}
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

        {/* Feedback + next button */}
        {answered && (
          <div className="fade-up" style={{ marginTop: '1.25rem' }}>
            <div style={{
              padding: '13px 18px',
              background: isCorrect ? '#0a2515' : '#1f0808',
              border: `1px solid ${isCorrect ? '#16a34a' : '#dc2626'}`,
              borderRadius: '12px',
              color: isCorrect ? '#86efac' : '#fca5a5',
              fontSize: '0.975rem', fontWeight: 600,
              textAlign: 'center', marginBottom: '1rem',
            }}>
              {quip}
            </div>

            <button
              onClick={onNext}
              className={`primary-btn ${isCorrect ? 'safe-btn' : ''}`}
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

const ResultScreen: React.FC<{ score: number; onRestart: () => void }> = ({ score, onRestart }) => {
  const tier = getTier(score)
  const pct = Math.round((score / QUIZ_LENGTH) * 100)
  const wrongCount = QUIZ_LENGTH - score

  return (
    <>
      {tier.pass && <Confetti />}
      <div style={page}>
        <div style={{ ...card, maxWidth: '520px', textAlign: 'center' }} className="fade-up">

          {/* Stamp badge */}
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

          {/* Big emoji */}
          <div style={{
            fontSize: '5rem', marginBottom: '1rem',
            animation: tier.pass ? 'float 2.5s ease-in-out infinite' : 'none',
          }}>
            {tier.emoji}
          </div>

          <h1 style={{
            fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 900,
            color: tier.pass ? '#f5f5f5' : '#ef4444',
            marginBottom: '0.6rem', lineHeight: 1.15,
          }}>
            {tier.title}
          </h1>

          <p style={{ color: '#777', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
            {tier.sub}
          </p>

          {/* Score card */}
          <div style={{
            background: '#1a1a1a', border: '1px solid #252525', borderRadius: '14px',
            padding: '1.5rem', marginBottom: '1.5rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem',
          }}>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: tier.color }}>{score}</div>
              <div style={{ fontSize: '0.7rem', color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Correct</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: wrongCount > (QUIZ_LENGTH - PASS_SCORE) ? '#ef4444' : '#f59e0b' }}>{wrongCount}</div>
              <div style={{ fontSize: '0.7rem', color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Wrong</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: tier.color }}>{pct}%</div>
              <div style={{ fontSize: '0.7rem', color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Score</div>
            </div>
          </div>

          {/* Passing line note */}
          <p style={{ fontSize: '0.72rem', color: '#444', marginBottom: '1.25rem' }}>
            USCIS passing score is 7/10 · {tier.pass
              ? score === PASS_SCORE ? 'Minimum pass — cutting it close!'
              : `You beat it by ${score - PASS_SCORE} ${score - PASS_SCORE === 1 ? 'question' : 'questions'}`
              : `You missed by ${PASS_SCORE - score} ${PASS_SCORE - score === 1 ? 'question' : 'questions'}`}
          </p>

          <button onClick={onRestart} className="primary-btn">
            Try Again
          </button>
        </div>
      </div>
    </>
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
}

export default function App() {
  const [screen, setScreen] = useState<'menu' | 'quiz' | 'result'>('menu')
  const [quiz, setQuiz] = useState<QuizState | null>(null)

  const startQuiz = useCallback(() => {
    setQuiz({
      questions: shuffleArray(QUESTIONS).slice(0, QUIZ_LENGTH),
      currentIndex: 0,
      score: 0,
      wrongCount: 0,
      selectedAnswer: null,
      isCorrect: null,
      quip: '',
    })
    setScreen('quiz')
  }, [])

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

  const handleNext = useCallback(() => {
    if (!quiz) return
    if (quiz.currentIndex + 1 >= QUIZ_LENGTH) {
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
  }, [quiz])

  if (screen === 'menu') return <MenuScreen onStart={startQuiz} />
  if (screen === 'result' && quiz) return <ResultScreen score={quiz.score} onRestart={startQuiz} />
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
      onAnswer={handleAnswer}
      onNext={handleNext}
    />
  )
}
