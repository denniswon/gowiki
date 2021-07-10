// From https://usehooks.com/useKeyPress/
import { useEffect, useState } from 'react'

export function useKeyPress(targetKey: string, targetWindow: Window = window) {
  const [keyPressed, setKeyPressed] = useState<boolean>(false)

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  const unset = () => upHandler({ key: targetKey })

  useEffect(() => {
    targetWindow.addEventListener('keydown', downHandler)
    targetWindow.addEventListener('keyup', upHandler)

    targetWindow.addEventListener("blur", unset)
    targetWindow.addEventListener("focus", unset)

    return () => {
      targetWindow.removeEventListener("blur", unset)
      targetWindow.removeEventListener("focus", unset)

      targetWindow.removeEventListener('keydown', downHandler)
      targetWindow.removeEventListener('keyup', upHandler)
    }
  }, [])

  return keyPressed
}
