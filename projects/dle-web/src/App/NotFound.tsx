import { Header } from './Header'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { theme } from '../theme'

const useStyles = makeStyles(theme => ({
  NotFound_container: {
    height: '100%'
  }
}))

export const NotFound: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container className={classes.NotFound_container}>
      <Header
        name="NotFound"
        theme={theme}
        title="Error"
        subTitle="Sorry, something went wrong"
        bgColor="theme.palette.grey[900]"
        bgUrl="https://image.freepik.com/free-photo/rendering-abstract-futuristic-background-with-glowing-neon-blue-orange-lights_181624-19807.jpg"
        buttonHref="/"
        buttonLabel="Home"
      />
    </Grid>
  )
}
