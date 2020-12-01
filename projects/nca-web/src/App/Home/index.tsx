import { Grid, Typography } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import React from 'react'

export const Home: React.FC = (): JSX.Element => (
  <Grid>
    <Typography variant="h1">{process.env.APP_NAME}</Typography>
    <ScheduleIcon />
    <Typography variant="body1">
      Ipsum justo nonumy vero kasd magna nonumy et. Gubergren sit diam elitr no
      nonumy takimata est, stet lorem sadipscing et amet nonumy duo. Accusam
      vero takimata ut lorem diam, et dolores dolor kasd dolor dolore. Vero est
      et et vero justo eos stet aliquyam dolores. Elitr elitr erat et sea.
    </Typography>
  </Grid>
)
