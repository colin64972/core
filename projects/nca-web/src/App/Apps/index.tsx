import NcaApps from '@cjo3/shared/assets/svgs/nca-apps'
import { Grid } from '@material-ui/core'
import React, { Fragment } from 'react'
import { AngleBand } from '../AngleBand'
import { HeroBar } from '../HeroBar'
import { AppSection } from './AppSection'

export const Apps: React.FC = (): JSX.Element => (
  <Grid container justify="center">
    <HeroBar
      src={NcaApps}
      tagline="Live App Portfolio and Code Samples"
      alt="apps-image"
    />
    {appContent.map(app => (
      <Fragment key={app.key}>
        <AngleBand
          top
          bgColor="theme.palette.grey[200]"
          left={app.angleDir === 'left'}
          right={app.angleDir === 'right'}
        />
        <AppSection {...app} />
      </Fragment>
    ))}
  </Grid>
)
