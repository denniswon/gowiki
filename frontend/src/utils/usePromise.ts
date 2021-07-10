import { useEffect, useState } from 'react'

export function usePromise<T>(promiseFn: () => Promise<T>, deps?: any[]) {
  const [data, setData] = useState<T>(undefined)
  const [error, setError] = useState<Error>(undefined)

  useEffect(() => {
    promiseFn()
      .then(setData)
      .catch(setError)
  }, deps)

  return { data, error }
}
