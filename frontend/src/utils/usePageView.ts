import { useEffect } from 'react'

// import { tracker } from 'api'

export function usePageView(pageName: string, value1?: string, value2?: string, value3?: number, meta?: any) {
  useEffect(() => {
    // tracker.pageView(pageName, value1, value2, value3, meta)
  }, [pageName, value1, value2, value3])
}

