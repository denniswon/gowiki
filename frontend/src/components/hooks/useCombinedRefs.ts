import { useEffect, useRef, useState } from 'react'

// from https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
export function useCombinedRefs<T>(...refs) {
  const targetRef = useRef<T>()

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}
