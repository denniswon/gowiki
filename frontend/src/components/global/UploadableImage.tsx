import { transparentize } from 'polished'
import * as React from 'react'
import Dropzone, { DropzoneProps } from 'react-dropzone'

import { logger } from '@gowiki/core'
import { Icon } from '@gowiki/web'

import { shake } from 'styles/animations'

import styled, { css } from 'styled-components'
import { Box, BoxProps, c, m, s } from 'styles'

const dropzoneProps = {
  accept: 'image/*',
  multiple: false,
  acceptClassName: 'accepting',
  rejectClassName: 'rejecting'
}

type Props = {
  imageUrl?: string
  onImageDropped: (imageBlob: string) => void
}

type State = {
  imageUrl: string
}

export default class UploadableImage extends React.Component<Props, State> {
  state: State = {
    imageUrl: null
  }

  constructor(props) {
    super(props)
    this.state.imageUrl = props.imageUrl
  }

  updateImage = (imageUrl: string) => this.setState({ imageUrl })

  render() {
    const { imageUrl } = this.state
    if (imageUrl) return this.renderImage()
    else {
      return (
        <EmptyDropzone sz={160} onDrop={this.onImageDropped} {...dropzoneProps}>
          {({}) => (
            <Icon name="add_a_photo" size={40} color={c.black40} />
          )}
        </EmptyDropzone>
      )
    }
  }

  renderImage() {
    const { imageUrl } = this.state

    return (
      <StyledDropzone sz={160} onDrop={this.onImageDropped}>
        {({}) => (
          <ChangeImageButton center>
            <Img imageUrl={imageUrl} />
            <m.Overlay op={0} center touchable>
              <Box col center pabs sz="100%" bg="rgba(0,0,0, 0.5)">
                <Icon name="add_a_photo" size={20} color={c.white} />
                <m.T14 ph={20} mt={8} center bold color={c.white}>
                  Change Profile Image
                </m.T14>
              </Box>
            </m.Overlay>
          </ChangeImageButton>
        )}
      </StyledDropzone>
    )
  }

  onImageDropped = (acceptedFiles: File[], rejectedFiles: File[]) => {
    if (rejectedFiles.length > 0) {
      if (acceptedFiles.length > 0) {
        // some files were rejected other were not
      } else {
        // all files were rejected
      }
    } else if (acceptedFiles.length > 0) {
      const droppedImage = acceptedFiles[0]
      logger.info('Files were accpeted', 'Dropped Image:  ', droppedImage)
      const imageBlob = URL.createObjectURL(droppedImage)
      this.updateImage(imageBlob)
      this.props.onImageDropped(imageBlob)
    } else {
      // nothing was dropped
    }
  }
}

const Img = styled(Box)<{ imageUrl: string }>`
  width: 160px;
  height: 160px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 100px;
  background-image: url(${p => p.imageUrl});
`

const ChangeImageButton = styled(Box)`
  ${s.prel} border-radius:50%;
  overflow: hidden;
  ${s.anchor}
  &:hover .overlay {
    opacity: 1;
    ${s.anim}
  }
`

const StyledDropzone = styled(Dropzone)<DropzoneProps & BoxProps>` ${s.boxProps} ${s.aic} ${s.jcc} `

const accepting = css`
  background: ${c.lightPurple};
  border-color: ${c.brand};
  transition: 200ms;
`
const rejecting = css`
  background: ${transparentize(0.8, c.red)};
  border-color: ${c.red};
  transition: 200ms;
`

const EmptyDropzone = styled(StyledDropzone)`
  border-radius: 100px;
  border: 2px dashed ${c.black20};
  background: ${p => p.theme.inputBackground.idle};
  &:hover {
    border-color: ${c.black70};
    ${s.anchor}
    .icon {
      color: ${c.black70} !important;
    }
  }

  &.accepting {
    ${accepting}
    .fileCSV {
      transform: translateX(5px) rotateZ(-8deg);
      transition: 150ms;
    }
    .fileXLS {
      transform: translateX(-5px) rotateZ(8deg);
      transition: 150ms;
    }
  }
  &.rejecting {
    ${rejecting} ${shake}
  }
`
