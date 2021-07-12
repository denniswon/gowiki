import { useEffect, useState } from 'react'

let dragCounter = 0

export default function useDragDrop(onDrop: (files) => void) {
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    dragCounter = 0
  }, [])

  const handleDragIn = e => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true)
    }
  }

  const handleDragOut = e => {
    e.preventDefault()
    e.stopPropagation()
    if (dragCounter > 0) dragCounter--
    if (dragCounter > 0) return
    setDragging(false)
  }

  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter = 0
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter = 0
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer.files)
    }
    setDragging(false)
    e.dataTransfer.clearData()
  }

  // we attach listeners to document.body so that items can ber dropped anywhere on the page
  useEffect(() => {
    const body = document.body
    body.addEventListener('dragenter', handleDragIn)
    body.addEventListener('dragleave', handleDragOut)
    body.addEventListener('dragover', handleDrag)
    body.addEventListener('drop', handleDrop)
    return () => {
      body.removeEventListener('dragenter', handleDragIn)
      body.removeEventListener('dragleave', handleDragOut)
      body.removeEventListener('dragover', handleDrag)
      body.removeEventListener('drop', handleDrop)
    }
  }, [])

  return [dragging]
}
