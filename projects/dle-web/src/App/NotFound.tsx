import { Header } from './Header'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { NotFoundBg } from '../assets'

const useStyles = makeStyles(
  theme => ({
    NotFound_container: {
      height: '100%'
    }
  }),
  {
    name: 'NotFound'
  }
)

export const NotFound: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container className={classes.NotFound_container}>
      <Header
        title="Error"
        subTitle="Sorry, something went wrong"
        bgColor="theme.palette.grey[900]"
        bgUrl={NotFoundBg.paths[0]}
        buttonHref="/"
        buttonLabel="Home"
      />
    </Grid>
  )
}
