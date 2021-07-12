import * as React from 'react'

import { useSettingsStore } from '@gowiki/app'
import { Icon } from '@gowiki/web'

import Popover from 'components/global/Popover'
import PopoverMenu from 'components/popovers/PopoverMenu'
import PopoverOption from 'components/popovers/PopoverOption'

import { c, Column, m } from 'styles'

type Props = {
  onClickRemove: () => void,
  onClickSetRole: () => void,
  nextRole: string
}

const TeamMemberOptionsPopover: React.FunctionComponent<Props> = (props: Props) => {
  const { onClickSetRole, onClickRemove } = props
  const tooltipContent = (
    <PopoverMenu>
      <PopoverOption icon="person" text={`Make ${props.nextRole}`} onClick={onClickSetRole} />
      <PopoverOption icon="delete" text='Remove from team' iconColor={c.red} onClick={onClickRemove} />
    </PopoverMenu>
  )

  return (
    <Popover content={tooltipContent} placement="bottom-end" >
      {({on}) => (
        <m.Pressable row center p={8} isActive={on}>
          <Icon size={24} name="more_horiz" />
        </m.Pressable>
      )}
    </Popover>
  )
}

export default TeamMemberOptionsPopover
