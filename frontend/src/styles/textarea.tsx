import * as React from 'react'

import { Box, BoxProps, Column, Row, s } from '@gowiki/styles-global'
import { primitives } from '@gowiki/web'

import { useCombinedRefs } from '../hooks/useCombinedRefs'

import styled from 'styled-components'

// Doesn't shrink, probably fine for now
const ta = React.forwardRef((
  props: textareaProps,
  passedRef: React.Ref<HTMLElement>,
) => {
  const { autoResize = true, children, h, ...rest } = props

  const [height, setHeight] = React.useState<number>(undefined)

  const innerRef = React.useRef<HTMLElement>(null)
  const ref = useCombinedRefs<HTMLElement>(innerRef, passedRef)

  React.useEffect(() => {
    if (!ref.current) {
      return
    }

    const resize = () => {
      const el = ref.current
      setHeight(el.scrollHeight)
    }

    ref.current.addEventListener('input', resize)
    return () => ref.current?.removeEventListener('input', resize)
  }, [autoResize, ref.current])

  return <TextareaInner {...rest} h={h || height} ref={ref as React.Ref<HTMLTextAreaElement>}>
    {children}
  </TextareaInner>
})

const TextareaInner = styled.textarea<BoxProps>`
  ${primitives.textarea} ${s.boxProps} max-width: 100%;

`

type textareaProps = {
  autoResize?: boolean,
  children?: React.ReactNode,
} & BoxProps & { lh?: any, name?: any, placeholder?: any, error?: any }

// @ts-ignore
// (to let ref be any)
export const textarea = ta as (p: textareaProps & { ref?: any }) => JSX.Element
