import { EffectCallback, useEffect, useRef } from 'react'

import { arraysEqual } from '../utils'

export function useEffectWhenDepsLoad(fn: EffectCallback, changeOn: any[], deps: any[]) {
  const loaded = useRef(false)
  const prevChangeOn = useRef([])
  const previousReturn = useRef(null)

  useEffect(() => {
    const depsLoaded = !loaded.current && deps.filter(x => !x).length === 0
    loaded.current = depsLoaded

    const changeOnChanged = !arraysEqual(prevChangeOn.current, changeOn)
    prevChangeOn.current = changeOn

    if (depsLoaded || changeOnChanged) {
      previousReturn.current?.()
      previousReturn.current = fn()
    } else {
      previousReturn.current?.()
      previousReturn.current = null
    }
  }, changeOn.concat(...deps))
}