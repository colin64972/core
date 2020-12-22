import React, { createElement } from 'react'
import { useSelector } from 'react-redux'
import WorkingSpinner from '../components/workingSpinner'
import { selectSpinnerStatus } from '../../store/selectors'
import Grid from '@material-ui/core/Grid'
import { parseValidationRules } from '../helpers'
import { withdrawEth, withdrawNeb } from './fields'
import formMap from './formMap'

export default ({ ...props }) => {
  const { isWithdrawing } = useSelector(state => selectSpinnerStatus(state))
  if (isWithdrawing) return <WorkingSpinner />
  return (
    <Grid container>
      {[withdrawNeb, withdrawEth].map(form =>
        createElement(formMap[form.name], {
          key: form.key,
          name: form.name,
          validationRules: parseValidationRules(form.fields),
          fields: form.fields,
          currency: form.currency
        })
      )}
    </Grid>
  )
}
