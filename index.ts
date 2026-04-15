// src/types/index.ts

export interface Question {
  id: number
  q: string
  correct: string
  options: string[]
  category: QuestionCategory
}

export enum QuestionCategory {
  Government = 'Government',
  HistoryRights = 'History & Rights',
  Founding = 'Founding',
  Civics = 'Civics'
}

export enum ScreenType {
  Menu = 'menu',
  Test = 'test',
  Result = 'result',
  Dashboard = 'dashboard'
}

export interface TestSession {
  questions: Question[]
  currentIndex: number
  score: number
  streak: number
  mastered: Set<number>
  isTestMode: boolean
  startTime: number
}

export interface TestResult {
  score: number
  total: number
  percentage: number
  passed: boolean
  duration: number
}

export interface StoredData {
  mastered: number[]
  streak: number
  bestScore: number
  lastUpdated: number
}

export interface CategoryProgress {
  name: string
  total: number
  mastered: number
  percentage: number
}
