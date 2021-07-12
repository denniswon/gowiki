import { useEffect, useState } from 'react'

var lastMouseX = 0
var lastMouseY = 0

export function useMousePosition(): readonly [number, number] {
  const [x, setX] = useState(lastMouseX)
  const [y, setY] = useState(lastMouseY)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      setX(x)
      setY(y)
      lastMouseX = x
      lastMouseY = y
    }
    document.addEventListener('mousemove', move)

    return () => {
      document.removeEventListener('mousemove', move)
    }
  }, [])

  return [x, y]
}
