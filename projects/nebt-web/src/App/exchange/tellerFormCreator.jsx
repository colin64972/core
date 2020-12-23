import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ReduxFormField from '../components/reduxFormField'

const useStyles = makeStyles(theme => ({
  formGroup: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.custom.setSpace('sm')
  },
  input: {
    flexGrow: 1,
    paddingRight: theme.custom.setSpace()
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const { name, fields, submitHandler, valid, dirty } = props
  return (
    <form onSubmit={submitHandler} id={name} name={name}>
      {fields.map(field => {
        const { key, buttonLabel, ...rest } = field
        return (
          <Grid key={key} className={classes.formGroup}>
            <Grid item className={classes.input}>
              <ReduxFormField {...rest} />
            </Grid>
            <Button
              variant="contained"
              color="primary"
              disabled={!dirty || !valid}
              type="submit">
              {buttonLabel}
            </Button>
          </Grid>
        )
      })}
    </form>
  )
}
