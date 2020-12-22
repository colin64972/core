import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ReduxFormField from '../components/reduxFormField'

const useStyles = makeStyles(theme => ({
  formGroup: {
    'marginBottom': theme.custom.setSpace(),
    '&:last-of-type': {
      marginBottom: 0
    }
  },
  item: {
    ...theme.custom.flexRowCentered,
    padding: theme.custom.setSpace()
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const { name, fields, submitHandler, valid, dirty } = props
  return (
    <Grid item xs={12}>
      <form onSubmit={submitHandler} id={name} name={name}>
        {fields.map(field => {
          const { key, buttonLabel, ...rest } = field
          return (
            <Grid
              container
              justify="space-between"
              align="center"
              key={key}
              className={classes.formGroup}>
              <Grid item xs={8} className={classes.item}>
                <ReduxFormField {...rest} />
              </Grid>
              <Grid item xs={4} className={classes.item}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!dirty || !valid}
                  type="submit">
                  {buttonLabel}
                </Button>
              </Grid>
            </Grid>
          )
        })}
      </form>
    </Grid>
  )
}
