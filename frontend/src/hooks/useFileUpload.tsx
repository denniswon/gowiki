import React, { useEffect, useRef, useState } from 'react'

import useDragDrop from './useDragDrop'
import usePaste from '../utils/usePaste'

import { Box } from '@gowiki/styles'

export default function useFileUpload(path: string, onUpload: (response: string) => void, method?: string,
    accept?: string): [JSX.Element, () => void, boolean] {
  const fileUploadRef = useRef<HTMLInputElement>()
  const [loading, setLoading] = useState(false)

  const [globalIframe] = useState(document.getElementsByName('attachmentFrame')?.[0] as HTMLIFrameElement)
  const iframeRef = useRef(globalIframe)
  const [wrapperRef, setWrapperRef] = useState<HTMLElement>(null)

  useEffect(() => {
    const doc = wrapperRef?.ownerDocument || window.document

    const pasteListener = (pasteEvent) => {
      if (!pasteEvent.clipboardData) return
      fileUploadRef.current.files = pasteEvent.clipboardData.files
      onFileSelect()
    }

    const onLoad = (e) => {
      setLoading(false)
      const content = iframeRef.current.contentDocument.body.textContent
      if (content && content.length > 0) onUpload(content)
    }

    iframeRef.current.onload = onLoad

    doc.addEventListener('paste', pasteListener, false)
    return () => doc.removeEventListener('paste', pasteListener)
  }, [wrapperRef])

  useDragDrop((files) => {
    fileUploadRef.current.files = files
    onFileSelect()
  })

  const selectFile = () => {
    fileUploadRef.current.click()
  }

  const onFileSelect = () => {
    setLoading(true)
    fileUploadRef.current.form.submit()
    fileUploadRef.current.value = null
  }

  const formElement = <Box ref={setWrapperRef}>
    <form target="attachmentFrame" encType="multipart/form-data" action={path} method={method || 'POST'} style={{ display: 'none' }}>
      <input type='file' name='upload' ref={fileUploadRef} onChange={onFileSelect} accept={accept} />
      {/* <input type='hidden' name='token' value={token}/> */}
    </form>
    {!globalIframe && <iframe ref={iframeRef} name="attachmentFrame" style={{ display: 'none' }} />}
  </Box>

  return [formElement, selectFile, loading]
}