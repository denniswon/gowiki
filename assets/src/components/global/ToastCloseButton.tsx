import * as React from 'react'

type Props = {
  onClose: () => void
  closeToast?: () => void // passed in by react-toastify. We're expected to call it.
}

const ToastCloseButton: React.SFC<Props> = (props: Props) => {
  const { onClose, closeToast, ...rest } = props

  return (
    <button
      className="Toastify__close-button Toastify__close-button--"
      onClick={() => {
        onClose()
        closeToast()
      }}
    >
      ✖
    </button>
  )
}

export default ToastCloseButton
