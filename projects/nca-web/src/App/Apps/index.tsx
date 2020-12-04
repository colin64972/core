import NcaApps from '@cjo3/shared/assets/svgs/nca-apps'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Hero } from '../Hero'

export const Apps: React.FC = (): JSX.Element => (
  <Grid container justify="center">
    <Hero
      src={NcaApps}
      tagline="App Portfolio with Code Samples"
      alt="apps-image"
    />
    <Typography variant="body1">
      Ipsum justo nonumy vero kasd magna nonumy et. Gubergren sit diam elitr no
      nonumy takimata est, stet lorem sadipscing et amet nonumy duo. Accusam
      vero takimata ut lorem diam, et dolores dolor kasd dolor dolore. Vero est
      et et vero justo eos stet aliquyam dolores. Elitr elitr erat et sea.
    </Typography>
  </Grid>
)
