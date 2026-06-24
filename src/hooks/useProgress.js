import { useCallback, useEffect, useState } from 'react'
import { totalStages } from '../data/stages'

const STORAGE_KEY = 'szlak-miejski-progress-v1'

function readProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { unlockedStage: 1, completed: [] }
    const parsed = JSON.parse(raw)
    if (typeof parsed.unlockedStage !== 'number' || !Array.isArray(parsed.completed)) {
      return { unlockedStage: 1, completed: [] }
    }
    return parsed
  } catch {
    return { unlockedStage: 1, completed: [] }
  }
}

function writeProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // localStorage niedostępny (np. tryb prywatny) — gra dalej działa,
    // ale postęp nie przetrwa odświeżenia strony.
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(readProgress)

  useEffect(() => {
    writeProgress(progress)
  }, [progress])

  const completeStage = useCallback((stageId) => {
    setProgress((prev) => {
      const completed = prev.completed.includes(stageId)
        ? prev.completed
        : [...prev.completed, stageId]
      const unlockedStage = Math.min(
        Math.max(prev.unlockedStage, stageId + 1),
        totalStages + 1
      )
      return { unlockedStage, completed }
    })
  }, [])

  const isStageUnlocked = useCallback(
    (stageId) => stageId <= progress.unlockedStage,
    [progress.unlockedStage]
  )

  const isStageCompleted = useCallback(
    (stageId) => progress.completed.includes(stageId),
    [progress.completed]
  )

  const resetProgress = useCallback(() => {
    const fresh = { unlockedStage: 1, completed: [] }
    setProgress(fresh)
  }, [])

  const isGameComplete = progress.completed.length >= totalStages

  return {
    unlockedStage: progress.unlockedStage,
    completedCount: progress.completed.length,
    isStageUnlocked,
    isStageCompleted,
    completeStage,
    resetProgress,
    isGameComplete,
  }
}
