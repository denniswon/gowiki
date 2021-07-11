import { Field, FieldAttributes, FieldProps } from 'formik'
import * as React from 'react'

import Input, { Props as AllInputProps } from 'components/global/forms/Input'

export type onChangeParams = (event: React.FormEvent<HTMLInputElement>, fieldProps: FieldProps) => void

type InputProps = Pick<AllInputProps, Exclude<keyof AllInputProps, 'onChange'>>

type Props = InputProps & {
  onChange?: onChangeParams
}

const FormikInput: React.SFC<Props> = (props: Props) => (
  <Field {...props}>{(fp: FieldProps) => <InnerInput {...props} {...fp} />}</Field>
)

export default FormikInput

type InnerInputProps = {
  onChange?: onChangeParams
} & FieldProps

const InnerInput: React.SFC<InnerInputProps> = (props: InnerInputProps) => {
  const { onChange, field, form, ...rest } = props

  const touch = form.touched[field.name]
  const error = form.errors[field.name]
  const hasError = touch && error

  return (
    <Input
      {...rest}
      {...field}
      error={hasError && error}
      onChange={e => (props.onChange ? props.onChange(e, { field, form }) : field.onChange(e))}
    />
  )
}
