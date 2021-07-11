import React, { useEffect, useState } from 'react'
import ReactModal, { Props as ReactModalProps, Styles } from 'react-modal'

import Theme from 'components/global/Theme'

import styled, { ThemeProvider } from 'styled-components'
import { m } from 'styles'

type StyleMap = { [key: string]: any }
type ModalStyles = ((provided: StyleMap) => StyleMap ) | StyleMap
type Props = {
  children: any
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void
  isOpen?: boolean
  contentStyles?: ModalStyles
  overlayStyles?: ModalStyles
  innerStyles?: ModalStyles
  open?: () => void
} & ReactModalProps

export default function Modal(props: Props) {
  const { children, isOpen: isOpenProp = false, ...rest } = props
  const [isOpenManual, setIsOpen] = useState(false)

  useEffect(() => {
    ReactModal.setAppElement('#react-app')
  }, [])

  const { content, overlay } = defaultStyles
  const styles = {
    content: { ...content, ...getStyles(props.contentStyles, content) },
    overlay: { ...overlay, ...getStyles(props.overlayStyles, overlay) }
  }

  const open = () => {
    if (props.open) props.open()
    else setIsOpen(true)
  }

  const close = (e) => {
    props.onRequestClose(e)
    if (isOpenManual) setIsOpen(false)
  }

  const childrenProps = {
    close,
    open,
  }

  return (
    <ReactModal
      isOpen={isOpenProp || isOpenManual}
      style={styles}
      onRequestClose={close}
      closeTimeoutMS={transitionSpeed}
      {...rest}
    >
      <Theme theme={m.themes.whiteBackground} style={{...props.innerStyles}}>
        {typeof children === 'function' ? children(childrenProps) : children}
      </Theme>
    </ReactModal>
  )
}

const transitionSpeed = 150

const getStyles = (customStyles: StyleMap, defaultStyles: StyleMap) => {
  return typeof customStyles === 'function' ? customStyles(defaultStyles) : customStyles || {}
}

const defaultStyles: Styles = {
  content: {
    position: 'static',
    width: '100%',
    maxWidth: 360,
    overflow: 'auto',
    borderRadius: 8,
    padding: 0,
    border: 0,
    transition: `transform ${transitionSpeed}ms cubic-bezier(0.165, 0.84, 0.44, 1)`,
    // WebkitAppRegion: 'no-drag',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    transition: `opacity ${transitionSpeed}ms ease-in-out`,
    zIndex: m.zIndex.modal,
  }
}
