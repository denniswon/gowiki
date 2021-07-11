import React, { useState } from 'react'

import styled, { css } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

export type Option = { value: string, label: string }

type Props = {
  options: Option[]
  defaultValue: string
  onChange: (option: Option) => void
} & BoxProps

const SegmentedControl: React.FunctionComponent<Props> = (props: Props) => {
  const { options, defaultValue, onChange, ...rest } = props
  const [ selected, setSelected ] = useState<string>(defaultValue)
  const onSelect = (option: Option) => {
    setSelected(option.value)
    onChange(option)
  }

  return (
    <Wrapper center h={40} p={4} {...rest}>
      {options.map( (op, index) => {
        const isSelected = selected === op.value
        return <StyledOption isSelected={isSelected} center onClick={() => onSelect(op)} flex1 key={index}>
          <m.Text>{op.label}</m.Text>
        </StyledOption>
      })}
    </Wrapper>
  )
}


export default SegmentedControl

const Wrapper = styled(Box)` ${m.segmentedControlBox} ${s.unselectable} `


const StyledOption = styled(Row)<{ isSelected?: boolean }>` border-radius:4px; padding:4px; height:100%; cursor:pointer; ${m.tMedium}
  > * { opacity:0.6; }
  &:hover{ background:${p => p.isSelected ? c.white : c.getBlack(8)};
    > * { opacity:${p => p.isSelected ? 1 : 0.8}; }
  }
  &:active{ background:${p => p.isSelected ? c.white : c.getBlack(13)};
    > * { opacity:1; }
  }
  ${p => p.isSelected && ` background:${c.purple} !important; color:${c.white};
    > * { opacity:1; }
  `}
`