import NcaResume from '@cjo3/shared/assets/svgs/nca-resume'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { HeroBar } from '../HeroBar'

export const Resume: React.FC = (): JSX.Element => (
  <Grid container justify="center">
    <HeroBar
      src={NcaResume}
      tagline="The 411 Lowdown of my Resume"
      alt="resume-image"
    />
    <Typography variant="body1">
      Ipsum justo nonumy vero kasd magna nonumy et. Gubergren sit diam elitr no
      nonumy takimata est, stet lorem sadipscing et amet nonumy duo. Accusam
      vero takimata ut lorem diam, et dolores dolor kasd dolor dolore. Vero est
      et et vero justo eos stet aliquyam dolores. Elitr elitr erat et sea.
    </Typography>
  </Grid>
)
