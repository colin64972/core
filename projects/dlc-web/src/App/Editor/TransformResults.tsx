import { Grid, LinearProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  isProcessingSelector,
  transformResultSelector
} from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  TransformResults_bg: {
    padding: theme.custom.setSpace('sm'),
    backgroundColor: theme.palette.grey[300]
  }
}))

export const TransformResults: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const isProcessing = useSelector(isProcessingSelector)

  const transformResult = useSelector(transformResultSelector)

  if (isProcessing)
    return (
      <Grid item xs={12}>
        <LinearProgress color="primary" />
      </Grid>
    )

  if (!transformResult) return null

  return (
    <Grid container component="section" className={classes.TransformResults_bg}>
      <Grid item>
        <Typography variant="h3">Transform Results</Typography>
        <Typography variant="body1">
          Dolor ut voluptua sadipscing sea duo erat. Et labore est elitr sanctus
          amet dolor et at et, ipsum tempor diam lorem sit magna sed sadipscing
          consetetur, diam diam vero lorem aliquyam ut duo ut. Diam et et et
          invidunt sit invidunt voluptua sea et, sed labore no sed diam. Et.
        </Typography>
        <p>{JSON.stringify(transformResult, null, 2)}</p>
      </Grid>
    </Grid>
  )
}
