import { useEffect, useRef, useState } from 'react'

import { useUpdatedRef } from './useUpdatedRef'

/** Triggers if the mouse moves `distance` units in `duration` time. Not perfect, it just checks every [reset]duration/2. */
export function useMouseMoved(distance: number, duration: number, resetDuration: number): boolean {
  const startRef = useRef<SpaceTime>(null)
  const midRef = useRef<SpaceTime>(null)

  const [moved, setMoved] = useState(false)
  const movedRef = useUpdatedRef(moved)

  const currentRef = useRef<SpaceTime>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const moved = movedRef.current
      const start = startRef.current
      const mid = midRef.current

      const x = e.clientX
      const y = e.clientY
      const t = Date.now()
      const currentSpaceTime: SpaceTime = {x, y, t}

      currentRef.current = currentSpaceTime

      if (moved) {
        return
      }

      // Initialize start
      if (start === null) {
        startRef.current = currentSpaceTime
        return
      }

      // Initialize mid
      if (mid === null && t - start.t > (duration / 2)) {
        midRef.current = currentSpaceTime
        return
      }

      // Check every half-duration
      if (t - start.t > (duration)) {
        const d = distanceDiff(start, mid) + distanceDiff(mid, currentSpaceTime)
        if (d > distance) {
          setMoved(true)
          // Prepare for resetduration checks
          startRef.current = currentSpaceTime
          midRef.current = null
          return
        } else {
          startRef.current = mid
          midRef.current = currentSpaceTime
          return
        }
      }
    }
    document.addEventListener('mousemove', move)

    return () => {
      document.removeEventListener('mousemove', move)
    }
  }, [])

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    if (moved) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        const start = startRef.current
        const mid = midRef.current
        const currentSpaceTime = currentRef.current

        const t = Date.now()

        // Initialize mid
        if (mid === null && t - start.t > (resetDuration / 2)) {
          midRef.current = currentSpaceTime
          return
        }

        // Check every half-duration
        if (t - start.t > (resetDuration / 2)) {
          const d = distanceDiff(start, mid) + distanceDiff(mid, currentSpaceTime)
          if (d < distance) {
            setMoved(false)
            // Prepare for onmousemove checks
            startRef.current = currentSpaceTime
            midRef.current = null
            clearInterval(intervalRef.current)
            return
          } else {
            startRef.current = mid
            midRef.current = currentSpaceTime
            return
          }
        }
      }, resetDuration / 2);
    }
  }, [moved])

  return moved
}

type SpaceTime = {
  x: number,
  y: number,
  t: number,
}

const distanceDiff = (a: SpaceTime, b: SpaceTime): number => {
  return Math.sqrt(
    Math.pow((a.x - b.x), 2) +
    Math.pow((a.y - b.y), 2)
  )
}
