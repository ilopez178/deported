// src/utils/helpers.ts

export const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((part / total) * 100)
}

export const getProgressStatus = (score: number, total: number): 'passed' | 'failed' => {
  const percentage = calculatePercentage(score, total)
  return percentage >= 60 ? 'passed' : 'failed'
}

export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes === 0) {
    return `${remainingSeconds}s`
  }
  return `${minutes}m ${remainingSeconds}s`
}

export const getCategory = (questionId: number): string => {
  if (questionId <= 30) return 'Government'
  if (questionId <= 60) return 'History & Rights'
  if (questionId <= 80) return 'Founding'
  return 'Civics'
}
