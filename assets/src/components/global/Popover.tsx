import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import { animated, useTransition } from 'react-spring'

import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = {
  children: any
  content: any
  offset?: [number, number]
  style?: React.CSSProperties
  startOpen?: boolean
  show?: boolean
  contextual?: boolean
  stayOpenOnClick?: boolean
  onShow?: () => void
  onHide?: () => void
  placement?: string
} & BoxProps

/** Usage Example
  const content = (
    <PopoverMenu>
        Items
    </PopoverMenu>
  )
  <Popover content={content} placement='top'>
    {({on}) =>
      <Pressable isActive={on}>Hello!</Pressable>
    }
  </Popover>
*/

export default function Popover(props: Props) {
  const { children, content, offset, startOpen, onShow, onHide,
    show: propsShow, contextual, stayOpenOnClick, ...rest
  } = props

  const [show, setShow] = useState(startOpen || false)
  const timeoutRef = useRef<any>(null)

  const [rect, setRect] = React.useState(null)
  const [referenceElement, setReferenceElement] = useState<HTMLElement>(null)
  const trigger = contextual ? rect : referenceElement

  const [contentElement, setContentElement] = React.useState(null)

  const { styles, attributes } = usePopper(trigger, contentElement, {
    placement: (contextual ? 'bottom-start': 'auto'),
    modifiers: [
      { name: 'offset', options: { offset: offset || [0, 2] }},
    ],
  })

  useEffect(() => {
    if (propsShow) setShow(true)
  }, [propsShow])

  const onClickAnywhere = (e: MouseEvent) => {
    if (!show) return
    const contentIsPressed = contentElement?.contains(e.target)
    if ((e.target as Element).matches('[disabled], [disabled] *')) {
      return
    }
    if (stayOpenOnClick && contentIsPressed) return

    if (contentIsPressed) {
      // Timeout allows content elements to execute their actions
      timeoutRef.current = setTimeout(() => {
        hide()
      }, 20)
    } else {
      hide()
      e.stopPropagation()
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Escape') {
      e.stopPropagation()
      hide()
    }
  }

  const hide = () => {
    if (onHide) onHide()
    setShow(false)
  }

  useEffect(() => {
    if (!referenceElement?.ownerDocument) {
      return
    }

    if (show) {
      referenceElement.ownerDocument.body.addEventListener('keydown', onKeyDown)
      referenceElement.ownerDocument.body.addEventListener('click', onClickAnywhere)
    }
    return () => {
      referenceElement.ownerDocument.body.removeEventListener('click', onClickAnywhere)
      referenceElement.ownerDocument.body.removeEventListener('keydown', onKeyDown)
      clearTimeout(timeoutRef.current)
    }
  },[contentElement, show, referenceElement])

  const transitions = useTransition(show, null, {
    from: { opacity: 0, transform: 'scale(0.97)' },
    enter: { opacity: 2, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.97)' },
    config: { duration: 80 }
  })

  const tooltipContent = (
    transitions.map(({ item, key, props }) => item && (
      <div key={key} >
        {show && (
          <div
            onContextMenu={e => {e.preventDefault(); setShow(false)} }
            style={{position: 'fixed', left:0, right:0, top:0, bottom:0, zIndex: m.zIndex.popover-1}}
          />
        )}
        <div
          ref={setContentElement}
          style={{...styles.popper, zIndex: m.zIndex.popover }}
          {...attributes.popper}
        >
          <animated.div style={props}>
            {content}
          </animated.div>
        </div>
      </div>
    ))
  )

  const childrenProps = {
    on: show
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement> ) => {
    e.preventDefault()
    if (contextual) {
      const x = e.clientX
      const y = e.clientY
      setRect(getVirtualRef(x, y))
    }

    setShow(true)
    if (onShow) onShow()
    e.stopPropagation()
  }

  const interactions = contextual ? { onContextMenu: onClick } : { onClick: onClick }

  return <>
    <Box ref={setReferenceElement} {...interactions} {...rest}>
      {typeof children == 'function' ? children(childrenProps) : children}
    </Box>
    {referenceElement?.ownerDocument?.body && createPortal(tooltipContent, referenceElement.ownerDocument.body)}
  </>
}

const getVirtualRef = (x, y) => ({
  getBoundingClientRect() {
    return {
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
    }
  }
})
