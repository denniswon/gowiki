import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { debounce, DebounceStyle } from '../utils'

export function useDebouncedHook(value: any, wait: number, debounceStyle: DebounceStyle, blockCompletely?: boolean): any {
  const [debounceId, setDebounceId] = useState(null)
  useEffect(() => {
    setDebounceId(uuid())
    return () => {}
  }, [])

  const [debouncedValue, setDebouncedValue] = useState(value)
  debounce(debounceId, () => setDebouncedValue(value), wait, debounceStyle)

  return debouncedValue
}

export function useBlockingHook(value: any, block?: boolean): any {
  const [blockedValue, setBlockedValue] = useState(value)

  useEffect(() => {
    setBlockedValue(value)
  }, [block])

  return block ? blockedValue : value
}
