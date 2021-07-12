// takes an uploaded file and resizes it
export async function resizeImage(file: File, maxW: number, maxH: number, format = 'image/png') {
  return new Promise<string>(res => {
    const reader = new FileReader()
    reader.onload = (readerEvent) => {
      const image = new Image()
      image.onload = (imageEvent) => {
        const canvas = document.createElement('canvas')
        let width = image.width
        let height = image.height

        if (width > maxW) {
          height = height / width * maxW
          width = maxW
        }
        if (height > maxH) {
          width = width / height * maxH
          height = maxH
        }
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(image, 0, 0, width, height)
        const dataBlob = canvas.toDataURL(format)
        res(dataBlob)
      }
      image.src = readerEvent.target.result as any
    }
    reader.readAsDataURL(file)
  })
}