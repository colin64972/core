import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(
  theme => ({
    outer: {
      background: ({ background }) => eval(background)
    },
    inner: {
      ...theme.custom.contentContainer,
      padding: theme.custom.setSpace('sm')
    }
  }),
  {
    name: 'ContentContainer'
  }
)

interface Props {
  gradient?: string
  bgColor?: string
  children: React.ReactNode
}

export const ContentContainer: React.FC<Props> = ({
  gradient,
  bgColor,
  children
}): JSX.Element => {
  const classes = useStyles({
    background: gradient ? gradient : bgColor
  })

  return (
    <Grid container justify="center" className={classes.outer}>
      <Grid className={classes.inner}>{children}</Grid>
    </Grid>
  )
}
