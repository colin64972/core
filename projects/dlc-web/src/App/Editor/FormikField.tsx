import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { Field } from 'formik'
import React from 'react'

interface Props {
  id: string
  kind: string
  label: string
  name: string
  placeholder?: string
  helperMessage?: string
  style?: string
  options?: {
    key: string
    label: string
    value: string
  }[]
  required?: boolean
}

export const FormikField: React.FC<Props> = ({
  id,
  kind,
  label,
  name,
  options,
  placeholder,
  required,
  style,
  helperMessage
}): JSX.Element => (
  <Field name={name}>
    {({ field, meta: { error, touched } }) =>
      kind === 'text' ? (
        <TextField
          {...field}
          className={style}
          error={touched && error ? true : false}
          fullWidth
          helperText={error ? error : helperMessage}
          id={id}
          label={label}
          placeholder={placeholder}
          required={required}
          size="small"
        />
      ) : (
        <FormControl
          fullWidth
          required={required}
          className={style}
          error={touched && error ? true : false}>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <Select id={id} label={label} {...field}>
            {options.map(item => (
              <MenuItem key={item.key} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {touched && error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      )
    }
  </Field>
)
