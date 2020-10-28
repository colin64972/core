import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  div: {
    backgroundColor: theme.palette.primary.main
  },
  h1: {
    color: 'green'
  }
}))

export const App = () => {
  const classes = useStyles()
  return (
    <CssBaseline>
      <div className={classes.div}>
        <h1
          className={
            classes.h1
          }>{`Welcome to ${process.env.COPYRIGHT_ENTITY}`}</h1>
        <p>
          Sadipscing diam dolores at tempor diam at justo, erat lorem dolore ut
          rebum ea, dolor justo ut at voluptua dolores sadipscing justo ut, sed
          sea magna amet sanctus. Ut labore tempor gubergren takimata diam diam
          at magna ipsum. Sit et erat stet dolore. Et rebum nonumy voluptua sed
          dolores elitr.
        </p>
        <p>
          Takimata dolore est sit no diam et nonumy amet, dolor ut accusam
          consetetur voluptua tempor gubergren amet clita et. Et ipsum magna
          sadipscing et dolore ipsum et diam, eirmod lorem.
        </p>
      </div>
    </CssBaseline>
  )
}
