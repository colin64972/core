import NcaApps from '@cjo3/shared/assets/svgs/nca-apps'
import { Grid } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { AngleBand } from '../AngleBand'
import { HeroBar } from '../HeroBar'
import { AppSection } from './AppSection'

export const Apps: React.FC = (): JSX.Element | null => {
  const content = useSelector(state => state.content.apps)

  if (!content) return null

  return (
    <Grid container justify="center">
      <HeroBar src={NcaApps} tagline={content[0]} alt={content[1]} />
      {content[2].map((app, appIndex) => (
        <Fragment key={app.key}>
          <AngleBand right={appIndex % 2 !== 0} />
          <AppSection {...app} />
        </Fragment>
      ))}
    </Grid>
  )
}
