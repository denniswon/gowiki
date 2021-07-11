import { useEffect, useState } from 'react'

type CyclerConfig = { totalSteps: number; duration: number; start: number; paused: boolean }
export function useStepCycler(config: CyclerConfig) {
  const { totalSteps, duration, start, paused } = config
  const [step, setStep] = useState<number>(start)

  const goToNext = () => setStep(step => step + 1)
  const goToPrev = () => setStep(step => step - 1)

  useEffect(() => {
    if (IS_DEV && paused) return
    const interval = setInterval(() => {
      setStep(step => {
        if (step >= totalSteps) return 0
        else return step + 1
      })
    }, duration)

    return () => clearInterval(interval)
  }, [])

  return { step, goToPrev, goToNext }
}
