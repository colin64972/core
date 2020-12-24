import { Grid, Typography } from '@material-ui/core'

import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { Field } from 'formik'
import React from 'react'
import { SelectOption } from '../../../index'
import clsx from 'clsx'
import { inputTypes } from '../constants'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  theme => {
    const textInput = {
      'width': '100%',
      'border': 'none',
      'backgroundColor': theme.palette.grey[200],
      'color': theme.palette.bodyColor,
      'fontFamily': theme.typography.fontFamily,
      'margin': `${theme.custom.setSpace() / 2}px 0`,
      'fontSize': theme.typography.fontSize,
      'padding': theme.custom.setSpace() / 2,
      'transition': 'all 250ms ease-out',
      '&::placeholder': {
        color: theme.palette.grey[400]
      }
    }
    return {
      formGroup: {
        width: '100%',
        marginBottom: theme.custom.setSpace()
      },
      formLabel: {
        ...theme.typography.shareTechMono,
        width: '100%',
        margin: 0,
        display: 'block'
      },
      textInput: {
        ...textInput
      },
      textArea: {
        ...textInput,
        resize: 'none',
        overflowY: 'scroll'
      },
      select: {
        ...textInput
      },
      errorText: {
        color: theme.palette.primary.main
      },
      errorBorder: {
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 3,
        backgroundColor: theme.palette.primary[50]
      },
      helperText: {
        ...theme.typography.shareTechMono,
        width: '100%',
        textAlign: 'right',
        margin: 0
      }
    }
  },
  { name: 'FormikField' }
)

interface Props {
  name: string
  label: string
  inputType: number
  placeholder?: string
  helperText?: string
  required?: boolean
  rows?: number
  selectOptions?: SelectOption[]
}

export const FormikField: React.FC<Props> = ({
  name,
  label,
  inputType,
  placeholder,
  helperText,
  required,
  rows,
  selectOptions
}): JSX.Element => {
  const classes = useStyles()

  const id = `${name}-input`

  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <Grid className={classes.formGroup}>
          <FadeIn direction="x" position={100}>
            <label
              htmlFor={id}
              className={clsx(classes.formLabel, {
                [classes.errorText]: meta.touched && meta.error
              })}>
              {label}
              {required && '*'}
            </label>
          </FadeIn>

          {inputType === inputTypes.select && (
            <FadeIn direction="x" position={100}>
              <select {...field} id={id} className={clsx(classes.select)}>
                {selectOptions &&
                  selectOptions.map(item => (
                    <option key={item.key} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </FadeIn>
          )}

          {inputType === inputTypes.text && rows && (
            <FadeIn direction="x" position={100}>
              <textarea
                {...field}
                rows={rows}
                placeholder={placeholder}
                id={id}
                className={clsx(classes.textArea, {
                  [classes.errorText]: meta.touched && meta.error,
                  [classes.errorBorder]: meta.touched && meta.error
                })}
              />
            </FadeIn>
          )}

          {inputType === inputTypes.text && !rows && (
            <FadeIn direction="x" position={100}>
              <input
                {...field}
                type={inputType}
                className={clsx(classes.textInput, {
                  [classes.errorBorder]: meta.touched && meta.error,
                  [classes.errorText]: meta.touched && meta.error
                })}
                placeholder={placeholder}
                id={`${field.name}-input`}
              />
            </FadeIn>
          )}

          <Typography
            variant="body1"
            className={clsx(classes.helperText, {
              [classes.errorText]: meta.touched && meta.error
            })}>
            {meta.touched && form.errors[field.name] ? meta.error : helperText}
          </Typography>
        </Grid>
      )}
    </Field>
  )
}
