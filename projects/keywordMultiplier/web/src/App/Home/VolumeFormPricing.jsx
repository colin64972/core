import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { formatToDollars } from '@colin30/shared/general/formatting'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'

const useStyles = makeStyles(theme => ({
  formGroup: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0`
  }
}))

export const VolumeFormPricing = ({ trialId, formSectionClass }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()
  const trial = useSelector(state =>
    state.app.trials.items.find(trial => trial.id === trialId)
  )

  return (
    <Paper className={formSectionClass}>
      <FadeIn direction="x" position={Math.random() > 0.5 ? 100 : -100}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell component="th">Keywords</TableCell>
              <TableCell>{trial.list.length} @ $0.01 CAD each</TableCell>
              <TableCell>
                $&nbsp;
                {formatToDollars(
                  trial.list.length * constants.VOLUME_DATA.KEYWORD_PRICE
                )}
                &nbsp;CAD
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Processing Fee</TableCell>
              <TableCell></TableCell>
              <TableCell>
                $&nbsp;
                {formatToDollars(
                  trial.list.length *
                    constants.VOLUME_DATA.KEYWORD_PRICE *
                    0.029
                )}
                &nbsp;CAD
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FadeIn>
    </Paper>
  )
}
