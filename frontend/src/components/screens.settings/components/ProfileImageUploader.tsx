import React, { ChangeEvent, FormEvent, useState } from 'react'

import { API } from '@gowiki/api'
import { Team, User } from '@gowiki/core'
import { Icon, Loader } from '@gowiki/web'

import Avatar from 'components/core/Avatar'

import styled from 'styled-components'
import { Box, c, Column, m, Row, s } from 'styles'

type Props = {
  user: User,
  team?: Team,
  token: string
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const ProfileImageUploader: React.FunctionComponent<Props> = (props: Props) => {
  const { user, team, token } = props
  const [loading, setLoading] = useState<boolean>(false)

  const onChangeProfileImageFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    if (!file || loading) return
    setLoading(true)
    event.target.form.submit()
    setLoading(false)
  }

  const fileUpload = (e: FormEvent) => {
    if (!loading) {
      e.preventDefault()
      return
    }
  }

  return (
    <form method="post" action={`${API.endpoint}/images/profile_picture`} encType="multipart/form-data" onSubmit={fileUpload}>
      <input name="token" type="hidden" value={token} />
      <input name="team" type="hidden" value={team?.id} />
      <input name="redirect" type="hidden" value={location.href} />

      {/* <SimpleTooltip content='Upload new profile image'> */}
        <Wrapper center>
          <Avatar pabs size={64} textSize={28} id={user.id} name={user.name} imageUrl={user.profile_img} />
          <EditTag sz={28} pabs right={-8} top={-8} center br={20} bg={c.white} >
            <Icon size={18} name='edit' op={0.8} />
          </EditTag>
          {loading && <Loader pabs size={30} color="black" />}
          <ImageInput type='file' name='upload' accept='image/*' onChange={onChangeProfileImageFile} />
        </Wrapper>
      {/* </SimpleTooltip> */}
    </form>
  )
}


export default ProfileImageUploader

const EditTag = styled(Box)`
  cursor: pointer;
  border: 1px solid ${p => p.theme.ink10};
  box-shadow: ${m.shadows.base};
  z-index: 2;
`

const Wrapper = styled(Box)` position:relative;
  &:hover{
    .profile-image{ opacity:0.5; }
  }
  input{ opacity:0; cursor:pointer; }
`

const ImageInput = styled.input` position:absolute; width:100%; height:100%; `