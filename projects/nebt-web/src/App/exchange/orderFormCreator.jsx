import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ReduxFormField from '../components/reduxFormField'
import {
  selectBuyOrderValue,
  selectSellOrderValue
} from '../../store/selectors'
import { setOrderButtonLabel } from '../helpers'

const useStyles = makeStyles(theme => ({
  formGroup: {
    'marginBottom': theme.custom.setSpace(),
    '&:last-of-type': {
      marginBottom: 0
    }
  },
  item: {
    ...theme.custom.flexRowCentered,
    padding: theme.custom.setSpace(),
    paddingBottom: 0
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const { name, fields, submitHandler, valid, dirty } = props
  let orderValue
  if (name === 'buyOrder') {
    orderValue = useSelector(state => selectBuyOrderValue(state))
  } else {
    orderValue = useSelector(state => selectSellOrderValue(state))
  }
  return (
    <form onSubmit={submitHandler} id={name} name={name}>
      {fields.map(field => {
        const { key, ...rest } = field
        return (
          <Grid
            container
            justify="space-between"
            align="center"
            key={key}
            className={classes.formGroup}>
            <Grid item xs={12} className={classes.item}>
              <ReduxFormField {...rest} />
            </Grid>
          </Grid>
        )
      })}
      <Grid
        container
        justify="space-between"
        align="center"
        className={classes.formGroup}>
        <Grid item xs={12} className={classes.item}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!dirty || !valid}
            type="submit">
            {setOrderButtonLabel(name, dirty, valid, orderValue)}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
