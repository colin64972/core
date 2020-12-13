import NcaApps from '@cjo3/shared/assets/svgs/nca-apps'
import { Grid } from '@material-ui/core'
import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AngleBand } from '../AngleBand'
import { HeroBar } from '../HeroBar'
import { AppSection } from './AppSection'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(
  theme => ({
    extraPadding: {
      paddingBottom: theme.custom.setSpace('sm')
    }
  }),
  {
    name: 'Apps'
  }
)

export const Apps: React.FC = (): JSX.Element | null => {
  const classes = useStyles()

  const content = useSelector(state => state.content.apps)

  if (!content) return null

  return (
    <Grid container justify="center" className={classes.extraPadding}>
      <HeroBar src={NcaApps} tagline={content[0]} alt={content[1]} />
      {content[2].map(app => (
        <Fragment key={app.key}>
          <AngleBand right color="theme.palette.primary.main" />
          <AppSection {...app} />
        </Fragment>
      ))}
    </Grid>
  )
}
