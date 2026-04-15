// src/hooks/useTestSession.ts

import { useState, useCallback, useEffect } from 'react'
import { Question, TestSession } from '@types'

const STORAGE_KEY = 'citizenship_test_session'

export const useTestSession = () => {
  const [session, setSession] = useState<TestSession | null>(null)

  // Load from localStorage
  useEffect(() => {
    localStorage.getItem(STORAGE_KEY)
    // Session is initialized on demand via initializeSession
  }, [])

  const initializeSession = useCallback((questions: Question[], isTestMode: boolean) => {
    const newSession: TestSession = {
      questions,
      currentIndex: 0,
      score: 0,
      streak: 0,
      mastered: new Set(),
      isTestMode,
      startTime: Date.now()
    }
    setSession(newSession)
  }, [])

  const answerQuestion = useCallback((isCorrect: boolean, questionId: number) => {
    setSession(prev => {
      if (!prev) return null

      const newSession = { ...prev }
      if (isCorrect) {
        newSession.score++
        newSession.streak++
        newSession.mastered.add(questionId)
      } else {
        newSession.streak = 0
      }
      return newSession
    })
  }, [])

  const nextQuestion = useCallback(() => {
    setSession(prev => {
      if (!prev) return null
      return { ...prev, currentIndex: prev.currentIndex + 1 }
    })
  }, [])

  const saveProgress = useCallback((finalScore?: number) => {
    if (!session) return

    const data: StoredData = {
      mastered: Array.from(session.mastered),
      streak: session.streak,
      bestScore: finalScore ?? session.score,
      lastUpdated: Date.now()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [session])

  return {
    session,
    initializeSession,
    answerQuestion,
    nextQuestion,
    saveProgress
  }
}
