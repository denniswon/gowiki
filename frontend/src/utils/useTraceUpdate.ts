import { logger } from '@gowiki/core'
import { useEffect, useRef } from 'react'

// examine props for differences
export function useTraceUpdate(props: any, label?: string) {
  const prev = useRef(props)
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v]
      }
      return ps
    }, {})
    if (Object.keys(changedProps).length > 0) {
      logger.info(label || '', 'Changed props:', changedProps)
    }
    prev.current = props
  })
}