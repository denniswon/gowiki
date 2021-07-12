import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useMouseInWindowDocument } from './mouseLeaveListener'
import { useUpdatedRef } from './useUpdatedRef'

const useWindowFocused = () => {
  const [focused, setFocused] = useState(document.hasFocus())

  useEffect(() => {
    const focus = () => setFocused(true)
    const blur = () => setFocused(false)

    window.addEventListener('focus', focus)
    window.addEventListener('blur', blur)

    return () => {
      window.removeEventListener('focus', focus)
      window.removeEventListener('blur', blur)
    };
  });

  return focused
}

export default useWindowFocused

export const usePreventClickThroughFocus = (onClick?: Function) => {
  const trueFocus = useWindowFocused()
  const mouseInWindow = useMouseInWindowDocument(window, true)
  const focused = trueFocus || mouseInWindow

  const [recentlyFocused, setRecentlyFocused] = useState(false)
  const timer = useRef(undefined)
  useEffect(() => {
    if (focused) {
      setRecentlyFocused(true)
      timer.current = setTimeout(() => {
        setRecentlyFocused(false)
      }, 250)
    } else {
      setRecentlyFocused(false)
      if (timer.current !== undefined) {
        clearTimeout(timer.current)
        timer.current = undefined
      }
    }
  }, [focused])

  const recentlyFocusedRef = useUpdatedRef(recentlyFocused)

  const newOnClick = useCallback((e: MouseEvent) => {
    if (recentlyFocusedRef.current) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    onClick?.(e)
  }, [onClick])

  return {newOnClick, recentlyFocused}
}