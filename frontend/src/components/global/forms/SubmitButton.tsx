import * as React from 'react'

import { Box, c, Column, m, Row, s } from 'styles'

import FormButton, { Props } from 'components/global/forms/FormButton'

const SubmitButton: React.SFC<Props> = (props: Props) => {
  return <FormButton type="submit" bg={c.black} color={c.white} pv={14} ph={18} {...props} />
}

export default SubmitButton
