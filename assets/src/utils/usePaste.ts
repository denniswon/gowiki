import { useEffect } from 'react'

type PasteEvent = {
  clipboardData?: {
    items: {
      type: string
      getAsFile: () => File
    }[]
  }
}

export default function usePaste(onPaste: (files) => void) {
  useEffect(() => {
    const pasteListener = (pasteEvent: PasteEvent) => {
      if (!pasteEvent.clipboardData || !pasteEvent.clipboardData.items) return
      const items = pasteEvent.clipboardData.items
      const files = []
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') != -1) {
          const file = items[i].getAsFile()
          files.push(file)
        }
      }
      if (files.length > 0) {
        onPaste(files)
      }
    }
    window.addEventListener('paste', pasteListener as EventListener, false)
    return () => window.removeEventListener('paste', pasteListener as EventListener)
  }, [])
}
