import { useEffect, useRef, useState } from 'react'

type Return = [boolean, () => void]

export const useTimedToggle = (onEnd: () => void, duration: number = 1000): Return => {
  const [isActive, setActive] = useState<boolean>(false)
  const toggleTimeoutRef = useRef<any>()

  const clearActiveTimeout = () => clearTimeout(toggleTimeoutRef.current)

  useEffect(() => {
    return () => clearActiveTimeout()
  }, [])

  const activate = () => {
    clearActiveTimeout()
    setActive(true)
    toggleTimeoutRef.current = setTimeout(() => {
      setActive(false)
      onEnd()
    }, duration)
  }

  return [isActive, activate]
}