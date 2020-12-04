import { Grid, Typography } from '@material-ui/core'
import { HeroBar } from '../HeroBar'
import React from 'react'
import NcaContact from '@cjo3/shared/assets/svgs/nca-contact'

export const Contact: React.FC = (): JSX.Element => (
  <Grid container justify="center">
    <HeroBar
      src={NcaContact}
      tagline="Want to work together? Contact me anytime!"
      alt="contact-image"
    />
    <Typography variant="body1">
      Ipsum justo nonumy vero kasd magna nonumy et. Gubergren sit diam elitr no
      nonumy takimata est, stet lorem sadipscing et amet nonumy duo. Accusam
      vero takimata ut lorem diam, et dolores dolor kasd dolor dolore. Vero est
      et et vero justo eos stet aliquyam dolores. Elitr elitr erat et sea.
    </Typography>
  </Grid>
)
