import { Header } from '@cjo3/shared/react/components/Header'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { HomeHeader } from '../assets'

const useStyles = makeStyles(theme => ({
  Home_container: {
    height: '100%'
  }
}))

export const Home: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container className={classes.Home_container}>
      <Header
        title={process.env.APP_NAME}
        subTitle="Quickly change detection limit values"
        bgColor="theme.palette.primary.main"
        bgUrl={HomeHeader.paths[0]}
        buttonHref="/editor"
        buttonLabel="Start"
      />
    </Grid>
  )
}
