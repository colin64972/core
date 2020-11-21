import { Header } from './Header'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { HomeHeader } from '../assets'
import { theme } from '../theme'

const useStyles = makeStyles(theme => ({
  Home_container: {}
}))

export const Home: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container className={classes.Home_container}>
      <Header
        name="Home"
        title={process.env.APP_NAME}
        subTitle="Quickly change detection limit values"
        bgColor="theme.palette.primary.main"
        bgUrl={HomeHeader.paths[0]}
        buttonHref="/converter"
        buttonLabel="Start"
      />
    </Grid>
  )
}
