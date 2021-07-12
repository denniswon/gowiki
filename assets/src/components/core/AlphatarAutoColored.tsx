import * as React from 'react'

import { getUniqueColorObjectForId } from '@gowiki/styles'

import Alphatar, { AlphatarProps } from 'components/core/Alphatar'

type Props = {
  id: string
} & AlphatarProps

const AlphatarAutoColored: React.SFC<Props> = (props: Props) => {
  const { bg, textColor } = getUniqueColorObjectForId(props.id)

  return <Alphatar bg={bg} color={textColor} {...props} />
}

export default AlphatarAutoColored
