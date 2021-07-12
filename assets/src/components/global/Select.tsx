import React from 'react'
import ReactSelect, { components } from 'react-select'

import { Dropdown, inputBorderWidth } from '@gowiki/web'

import styled from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

type Props = BoxProps & ReactSelect

const borderShadow = `inset 0 0 0 ${inputBorderWidth}px ${c.brand}`

const customStyles = {
  menu: provided => ({
    ...provided,
    border: 0,
    marginTop: -2,
    borderRadius: '0 0 6px 6px',
    boxShadow: `${borderShadow}`,
    transition: 'none',
    overflow: 'hidden'
  }),
  menuList: provided => ({ ...provided, paddingTop: 0, paddingBottom: 0 }),
  option: provided => ({ ...provided, padding: `12px 12px`, cursor: 'pointer', fontWeight: 600 }),
  singleValue: provided => ({ ...provided, padding: `12px 0`, cursor: 'pointer', fontWeight: 600 })
}

const customComponents = {
  Control: p => (
    <StyledControl isFocused={p.isFocused} isActive={p.menuIsOpen} {...p.innerProps} h={44}>
      {p.children}
    </StyledControl>
  ),
  DropdownIndicator: p => (
    <Box w={32} center>
      <Dropdown color={c.black} op={0.4} {...p.innerProps} isActive={p.isMenuOpen} />
    </Box>
  ),
  IndicatorSeparator: () => null
}

const Select = React.forwardRef<ReactSelect, any>((props: Props, ref: any) => {
  const selectProps = {
    components: customComponents,
    styles: customStyles,
    placeholder: 'Select an option...',
    theme: theme => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary: c.brand,
        primary75: c.getPurple(75),
        primary50: c.getPurple(50),
        primary25: c.getPurple(25),
      }
    })
  }

  return <StyledSelect {...selectProps} ref={ref} {...props} />
})

export default Select

const StyledSelect = styled(ReactSelect)`
  ${s.boxProps}
`
const StyledControl = styled(Box)<{ isActive?: boolean }>`
  width: 100%;
  ${m.inputBox} padding:4px;
  cursor: pointer;
  border-radius: ${p => (p.isActive ? `${m.units.rounding}px ${m.units.rounding}px 0 0` : `${m.units.rounding}px`)};
`
