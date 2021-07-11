import { rgba } from 'polished'
import React, { PropsWithChildren, useEffect, useState } from 'react'

import { Icon, Switch } from '@gowiki/web'

import styled, { css } from 'styled-components'
import { Box, BoxProps, c, Column, m, Row, s } from 'styles'

export const Title = styled(m.Text)`
  ${m.t24} ${m.tBold} margin-bottom:60px;
`

export const SectionHeading = ({ iconName, children, ...rest }: { iconName: string; children: any }) => (
  <Row {...rest}>
    <Icon name={iconName} mr={8} color={c.brand} />
    <m.T18 semi mb={24}>
      {children}
    </m.T18>
  </Row>
)

export const SettingsGroup = p => <Column mb={60} {...p} />

export const SettingsItem = styled(Box)`
  margin-bottom: ${p => p.mb || 20}px;
  padding-bottom: ${p => p.pb || 20}px;
  border-bottom: 1px solid ${c.black10};
  &:last-child {
    margin-bottom: 0;
    border: 0;
  }
`

export const HighlightedSettingsGroup = styled(SettingsGroup).attrs({
  p: 20,
  br: m.units.rounding,
  pb: 0,
})`
  ${s.flxCol} flex:1;
  background:${c.getBlack(4)}};
  box-shadow:inset 0 0 0 1px ${c.getBlack(8)};
  border:none;

  ${p => p.on && `
    background:${c.getPurple(10)};
    box-shadow:inset 0 0 0 2px ${c.getPurple(10)};
  `}

  ${p => p.installed && `
    background:${rgba(c.green, 0.05)};
    border: 1px solid ${rgba(c.green, 0.2)};
  `}`


// Settings
export const ScreenTitle = p => (
  <m.T24 bold mb={60} {...p}>
    {p.children}
  </m.T24>
)

export const SettingsHeader = ({ iconName, children, img, ...rest }: SettingsHeaderProps) => (
  <Row mb={12} pb={12} {...rest}>
    {iconName && <Icon name={iconName} size={20} op={0.8} mr={8} />}
    {img && <m.Img src={img} sz={20} mr={8} />}
    <m.T18 row aib semi color={c.black}>
      {children}
    </m.T18>
  </Row>
)

export const SettingsTitle = p => <m.T15 medium lh="130%" {...p} />

export const SettingsDesc = p => <m.T14 op={0.7} mt={8} lh="150%" {...p} />


export const Select = styled.select<BoxProps>`
  margin-left: ${p => p.ml || 48 }px;
  cursor:pointer;
  ${m.inputBox} height:40px;
  ${m.t14} ${m.tMedium}  padding:8px 32px 8px 12px;
  &:last-child {
    margin-bottom: 0;
  }
`

type SettingsHeaderProps = {
  iconName?: string
  img?: string
  children: any
} & BoxProps



type IntegrationImgProps = PropsWithChildren<{ caption?: string; src: string, fallbackIconName?: string }> & BoxProps
export const IntegrationImg = ({ caption, src, fallbackIconName, children, ...rest }: IntegrationImgProps) => {
  const [iconName, setIconName] = useState<string>(null)

  useEffect(() => {
    setIconName(null)
  }, [src])

  const onError = (e) => {
    fallbackIconName && setIconName(fallbackIconName)
  }

  return (
    <Column mb={20} {...rest}>
      <Box prel>
        {iconName && <Icon name={iconName} size={20} color={c.brand2} mr={8} />
          || <m.Img onError={onError} src={src} display="block" br={8} w="100%" h="auto" boxShadow={`inset 0 0 0 2px ${c.black10}`} />}
        <Box pabs left={0} br={8} top={0} sz="100%" boxShadow={`inset 0 0 0 2px ${c.black10}`} />
      </Box>
      {children && <m.T14 paragraph mt={6} op={0.6} pl={2}>
        {children}
      </m.T14>}
    </Column>
  )
}

export const IntegrationInformation = p => <m.T15 lh={24} op={0.85} mb={16} {...p} />
// const IntegrationImgWrapper = styled(m.Img)`
//   &::after{ height:100%; width:100%; content: ''; display:block; position:absolute; top:0;
//     box-shadow:inset 0 0 0 2px ${c.black10};
//   }
// `



export const SettingsSwitch = (p) => <Switch {...p} />


export const SettingsPressable = p =>
  <m.Pressable row vCenter asfs color={c.purple} p={8} {...p} />
