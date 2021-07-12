import copyToClipboard from 'clipboard-copy'
import moment from 'moment'
import React from 'react'

import { config, Member, pluralize, renderTimeString } from '@gowiki/core'
import { Icon } from '@gowiki/web'

import HelpButton from 'components/core/HelpButton'
import Popover from 'components/global/Popover'
import PopoverMenu from 'components/popovers/PopoverMenu'
import appService from 'services/appService'

import styled from 'styled-components'
import { BoxProps, Column, m } from 'styles'

type Props = {} & BoxProps

const HelpButtonPopover: React.FunctionComponent<Props> = (props: Props) => {
  const onClickHelpCenter = e => {
    appService.openUrl('https://tandem.chat/help_center')
  }
  const onClickProductUpdates = e => {
    appService.openUrl('https://tandem.chat/product_updates')
  }
  const [copied, setCopied] = React.useState<boolean>(false)
  const envString = [`${window.appVersionString ? window.appVersionString : 'Tandem ' + window.appVersion}`,
    `Web Env: ${config.env} / Hash: ${config.hash}`]
  const onCopy = () => {
    setCopied(true)
    copyToClipboard(envString.join('\n'))
    setTimeout(() => setCopied(false), 5000)
  }

  const tooltipContent = (
    <PopoverMenu>
      <m.PopoverPressable onClick={() => appService.openUrl('https://tandem.chat/best_practices')}>
        <Icon name="star" mr={8} />
        <m.Text medium>Best Practices</m.Text>
      </m.PopoverPressable>

      <m.Divider mh={-m.units.popover.padding.default} />

      <m.PopoverPressable className="action" onClick={onClickHelpCenter}>
        <Icon name="book" mr={8} />
        <m.Text medium>Help Center</m.Text>
      </m.PopoverPressable>

      <m.PopoverPressable className="action" onClick={onClickProductUpdates}>
        <Icon name="whatshot" mr={8} />
        <m.Text medium>Product Updates</m.Text>
      </m.PopoverPressable>

      <m.Divider mh={-m.units.popover.padding.default} />

      {/* <SimpleTooltip placement={'top'} content={copied ? 'Copied' : 'Copy'}> */}
        <m.T11 medium op={0.4} ph={8} onClick={onCopy}>
          {envString[0]}<br />{envString[1]}<br />{envString[2]}
        </m.T11>
      {/* </SimpleTooltip> */}
    </PopoverMenu>
  )

  return (
    <Popover content={tooltipContent} placement="top-end" offset={[0, 8]}
      sz={42} pabs bottom='100%' mb={16} right={16}
    >
      {({on}) => <HelpButton onClick={() => {}} isActive={on} /> }
    </Popover>
  )
}

function renderDate(ts: number) {
  const m = moment(ts).local()
  const sameDay = m.isSame(moment(), 'day')
  return m.format(sameDay ? 'LT' : 'l @ LT')
}

function renderDuration(durationSecs: number) {
  if (!durationSecs) return null

  return <>Length: {renderTimeString(durationSecs * 1000)}</>
}

const renderMembers = (members: Member[]) => {
  members = members.filter(Boolean)
  if (members.length == 0) return null

  return <>&nbsp;&bull;&nbsp;{members.length} {pluralize('member', members.length)}</>
}

export default HelpButtonPopover
