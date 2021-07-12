import { useEffect, useRef } from 'react'

export const usePrevious = <T extends unknown>(value: T, initial?: T): T | undefined => {
  const ref = useRef<T>(initial)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}