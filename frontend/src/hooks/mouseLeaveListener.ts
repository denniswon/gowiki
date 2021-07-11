import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

import { Point, Rectangle, createScopedDebounce, debounce, DebounceStyle, loggerWithPrefix } from '@gowiki/core'

const log = loggerWithPrefix('[mouseLeaveListener]')

export function useMouseInElement<T extends HTMLElement>(element: MutableRefObject<T>, initialState: boolean | undefined, targetWindow: Window = window): boolean | undefined {
  const [scopedDebounce] = useState(createScopedDebounce())
  const [mouseInElement, setMouseInElement] = useState(initialState)

  useEffect(() => {
    const mouseInWindowDoucment = isMouseInWindowDocument(targetWindow, true, (mouseInWindow) => {
      if (!mouseInWindow) {
        setMouseInElement(false)
      }
    })
    return mouseInWindowDoucment.unsubscribe
  }, [targetWindow])

  useEffect(() => {
    if (!element.current) {
      return
    }

    const leave = (e: MouseEvent) => {
      if (e.target !== e.currentTarget) return
      setMouseInElement(false)
    }
    const enter = (e: MouseEvent) => {
      if (e.target !== e.currentTarget) return
      setMouseInElement(true)
    }

    element.current.addEventListener('mouseleave', leave)
    element.current.addEventListener('mouseenter', enter)

    return () => {
      element.current?.removeEventListener('mouseleave', leave)
      element.current?.removeEventListener('mouseenter', enter)
    }
  }, [element.current])

  useEffect(() => {
    if (mouseInElement) {
      const onMouseMove = (e: MouseEvent) => {
        scopedDebounce.debounce('', () => {
          if (!element.current) return

          const inBounds = isMouseInBounds(
            { x: e.clientX, y: e.clientY },
            element.current.getBoundingClientRect()
          )
          if (!inBounds) {
            setMouseInElement(false)
          }
        }, 100, DebounceStyle.IMMEDIATE_THEN_WAIT)
      }

      targetWindow.document.addEventListener('mousemove', onMouseMove)

      return () => targetWindow.document.removeEventListener('mousemove', onMouseMove)
    }
  }, [mouseInElement])

  return mouseInElement
}

export function useMouseInWindowDocument(targetWin: Window = window, initialState: boolean | undefined): Readonly<boolean | undefined> {
  const [mouseInDocument, setMouseInDocument] = useState(initialState)

  useEffect(() => {
    const mouseInWindowDoucment = isMouseInWindowDocument(targetWin, initialState, setMouseInDocument)
    return mouseInWindowDoucment.unsubscribe
  }, [])

  return mouseInDocument
}

export function isMouseInWindowDocument(targetWin: Window = window, initialState: boolean, onChange?: (boolean) => void) {
  const mouseInWindowDocument = {
    current: initialState,
    unsubscribe: () => {}
  }

  const leave = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return
    mouseInWindowDocument.current = false
    onChange?.(false)
  }
  const enter = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return
    mouseInWindowDocument.current = true
    onChange?.(true)
  }

  targetWin.document.addEventListener('mouseleave', leave)
  targetWin.document.addEventListener('mouseenter', enter)

  mouseInWindowDocument.unsubscribe = () => {
    targetWin?.document?.removeEventListener('mouseleave', leave)
    targetWin?.document?.removeEventListener('mouseenter', enter)
  }

  return mouseInWindowDocument
}

export function isMouseInBounds(mouse: Point, bounds: Rectangle) {
  if (
    mouse.x < bounds.x ||
    mouse.y < bounds.y ||
    mouse.x > (bounds.x + bounds.width) ||
    mouse.y > (bounds.y + bounds.height)
  ) {
    return false
  }
  return true
}