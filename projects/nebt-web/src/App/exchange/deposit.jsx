import React, { createElement } from 'react'
import { useSelector } from 'react-redux'
import WorkingSpinner from '../components/workingSpinner'
import { selectSpinnerStatus } from '../../store/selectors'
import Grid from '@material-ui/core/Grid'
import { parseValidationRules } from '../helpers'
import { depositEth, depositNeb } from './fields'
import formMap from './formMap'

export default ({ ...props }) => {
  const { isDepositing } = useSelector(state => selectSpinnerStatus(state))
  if (isDepositing) return <WorkingSpinner />
  return (
    <Grid>
      {[depositNeb, depositEth].map(form =>
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
