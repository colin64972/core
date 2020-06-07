import React from 'react'
import classNames from 'classnames'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import Grid from '@material-ui/core/Grid'
import ListIcon from '@material-ui/icons/List'
import { makeStyles } from '@material-ui/styles'
import { prepSetValue } from '../logic'

const useStyles = makeStyles(theme => ({
  label: {
    width: '100%'
  },
  labelButton: {
    width: '100%',
    border: 'none',
    padding: theme.custom.setSpace(),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize,
    borderRadius: `${theme.custom.borderRadius}px ${theme.custom.borderRadius}px 0 0`,
    backgroundColor: theme.palette.primary.main,
    transition: 'background-color 250ms ease-out',
    ...theme.custom.setFlex()
  },
  labelDisabled: {
    'backgroundColor': theme.palette.grey[400],
    'cursor': 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[300]
    }
  },
  labelWithValue: {
    'backgroundColor': theme.palette.pass[500],
    'cursor': 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.pass[400]
    }
  },
  labelIcon: {
    fontSize: theme.custom.setSpace() * 1.5,
    position: 'relative',
    top: -1,
    marginRight: theme.custom.setSpace() / 2,
    [theme.breakpoints.up('lg')]: {
      top: 0
    }
  },
  textArea: {
    width: '100%',
    resize: 'none',
    border: 'none',
    backgroundColor: 'white',
    ...theme.typography.body1,
    padding: theme.custom.setSpace(),
    color: theme.palette.bodyColor,
    borderRadius: `0 0 ${theme.custom.borderRadius}px ${theme.custom.borderRadius}px`,
    transition: 'color 250ms ease-out'
  }
}))

export const SetsTextAreaField = props => {
  console.log('%c FORMIK FIELD PROPS', 'color: yellow; font-size: large', props)

  const classes = useStyles()

  return (
    <FadeIn
      direction="y"
      position={Math.random() > 0.5 ? 100 : -100}
      className={classes[props.setField.group.className]}>
      <Grid container>
        <label
          id={props.setField.label.id}
          htmlFor={props.setField.textArea.setName}
          className={classes.label}>
          <button
            type="button"
            // onClick={labelClickHandler(fieldProps.field.name)}
            className={classNames(classes.labelButton, {
              // [classes.labelDisabled]: disabledSets.includes(
              //   setField.textArea.setName
              // ),
              // [classes.labelWithValue]:
              //   fieldProps.meta.value &&
              //   !disabledSets.includes(
              //     setField.textArea.setName
              //   )
            })}>
            <ListIcon className={classes.labelIcon} />
            {props.setField.label.name}
          </button>
        </label>
        <textarea
          className={classNames(classes.textArea)}
          onChange={event => {
            // props.handleChange(event)
          }}
          onBlur={event => {
            // props.handleBlur(event)
            // customBlurHandler(
            //   fieldProps.field.name,
            //   event.target.value,
            //   props.setFieldValue
            // )
          }}
          rows={props.setField.textArea.rows}
          placeholder={props.setField.textArea.placeholder}
          id={props.setField.textArea.setName}
          name={props.setField.textArea.setName}
          // disabled={disabledSets.includes(
          //   props.setField.textArea.setName
          // )}
          value={props.field.value}
        />
      </Grid>
    </FadeIn>
  )
}
