import * as React from 'react'
import { useContext } from 'react'

import { Theme } from '@gowiki/styles'

import { ThemeContext } from 'styled-components'

const useTheme = () => {
  const themeContext = useContext(ThemeContext as React.Context<Theme>)
  return themeContext
}

export default useTheme